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
    "spectre": "Fantasy RPG monster portrait of a Screaming Specter, ghostly apparition, translucent, terrifying expression, floating, dark ethereal aura, detailed digital painting style",

    # Class Portraits
    "voleur": "Fantasy RPG character portrait of a male Thief/Rogue, dark hooded cloak, holding a dagger, cunning expression, shadowy alley background, detailed digital painting style",
    "clerc": "Fantasy RPG character portrait of a female Cleric, holy vestments, holding a mace, divine light glowing, cathedral background, detailed digital painting style",
    "paladin": "Fantasy RPG character portrait of a male Paladin, heavy plate armor, holding a shield with holy symbol, heroic stance, sunlight background, detailed digital painting style",
    "rodeur": "Fantasy RPG character portrait of a male Ranger, green and brown leather armor, holding a bow, forest background, keen eyes, detailed digital painting style",
    "barde": "Fantasy RPG character portrait of a female Bard, colorful clothes, holding a lute, cheerful expression, tavern background, detailed digital painting style",
    "druide": "Fantasy RPG character portrait of a female Druid, natural clothes, holding a wooden staff, surrounded by wildlife or plants, forest background, detailed digital painting style"
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
        "image_size": {"width": 256, "height": 256}, # Larger for portraits
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
                
                # Ensure directory exists before writing
                os.makedirs(os.path.dirname(name), exist_ok=True)
                
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
    
    CLASSES_PORTRAITS = ["voleur", "clerc", "paladin", "rodeur", "barde", "druide"]
        
    for key, prompt in PROMPTS.items():
        # Determine target directory
        if key in CLASSES_PORTRAITS:
            final_path = f"public/portraits/{key}.png"
            no_bg = False # Portraits look better with background
        else:
            final_path = f"public/monsters/{key}.png"
            no_bg = True # Monsters need transparency for map/combat
            
        # Determine number of variants
        variants = 1
        
        for i in range(1, variants + 1):
            name = key
            current_prompt = prompt
            force_regen = False
            
            # Check existence and size immediately to avoid queuing done work
            if os.path.exists(final_path) and not force_regen:
                print(f"Skipping {final_path}, already exists.")
                continue
            
            work_items.append((final_path, current_prompt, no_bg))

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

