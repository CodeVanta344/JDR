import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../supabaseClient';

// Configuration WebRTC
const ICE_SERVERS = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
    ]
};

export const useVoiceChat = (sessionId, userId, userName) => {
    const [isMuted, setIsMuted] = useState(true);
    const [isTalking, setIsTalking] = useState(false);
    const [speakers, setSpeakers] = useState(new Map()); // userId -> { name, talking }
    const [isPushToTalk, setIsPushToTalk] = useState(true);
    const [pushToTalkKey, setPushToTalkKey] = useState('v'); // Default key: V
    
    const localStreamRef = useRef(null);
    const peerConnectionsRef = useRef(new Map()); // userId -> RTCPeerConnection
    const pushToTalkPressedRef = useRef(false);
    const channelRef = useRef(null);
    const audioElementsRef = useRef(new Map()); // userId -> HTMLAudioElement

    // Initialize local audio stream
    const initLocalStream = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                } 
            });
            localStreamRef.current = stream;
            
            // Mute all tracks initially
            stream.getAudioTracks().forEach(track => {
                track.enabled = false;
            });
            
            return stream;
        } catch (err) {
            console.error('Error accessing microphone:', err);
            alert('Impossible d\'accéder au microphone. Vérifiez vos permissions.');
            return null;
        }
    }, []);

    // Create peer connection for a user
    const createPeerConnection = useCallback(async (targetUserId, targetUserName) => {
        if (!localStreamRef.current) {
            await initLocalStream();
        }
        
        const pc = new RTCPeerConnection(ICE_SERVERS);
        
        // Add local stream tracks
        localStreamRef.current.getTracks().forEach(track => {
            pc.addTrack(track, localStreamRef.current);
        });
        
        // Handle ICE candidates
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                channelRef.current?.send({
                    type: 'ice-candidate',
                    targetUserId,
                    candidate: event.candidate
                });
            }
        };
        
        // Handle incoming stream
        pc.ontrack = (event) => {
            const [remoteStream] = event.streams;
            
            // Create audio element for this user if not exists
            if (!audioElementsRef.current.has(targetUserId)) {
                const audio = new Audio();
                audio.autoplay = true;
                audio.srcObject = remoteStream;
                audioElementsRef.current.set(targetUserId, audio);
            }
            
            // Detect audio activity
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const source = audioContext.createMediaStreamSource(remoteStream);
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            source.connect(analyser);
            
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            
            const detectAudio = () => {
                if (!audioElementsRef.current.has(targetUserId)) return;
                
                analyser.getByteFrequencyData(dataArray);
                const average = dataArray.reduce((a, b) => a + b) / bufferLength;
                
                // Threshold for considering someone is talking
                const isCurrentlyTalking = average > 20;
                
                setSpeakers(prev => {
                    const newSpeakers = new Map(prev);
                    const current = newSpeakers.get(targetUserId);
                    if (!current || current.talking !== isCurrentlyTalking) {
                        newSpeakers.set(targetUserId, {
                            name: targetUserName || current?.name || 'Inconnu',
                            talking: isCurrentlyTalking
                        });
                    }
                    return newSpeakers;
                });
                
                requestAnimationFrame(detectAudio);
            };
            
            detectAudio();
        };
        
        peerConnectionsRef.current.set(targetUserId, pc);
        return pc;
    }, [initLocalStream]);

    // Handle signaling messages
    const handleSignaling = useCallback(async (message) => {
        const { type, fromUserId, fromUserName, targetUserId, offer, answer, candidate } = message;
        
        // Ignore messages not for us or from ourselves
        if (fromUserId === userId || (targetUserId && targetUserId !== userId)) return;
        
        switch (type) {
            case 'user-joined':
                // Create offer for new user
                if (!peerConnectionsRef.current.has(fromUserId)) {
                    const pc = await createPeerConnection(fromUserId, fromUserName);
                    const offer = await pc.createOffer();
                    await pc.setLocalDescription(offer);
                    
                    channelRef.current?.send({
                        type: 'offer',
                        targetUserId: fromUserId,
                        offer: pc.localDescription
                    });
                }
                break;
                
            case 'offer':
                // Answer offer
                if (!peerConnectionsRef.current.has(fromUserId)) {
                    const pc = await createPeerConnection(fromUserId, fromUserName);
                    await pc.setRemoteDescription(new RTCSessionDescription(offer));
                    const answer = await pc.createAnswer();
                    await pc.setLocalDescription(answer);
                    
                    channelRef.current?.send({
                        type: 'answer',
                        targetUserId: fromUserId,
                        answer: pc.localDescription
                    });
                }
                break;
                
            case 'answer': {
                // Set remote description
                const pc = peerConnectionsRef.current.get(fromUserId);
                if (pc) {
                    await pc.setRemoteDescription(new RTCSessionDescription(answer));
                }
                break;
            }
                
            case 'ice-candidate': {
                // Add ICE candidate
                const peerConnection = peerConnectionsRef.current.get(fromUserId);
                if (peerConnection) {
                    await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
                }
                break;
            }
                
            case 'user-left': {
                // Clean up peer connection
                const conn = peerConnectionsRef.current.get(fromUserId);
                if (conn) {
                    conn.close();
                    peerConnectionsRef.current.delete(fromUserId);
                }
                const audio = audioElementsRef.current.get(fromUserId);
                if (audio) {
                    audio.srcObject = null;
                    audioElementsRef.current.delete(fromUserId);
                }
                setSpeakers(prev => {
                    const newSpeakers = new Map(prev);
                    newSpeakers.delete(fromUserId);
                    return newSpeakers;
                });
                break;
            }
        }
    }, [userId, createPeerConnection]);

    // Initialize voice chat
    useEffect(() => {
        if (!sessionId || !userId) return;
        
        let isActive = true;
        
        const init = async () => {
            // Get local stream
            await initLocalStream();
            
            if (!isActive) return;
            
            // Setup Supabase realtime channel for signaling
            const channel = supabase.channel(`voice_${sessionId}`, {
                config: {
                    broadcast: { self: false }
                }
            });
            
            channel
                .on('broadcast', { event: 'voice-signal' }, ({ payload }) => {
                    handleSignaling(payload);
                })
                .subscribe((status) => {
                    if (status === 'SUBSCRIBED') {
                        // Announce ourselves
                        channel.send({
                            type: 'broadcast',
                            event: 'voice-signal',
                            payload: {
                                type: 'user-joined',
                                fromUserId: userId,
                                fromUserName: userName
                            }
                        });
                    }
                });
            
            channelRef.current = channel;
        };
        
        init();
        
        return () => {
            isActive = false;
            
            // Copy refs to local variables for cleanup
            const channel = channelRef.current;
            const peerConnections = peerConnectionsRef.current;
            const audioElements = audioElementsRef.current;
            const localStream = localStreamRef.current;
            
            // Announce leaving
            channel?.send({
                type: 'broadcast',
                event: 'voice-signal',
                payload: {
                    type: 'user-left',
                    fromUserId: userId
                }
            });
            
            // Cleanup
            channel?.unsubscribe();
            
            peerConnections.forEach(pc => pc.close());
            peerConnections.clear();
            
            audioElements.forEach(audio => {
                audio.srcObject = null;
            });
            audioElements.clear();
            
            localStream?.getTracks().forEach(track => track.stop());
            localStreamRef.current = null;
        };
    }, [sessionId, userId, userName, initLocalStream, handleSignaling]);

    // Toggle mute
    const toggleMute = useCallback((forceMute = null) => {
        const newMutedState = forceMute !== null ? forceMute : !isMuted;
        
        if (localStreamRef.current) {
            localStreamRef.current.getAudioTracks().forEach(track => {
                track.enabled = !newMutedState;
            });
        }
        
        setIsMuted(newMutedState);
        setIsTalking(!newMutedState);
        
        // Update speakers list to show we're talking
        if (!newMutedState) {
            setSpeakers(prev => {
                const newSpeakers = new Map(prev);
                newSpeakers.set(userId, { name: 'Vous', talking: true });
                return newSpeakers;
            });
        } else {
            setSpeakers(prev => {
                const newSpeakers = new Map(prev);
                newSpeakers.delete(userId);
                return newSpeakers;
            });
        }
    }, [isMuted, userId]);

    // Push-to-talk handlers - using refs to avoid re-registration issues
    const isPushToTalkRef = useRef(isPushToTalk);
    const pushToTalkKeyRef = useRef(pushToTalkKey);
    const toggleMuteRef = useRef(toggleMute);
    
    // Keep refs updated
    useEffect(() => {
        isPushToTalkRef.current = isPushToTalk;
    }, [isPushToTalk]);
    
    useEffect(() => {
        pushToTalkKeyRef.current = pushToTalkKey;
    }, [pushToTalkKey]);
    
    useEffect(() => {
        toggleMuteRef.current = toggleMute;
    }, [toggleMute]);
    
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isPushToTalkRef.current) return;
            
            // Skip if user is typing in an input field
            const target = e.target;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
                return; // Let the key work normally for typing
            }
            
            if (e.key.toLowerCase() === pushToTalkKeyRef.current.toLowerCase() && !e.repeat) {
                e.preventDefault();
                pushToTalkPressedRef.current = true;
                toggleMuteRef.current(false);
            }
        };
        
        const handleKeyUp = (e) => {
            if (!isPushToTalkRef.current) return;
            
            // Skip if user is typing in an input field
            const target = e.target;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
                return; // Let the key work normally for typing
            }
            
            if (e.key.toLowerCase() === pushToTalkKeyRef.current.toLowerCase()) {
                e.preventDefault();
                pushToTalkPressedRef.current = false;
                toggleMuteRef.current(true);
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []); // Empty dependency array - handlers use refs

    // Toggle push-to-talk mode
    const togglePushToTalk = useCallback(() => {
        setIsPushToTalk(prev => {
            const newValue = !prev;
            // If disabling push-to-talk, mute by default
            if (!newValue) {
                toggleMute(true);
            }
            return newValue;
        });
    }, [toggleMute]);

    // Change push-to-talk key
    const changePushToTalkKey = useCallback((newKey) => {
        setPushToTalkKey(newKey);
    }, []);

    return {
        isMuted,
        isTalking,
        isPushToTalk,
        pushToTalkKey,
        speakers,
        toggleMute,
        togglePushToTalk,
        changePushToTalkKey,
        getLocalStream: () => localStreamRef.current
    };
};
