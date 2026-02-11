import requests
import json
import time

API_KEY = "9b59a986-4c41-40b0-aa4f-21bcbf6c2905"
ENDPOINT = "https://api.pixellab.ai/v1/generate-image-pixflux"

HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

payload = {
    "description": "test texture",
    "image_size": {"width": 128, "height": 128},
    "no_background": True
}

print("Testing API...")
try:
    response = requests.post(ENDPOINT, headers=HEADERS, json=payload, timeout=600)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text[:200]}")
except Exception as e:
    print(f"Error: {e}")
