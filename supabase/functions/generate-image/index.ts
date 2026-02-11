import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { prompt, sessionId } = await req.json();

        // 1. PixelLab API
        const PIXELLAB_API_KEY = Deno.env.get('PIXELLAB_API_KEY');
        // Using the PixFlux endpoint as seen in the user's python script
        const ENDPOINT = "https://api.pixellab.ai/v1/generate-image-pixflux";

        const pixelRes = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${PIXELLAB_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description: prompt + ", dark fantasy, pixel art style, high quality",
                image_size: { width: 512, height: 288 }, // Widescreen for scene view
                no_background: false // Scenes should have backgrounds
            })
        });

        if (!pixelRes.ok) {
            throw new Error(`PixelLab Error: ${pixelRes.statusText}`);
        }

        const pixelData = await pixelRes.json();
        const base64Image = pixelData.image.base64.replace('data:image/png;base64,', '');
        const imageBuffer = Uint8Array.from(atob(base64Image), c => c.charCodeAt(0));

        // 2. Upload to Supabase Storage
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );

        const fileName = `session_${sessionId}/${Date.now()}.png`;
        const { data: uploadData, error: uploadError } = await supabaseClient
            .storage
            .from('game-assets')
            .upload(fileName, imageBuffer, {
                contentType: 'image/png',
                upsert: false
            });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabaseClient
            .storage
            .from('game-assets')
            .getPublicUrl(fileName);

        // 3. Record in Messages
        await supabaseClient.from('messages').insert([
            {
                session_id: sessionId,
                role: 'image',
                content: publicUrl
            }
        ]);

        return new Response(JSON.stringify({ url: publicUrl }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
});
