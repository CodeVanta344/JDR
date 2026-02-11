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

REGIONS = {
    "varna": "Cités-Libres de Varna, maritime, commercial, bustling harbor, dark fantasy, isometric map",
    "sylvae": "Terres Vives de Sylvaë, bioluminescent forest, ancient trees, druidic ruins, isometric map",
    "khelos": "Empire de Khelos, white marble, brutalist architecture, imperial palace, frozen, isometric map",
    "cendre": "Marches de Cendre, apocalyptic wasteland, obsidian shards, void crystals, ash, isometric map"
}

def log(msg):
    timestamp = time.strftime("%H:%M:%S")
    line = f"[{timestamp}] {msg}"
    print(line)
    with open("map_gen.log", "a", encoding="utf-8") as f:
        f.write(line + "\n")

def generate_map_preview(region, prompt):
    filename = f"public/map_preview_{region}.png"
    log(f"Starting generation for {region}...")
    
    full_prompt = f"Complete isometric RPG level design, {prompt}, highly detailed, pixel art, high resolution, game asset"
    
    payload = {
        "description": full_prompt,
        "image_size": {"width": 400, "height": 400},
        "no_background": False
    }
    
    for attempt in range(20): # Increased retries
        try:
            log(f"Attempt {attempt+1}/20 for {region}...")
            response = requests.post(ENDPOINT, headers=HEADERS, json=payload, timeout=180) # Increased timeout
            
            if response.status_code == 200:
                data = response.json()
                image_data = data.get('image', {}).get('base64', '').replace('data:image/png;base64,', '')
                if image_data:
                    with open(filename, "wb") as f:
                        f.write(base64.b64decode(image_data))
                    log(f"SUCCESS: Saved {filename}")
                    return True
                else:
                    log(f"ERROR: No image data in response for {region}")
            elif response.status_code == 429:
                log(f"RATE LIMITED (429): {response.text}. Waiting 60s...")
                time.sleep(60)
            else:
                log(f"API ERROR {response.status_code}: {response.text}. Waiting 30s...")
                time.sleep(30)
                
        except Exception as e:
            log(f"EXCEPTION: {str(e)}. Waiting 30s...")
            time.sleep(30)
            
    log(f"FAILURE: Failed to generate {region} after 20 attempts.")
    return False

if __name__ == "__main__":
    if not os.path.exists("public"):
        os.makedirs("public")
    
    log("=== Map Generation Session Started ===")
    for region, prompt in REGIONS.items():
        if os.path.exists(f"public/map_preview_{region}.png"):
            log(f"Skipping {region} (already exists)")
            continue
            
        success = generate_map_preview(region, prompt)
        if success:
            log(f"Waiting 45s before next region to clear API queue...")
            time.sleep(45)
        else:
            log(f"Waiting 120s before next region due to failure...")
            time.sleep(120)
    log("=== Map Generation Session Finished ===")
