import requests
import json
import base64
import os
import time

API_KEY = "42c91e6e-fe58-485e-91e1-a3f951873ca3"
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

def generate_map_preview(region, prompt):
    filename = f"public/map_preview_{region}.png"
    print(f"Generating map preview for {region}...")
    full_prompt = f"Complete isometric RPG level design, {prompt}, highly detailed, pixel art, high resolution, game asset"
    
    payload = {
        "description": full_prompt,
        "image_size": {"width": 400, "height": 400}, # Use 400 (Max for PixFlux)
        "no_background": False
    }
    
    for attempt in range(15): # Many retries to wait out current rate limit
        try:
            response = requests.post(ENDPOINT, headers=HEADERS, json=payload, timeout=120)
            if response.status_code == 200:
                data = response.json()
                image_data = data.get('image', {}).get('base64', '').replace('data:image/png;base64,', '')
                if image_data:
                    with open(filename, "wb") as f:
                        f.write(base64.b64decode(image_data))
                    print(f"Saved {filename}")
                    return True
            elif response.status_code == 429:
                print(f"Rate limited (429) for {region}. Waiting 30s...")
                time.sleep(30)
            else:
                print(f"Error {response.status_code} for {region}: {response.text}")
                time.sleep(10)
        except Exception as e:
            print(f"Exception for {region}: {e}")
            time.sleep(10)
    return False

if __name__ == "__main__":
    if not os.path.exists("public"):
        os.makedirs("public")
    
    for region, prompt in REGIONS.items():
        generate_map_preview(region, prompt)
        time.sleep(5)
