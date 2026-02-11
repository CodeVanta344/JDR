import requests
import json
import base64
import os
import time

API_KEY = "9b59a986-4c41-40b0-aa4f-21bcbf6c2905"
ENDPOINT = "https://api.pixellab.ai/v1/generate-image-pixflux"

HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

# Base Prompts for Transitions (Edges & Corners)
# Using a "Grimdark Hand-Painted" style for professional aesthetic
TRANSITION_PROMPTS = {
    # Grass <-> Stone
    "grass_to_stone_N": "grimdark hand-painted isometric ground texture, seamless floor transition from mossy dark green grass at bottom to ancient weathered grey stone tiles at top, 2d game asset, flat terrain, realistic textures, oil painting style, high detail",
    "grass_to_stone_S": "grimdark hand-painted isometric ground texture, seamless floor transition from ancient weathered grey stone tiles at bottom to mossy dark green grass at top, 2d game asset, flat terrain, realistic textures, oil painting style, high detail",
    "grass_to_stone_E": "grimdark hand-painted isometric ground texture, seamless floor transition from mossy dark green grass at left to ancient weathered grey stone tiles at right, 2d game asset, flat terrain, realistic textures, oil painting style, high detail",
    "grass_to_stone_W": "grimdark hand-painted isometric ground texture, seamless floor transition from ancient weathered grey stone tiles at left to mossy dark green grass at right, 2d game asset, flat terrain, realistic textures, oil painting style, high detail",
    "grass_to_stone_NE": "grimdark hand-painted isometric ground texture, seamless floor transition from mossy dark green grass corner to ancient weathered grey stone tiles, 2d game asset, flat terrain, realistic textures, oil painting style, high detail",
    "grass_to_stone_SE": "grimdark hand-painted isometric ground texture, seamless floor transition from mossy dark green grass corner to ancient weathered grey stone tiles, 2d game asset, flat terrain, realistic textures, oil painting style, high detail",
    "grass_to_stone_SW": "grimdark hand-painted isometric ground texture, seamless floor transition from mossy dark green grass corner to ancient weathered grey stone tiles, 2d game asset, flat terrain, realistic textures, oil painting style, high detail",
    "grass_to_stone_NW": "grimdark hand-painted isometric ground texture, seamless floor transition from mossy dark green grass corner to ancient weathered grey stone tiles, 2d game asset, flat terrain, realistic textures, oil painting style, high detail",

    # Grass <-> Dirt
    "grass_to_dirt_N": "grimdark hand-painted isometric ground texture, seamless floor transition from mossy dark green grass at bottom to cracked dry brown earth at top, 2d game asset, flat terrain, realistic textures, oil painting style, high detail",
    "grass_to_dirt_S": "grimdark hand-painted isometric ground texture, seamless floor transition from cracked dry brown earth at bottom to mossy dark green grass at top, 2d game asset, flat terrain, realistic textures, oil painting style, high detail",
    "grass_to_dirt_E": "grimdark hand-painted isometric ground texture, seamless floor transition from mossy dark green grass at left to cracked dry brown earth at right, 2d game asset, flat terrain, realistic textures, oil painting style, high detail",
    "grass_to_dirt_W": "grimdark hand-painted isometric ground texture, seamless floor transition from cracked dry brown earth at left to mossy dark green grass at right, 2d game asset, flat terrain, realistic textures, oil painting style, high detail",
    "grass_to_dirt_NE": "grimdark hand-painted isometric ground texture, seamless floor transition from mossy dark green grass corner to cracked dry brown earth, 2d game asset, flat terrain, realistic textures, oil painting style, high detail",
    "grass_to_dirt_SE": "grimdark hand-painted isometric ground texture, seamless floor transition from mossy dark green grass corner to cracked dry brown earth, 2d game asset, flat terrain, realistic textures, oil painting style, high detail",
    "grass_to_dirt_SW": "grimdark hand-painted isometric ground texture, seamless floor transition from mossy dark green grass corner to cracked dry brown earth, 2d game asset, flat terrain, realistic textures, oil painting style, high detail",
    "grass_to_dirt_NW": "grimdark hand-painted isometric ground texture, seamless floor transition from mossy dark green grass corner to cracked dry brown earth, 2d game asset, flat terrain, realistic textures, oil painting style, high detail",

    # Stone <-> Dirt
    "stone_to_dirt_N": "grimdark hand-painted isometric ground texture, seamless floor transition from weathered grey stone at bottom to muddy brown earth with footprints at top, 2d game asset, flat terrain, realistic textures, oil painting style, high detail",
    "stone_to_dirt_S": "grimdark hand-painted isometric ground texture, seamless floor transition from muddy brown earth with footprints at bottom to weathered grey stone at top, 2d game asset, flat terrain, realistic textures, oil painting style, high detail",
    "stone_to_dirt_E": "grimdark hand-painted isometric ground texture, seamless floor transition from weathered grey stone at left to muddy brown earth with footprints at right, 2d game asset, flat terrain, realistic textures, oil painting style, high detail",
    "stone_to_dirt_W": "grimdark hand-painted isometric ground texture, seamless floor transition from muddy brown earth with footprints at left to weathered grey stone at right, 2d game asset, flat terrain, realistic textures, oil painting style, high detail",

    # Grass <-> Water
    "grass_to_water_N": "grimdark hand-painted isometric ground texture, seamless shoreline transition from mossy green grass to dark murky deep water, ripples and foam, 2d game asset, flat terrain, oil painting style, high detail",
    "grass_to_water_S": "grimdark hand-painted isometric ground texture, seamless shoreline transition from dark murky deep water to mossy green grass, ripples and foam, 2d game asset, flat terrain, oil painting style, high detail",

    # Stone <-> Water
    "stone_to_water_N": "grimdark hand-painted isometric ground texture, seamless shoreline transition from ancient grey stone quays to dark murky water, foam against stone, 2d game asset, flat terrain, oil painting style, high detail",
    "stone_to_water_S": "grimdark hand-painted isometric ground texture, seamless shoreline transition from dark murky water to ancient grey stone quays, foam against stone, 2d game asset, flat terrain, oil painting style, high detail",
}

