import React, { useState, useEffect } from 'react';

export const SceneBackground = ({ currentImage }) => {
    const [bg1, setBg1] = useState(currentImage);
    const [bg2, setBg2] = useState(null);
    const [activeLayer, setActiveLayer] = useState(1);
    const [transitioning, setTransitioning] = useState(false);

    const fallbackImage = 'https://okanuafsmkuzyuyqibpu.supabase.com/storage/v1/object/public/assets/Aethelgard_Map_v3.png';

    useEffect(() => {
        let rawImage = currentImage || fallbackImage;

        // Robust URL Processing
        let nextImage;
        if (typeof rawImage === 'string') {
            // If it's a relative path starting with slash, it might be a public asset or a missing full URL
            if (rawImage.startsWith('/') && !rawImage.startsWith('//')) {
                // If the file looks like a Supabase asset name (has spaces or specific pattern), 
                // but lacks the full URL, we should treat it carefully.
                // However, there's a logic in App.jsx that might pass just the filename.
                // Assuming everything should eventually be a valid URL:
                nextImage = rawImage.replace(/ /g, '_');
            } else if (!rawImage.startsWith('http') && !rawImage.startsWith('data:')) {
                // Handle cases where only filename is passed
                const supabaseBase = 'https://okanuafsmkuzyuyqibpu.supabase.com/storage/v1/object/public/assets/';
                nextImage = `${supabaseBase}${rawImage.replace(/ /g, '_')}`;
            } else {
                // It's a full URL, just sanitize spaces for browser safety
                nextImage = rawImage.replace(/ /g, '_');
            }
        } else {
            nextImage = rawImage;
        }

        // If the new image is the same as the one currently showing, do nothing
        const currentlyShowing = activeLayer === 1 ? bg1 : bg2;
        if (nextImage === currentlyShowing) return;

        setTransitioning(true);
        if (activeLayer === 1) {
            setBg2(nextImage);
            setActiveLayer(2);
        } else {
            setBg1(nextImage);
            setActiveLayer(1);
        }

        const timer = setTimeout(() => {
            setTransitioning(false);
        }, 2000); // Transition duration matches CSS

        return () => clearTimeout(timer);
    }, [currentImage]);

    return (
        <div className="scene-background-container">
            <div
                className={`scene-layer layer-1 ${activeLayer === 1 ? 'active' : 'inactive'}`}
                style={{ backgroundImage: `url(${bg1 || fallbackImage})` }}
            />
            <div
                className={`scene-layer layer-2 ${activeLayer === 2 ? 'active' : 'inactive'}`}
                style={{ backgroundImage: `url(${bg2 || fallbackImage})` }}
            />
            <div className="scene-overlay" />
        </div>
    );
};
