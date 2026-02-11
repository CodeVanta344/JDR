import requests
import json
import base64
import os

API_KEY = "9b59a986-4c41-40b0-aa4f-21bcbf6c2905"
ENDPOINT = "https://api.pixellab.ai/v1/generate-image-pixflux"

PROMPTS = {
    # Characters - Detailed Portraits
    "greffier": "Grimdark hand-painted isometric 2D game sprite of an Imperial Archivist (Greffier), heavy ink-stained vellum robes, glowing blood-runic scrolls, complex gold ornaments, dark fantasy, high fidelity, transparent background",
    "tisseur": "Grimdark hand-painted isometric 2D game sprite of a Tisseur mages, organic bark armor with glowing emerald sap veins, holding a staff of living ironwood, dark fantasy, high fidelity, transparent background",
    "negociant": "Grimdark hand-painted isometric 2D game sprite of a Varna merchant, lavish indigo velvet robes, necklaces of glowing soul-coins, holding a spectral contract, dark fantasy, high fidelity, transparent background",
    "eclat": "Grimdark hand-painted isometric 2D game sprite of an Eclat de Strate, a ghost-like being of shattered purple crystals and void smoke, ethereal and frightening, dark fantasy, high fidelity, transparent background",
    "sentinelle": "Grimdark hand-painted isometric 2D game sprite of an Imperial Sentinel, monolithic white marble armor with iron spikes, massive shield with etched laws, dark fantasy, high fidelity, transparent background",
    "traqueur": "Grimdark hand-painted isometric 2D game sprite of a Memory Tracker, ragged dark green cloak blending with shadows, glowing memory-crystal bow, dark fantasy, high fidelity, transparent background",
    
    # Map Tiles - Varna (Coastal)
    "varna_grass": "Top-down 2D seamless texture of sparse coastal grass, dark fantasy style, clean hand-painted look, non-repetitive",
    "varna_stone": "Top-down 2D seamless texture of dark wet cobblestone pavement, worn by the sea, dark fantasy style, clean hand-painted look",
    "varna_dirt": "Top-down 2D seamless texture of packed sandy coastal soil, dark fantasy style, clean hand-painted look",
    "varna_water": "Top-down 2D seamless texture of deep dark ocean water, slightly turbulent, dark fantasy style",
    
    # Map Tiles - Sylvae (Forest)
    "sylvae_grass": "Top-down 2D seamless texture of vibrant deep green forest moss, dark fantasy style, clean hand-painted look, simple texture",
    "sylvae_stone": "Top-down 2D seamless texture of ancient grey stone, subtle moss, dark fantasy style, clean hand-painted look",
    "sylvae_dirt": "Top-down 2D seamless texture of rich dark forest soil, clean and simple, dark fantasy style, clean hand-painted look",
    "sylvae_water": "Top-down 2D seamless texture of crystal clear magical spring water, revealing stones at the bottom, dark fantasy style",
    
    # Map Tiles - Khelos (Imperial)
    "khelos_grass": "Top-down 2D seamless texture of manicured dry decorative grass, imperial style, dark fantasy style, clean hand-painted look",
    "khelos_stone": "Top-down 2D seamless texture of smooth polished marble pavement, imperial style, dark fantasy style, clean hand-painted look",
    "khelos_dirt": "Top-down 2D seamless texture of packed dry earth and crushed white stone, strict and orderly, dark fantasy style, clean hand-painted look",
    "khelos_water": "Top-down 2D seamless texture of perfectly still dark water in a marble basin, reflective, dark fantasy style",
    
    # Map Tiles - Cendre (Wasteland)
    "cendre_grass": "Top-down 2D seamless texture of dead grey scorched grass on ash, apocalyptic style, dark fantasy style, clean hand-painted look",
    "cendre_stone": "Top-down 2D seamless texture of sharp jagged obsidian rock floor, volcanic, dark fantasy style, clean hand-painted look",
    "cendre_dirt": "Top-down 2D seamless texture of thick grey volcanic ash dust, dark fantasy style, clean hand-painted look",
    "cendre_water": "Top-down 2D seamless texture of opaque black oil-like liquid, viscous and bubbling, dark fantasy style",

    # Ground Decals (Scattered Details)
    "decal_leaves_sylvae": "Grimdark hand-painted set of scattered dead autumn leaves, 2D sprite, high fidelity, transparent background",
    "decal_leaves_varna": "Grimdark hand-painted scattered dried seaweed and coastal debris, 2D sprite, high fidelity, transparent background",
    "decal_pebbles_varna": "Grimdark hand-painted scattered wet sea pebbles and shells, 2D sprite, high fidelity, transparent background",
    "decal_bones": "Grimdark hand-painted scattered weathered bones and skull fragments, 2D sprite, high fidelity, transparent background",
    "decal_cracks": "Grimdark hand-painted set of dark earth cracks and fissures, 2D sprite, high fidelity, transparent background",
    "decal_ferns": "Grimdark hand-painted small dark forest ferns, low profile, 2D sprite, high fidelity, transparent background",

    # Decor - Varna (Coastal Grimdark)
    "varna_house": "Grimdark hand-painted isometric house, decaying blue tile roof, dark wooden beams, merchant flags, seaweed hanging, coastal Varna style, high fidelity, transparent background",
    "varna_barrel": "Grimdark hand-painted weathered wooden barrel, salt-encrusted, iron bands, dark fantasy, high fidelity, transparent background",
    "varna_crate": "Grimdark hand-painted stacked merchant crates, ink-stained, barnacles, dark fantasy, high fidelity, transparent background",
    "varna_lantern": "Grimdark hand-painted coastal lantern, rusted iron, flickering amber soul-glow, dark fantasy, high fidelity, transparent background",

    # Decor - Sylvae (Ethereal Forest)
    "sylvae_ancient_tree": "Grimdark hand-painted massive ancient tree, twisted spirit-bark, glowing green sap, bioluminescent spirit-gems embedded, high fidelity, transparent background",
    "sylvae_arch": "Grimdark hand-painted memory arch, living white ironwood, glowing green spirit-vines, high fidelity, transparent background",
    "sylvae_spirit_stone": "Grimdark hand-painted mossy standing stone, carved with glowing green druidic runes, high fidelity, transparent background",

    # Decor - Khelos (Imperial Brutalist)
    "khelos_archive": "Grimdark hand-painted monolithic stone archive, brutalist architecture, floating runic stones, cold white marble, high fidelity, transparent background",
    "khelos_statue": "Grimdark hand-painted faceless imperial statue, heavy stone robes, high fidelity, transparent background",

    # Decor - Cendre (Wasteland)
    "cendre_rift": "Grimdark hand-painted void rift, jagged reality tear pulsing with purple and black energy, floating charred debris, high fidelity, transparent background",
    "cendre_void_crystal": "Grimdark hand-painted floating dark obsidian crystal, pulsing with void energy, high fidelity, transparent background",

    # Enemies (Missing)
    "cendre_void_wraith": "Isometric 2D game sprite of a ghostly wraith made of void energy and shadows, floating, dark fantasy, clean pixel art, transparent background",
    "sylvae_wolf_spirit": "Isometric 2D game sprite of a translucent spectral wolf, glowing green energy, nature spirit, dark fantasy, clean pixel art, transparent background",
    "khelos_statue_construct": "Isometric 2D game sprite of an animated stone statue construct, magic runes glowing, heavy stone limbs, dark fantasy, clean pixel art, transparent background",
    "khelos_law_enforcer": "Isometric 2D game sprite of an elite imperial guard in heavy plate armor, halberd, stern expression, dark fantasy, clean pixel art, transparent background",
    "varna_corrupted_merchant": "Isometric 2D game sprite of a wealthy merchant with mutated features, gold coins fused into flesh, horror, dark fantasy, clean pixel art, transparent background",

    # Common Props & Spawn Landmarks
    "altar": "Grimdark hand-painted isometric 2D game sprite of a Soul Nexus Altar, floating obsidian stones, glowing purple rune-energy, ethereal whispers, high fidelity, transparent background",
    "campfire": "Isometric 2D game sprite of a small campfire with burning logs and embers, dark fantasy, clean pixel art, transparent background",
    "rock": "Isometric 2D game sprite of a natural grey rock with moss patches, dark fantasy, clean pixel art, transparent background",
    "tree": "Isometric 2D game sprite of a dead gnarled tree, dark fantasy, clean pixel art, transparent background",
    "pillar": "Isometric 2D game sprite of a weathered stone pillar, dark fantasy, clean pixel art, transparent background",
    "spirit_stone": "Grimdark hand-painted mossy standing stone, carved with glowing green druidic runes, high fidelity, transparent background",
    "lantern": "Grimdark hand-painted imperial soul-lantern on a wrought iron post, flickering cold blue light, high fidelity, transparent background"
}

HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

import time

def generate_sprite(name, prompt, no_bg=True, retries=5):
    print(f"Generating {name}...")
    payload = {
        "description": prompt,
        "image_size": {"width": 128, "height": 128},
        "no_background": no_bg
    }
    
    for attempt in range(retries):
        try:
            print(f"Attempt {attempt+1}...")
            response = requests.post(ENDPOINT, headers=HEADERS, json=payload, timeout=120)
            if response.status_code == 200:
                data = response.json()
                image_data = data['image']['base64']
                if image_data.startswith('data:image/png;base64,'):
                    image_data = image_data.replace('data:image/png;base64,', '')
                
                with open(name, "wb") as f:
                    f.write(base64.b64decode(image_data))
                print(f"Successfully saved {name}")
                return True
            else:
                print(f"Attempt {attempt+1} failed for {name}: {response.status_code} - {response.text[:100]}")
                if response.status_code in [504, 502, 503]:
                    wait_time = (attempt + 1) * 15
                    print(f"Server error, retrying in {wait_time}s...")
                    time.sleep(wait_time)
                else:
                    break 
        except Exception as e:
            wait_time = (attempt + 1) * 10
            print(f"Attempt {attempt+1} exception for {name}: {str(e)}. Retrying in {wait_time}s...")
            time.sleep(wait_time)
            
    return False