def update_status(current, total, last_file="", msg="En cours..."):
    try:
        with open("public/status.json", "w") as f:
            json.dump({
                "current": current,
                "total": total,
                "last_file": last_file,
                "message": msg,
                "percent": int((current / total) * 100) if total > 0 else 0,
                "timestamp": time.time()
            }, f)
    except Exception as e:
        print(f"Failed to update status: {e}")

def generate_sprite(name, prompt, current=0, total=0):
    filename = f"public/transitions/{name}.png"
    if os.path.exists(filename):
        print(f"Skipping {name} (already exists)")
        return True

    print(f"Generating {name}...")
    update_status(current, total, name, "Requête API...")
    payload = {
        "description": prompt,
        "image_size": {"width": 128, "height": 128},
        "no_background": True
    }
    
    for attempt in range(3):
        try:
            response = requests.post(ENDPOINT, headers=HEADERS, json=payload, timeout=600) # Increased to 600s for slow backend
            if response.status_code == 200:
                data = response.json()
                image_data = data.get('image', {}).get('base64')
                if image_data:
                    if image_data.startswith('data:image/png;base64,'):
                        image_data = image_data.split(',')[1]
                    
                    with open(filename, "wb") as f:
                        f.write(base64.b64decode(image_data))
                    print(f"Saved {filename}")
                    return True
                else:
                    print(f"No image data in response for {name}")
            elif response.status_code == 429:
                print(f"Rate limited on {name}, waiting 45s...")
                update_status(current, total, name, f"Limité par l'API (Attente 45s - Essai {attempt+1})")
                time.sleep(45)
            else:
                print(f"Error {response.status_code} on attempt {attempt+1}: {response.text}")
                update_status(current, total, name, f"Erreur {response.status_code} (Essai {attempt+1})")
        except requests.exceptions.Timeout:
            print(f"Timeout on attempt {attempt+1} for {name}, waiting 60s...")
            update_status(current, total, name, f"Timeout API (Attente 60s - Essai {attempt+1})")
            time.sleep(10) # Wait a bit before retry
        except Exception as e:
            print(f"Exception on attempt {attempt+1}: {e}")
            update_status(current, total, name, f"Exception: {str(e)[:30]}")
        
        # SLOW DOWN RETRIES: Wait 20 seconds before next attempt
        time.sleep(20)
    return False

if __name__ == "__main__":
    if not os.path.exists("public/transitions"):
        os.makedirs("public/transitions")
    
    total_tasks = len(TRANSITION_PROMPTS)
    completed = 0
    
    # Initialize status
    update_status(0, total_tasks, "Démarrage...", "Vérification des fichiers existants")
    
    # STRICT SEQUENTIAL EXECUTION WITH HIGH DELAY
    for key, prompt in TRANSITION_PROMPTS.items():
        success = generate_sprite(key, prompt, completed, total_tasks)
        completed += 1
        update_status(completed, total_tasks, key, "Terminé" if success else "Échec")
        
        # SLOW DOWN BETWEEN ASSETS: Wait 15 seconds minimum between each file
        print(f"Waiting 15s before next asset...")
        time.sleep(15)

    update_status(total_tasks, total_tasks, "Production Finie", "Toutes les textures sont prêtes.")
    print("Transition generation complete.")
