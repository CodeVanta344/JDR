import requests
import json
import base64
import os

API_KEY = "9b59a986-4c41-40b0-aa4f-21bcbf6c2905"
ENDPOINT = "https://api.pixellab.ai/v1/generate-image-pixflux"

PROMPTS = {
    # Characters - Detailed Portraits
    "gobelin": "Fantasy RPG monster portrait of a Goblin Raider, green skin, wicked grin, holding a rusty scimitar, jagged armor, dark cave background, detailed digital painting style",
    "loup": "Fantasy RPG monster portrait of a Forest Wolf, grey fur, fierce yellow eyes, snarling, forest background, detailed digital painting style",
    "orc": "Fantasy RPG monster portrait of an Orc Brute, massive muscular build, greyish-green skin, tusks, holding a battleaxe, savage look, detailed digital painting style",
    "squelette": "Fantasy RPG monster portrait of a Skeleton Warrior, animated bones, wearing tattered ancient armor, holding a rusty sword, glowing eye sockets, dark background, detailed digital painting style",
    "ogre": "Fantasy RPG monster portrait of an Ogre, huge and hulking, ugly face, wearing makeshift armor, holding a giant club, intimidating, detailed digital painting style",
    "spectre": "Fantasy RPG monster portrait of a Screaming Specter, ghostly apparition, translucent, terrifying expression, floating, dark ethereal aura, detailed digital painting style"
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
        variants = 1
        
        for i in range(1, variants + 1):
            name = key
            current_prompt = prompt
            force_regen = False
                
            final_path = f"public/monsters/{name}.png"
            
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