VARIATIONS = {
    "grass": ["wild and overgrown", "with small flowers", "dry and patchy"],
    "stone": ["cracked and ancient", "moss-covered", "broken"],
    "dirt": ["muddy with footprints", "dry and dusty", "mixed with small stones"],
    "water": ["rippling", "calm and stagnant", "foamy"],
    "tree": ["with twisted roots", "losing leaves", "young and thin"],
    "wood": ["rotting", "freshly cut", "burnt"],
    "default": ["slightly damaged", "different angle", "cluttered"]
}


import concurrent.futures

if __name__ == "__main__":
    if not os.path.exists("public"):
        os.makedirs("public")
        
    work_items = []
        
    for key, prompt in PROMPTS.items():
        # Check if it's a character (no variants for characters for now to save API calls, unless requested)
        is_character = key in ["greffier", "tisseur", "negociant", "eclat", "sentinelle", "traqueur"]
        
        # Check if it's a tile
        is_tile = any(x in key for x in ["_grass", "_stone", "_dirt", "_water"])
        
        # Determine number of variants
        variants = 1 if is_character else 3
        
        for i in range(1, variants + 1):
            if variants > 1:
                name = f"{key}_{i}"
                
                # Determine variation type
                var_type = "default"
                for k in VARIATIONS.keys():
                    if k in key:
                        var_type = k
                        break
                
                # Get variation text
                vars_list = VARIATIONS.get(var_type, VARIATIONS["default"])
                var_text = vars_list[(i-1) % len(vars_list)]
                
                current_prompt = f"{prompt}, {var_text}"
                force_regen = False # Changed to False to avoid infinite regen loop, user can delete files to force
            else:
                name = key
                current_prompt = prompt
                force_regen = False
                
            final_path = f"public/{name}.png"
            
            # Check existence and size immediately to avoid queuing done work
            if os.path.exists(final_path) and not force_regen:
                if not is_tile or os.path.getsize(final_path) > 1024:
                    print(f"Skipping {name}, already exists.")
                    continue
                else:
                    print(f"Re-generating {name} (previous file too small).")
            
            work_items.append((final_path, current_prompt, not is_tile))

    print(f"Queueing {len(work_items)} generation tasks...")

    def worker(args):
        path, prompt, no_bg = args
        try:
            generate_sprite(path, prompt, no_bg)
        except Exception as e:
            print(f"Failed worker task for {path}: {e}")

    # Process sequentially to avoid API rate limits
    with concurrent.futures.ThreadPoolExecutor(max_workers=1) as executor:
        for result in executor.map(worker, work_items):
             time.sleep(5) # Cooldown between requests

