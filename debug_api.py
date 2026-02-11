import requests
import json

API_KEY = "9b59a986-4c41-40b0-aa4f-21bcbf6c2905"
ENDPOINT = "https://api.pixellab.ai/v1/generate-image-pixflux"

HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

payload = {
    "description": "A brave warrior standing in a tavern, D&D style, high fantasy, digital painting, colorful, detailed, masterpiece",
    "image_size": {"width": 384, "height": 384},
    "no_background": False
}

try:
    with open("debug_result.txt", "w") as f:
        f.write(f"Testing Payload: {json.dumps(payload)}\n")
        response = requests.post(ENDPOINT, headers=HEADERS, json=payload, timeout=60)
        f.write(f"Status Code: {response.status_code}\n")
        if response.status_code != 200:
            f.write(f"Error Response: {response.text}\n")
        else:
            data = response.json()
            if "image" in data and "base64" in data["image"]:
                f.write("Success! Image generated.\n")
            else:
                f.write(f"Unexpected Success Response: {response.text[:200]}...\n")
except Exception as e:
    with open("debug_result.txt", "w") as f:
        f.write(f"Exception: {e}\n")
