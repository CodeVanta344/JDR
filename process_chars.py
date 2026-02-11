from PIL import Image
import os

def process_sprite(path):
    try:
        if not os.path.exists(path):
            print(f"File not found: {path}")
            return

        img = Image.open(path).convert("RGBA")
        width, height = img.size
        pixels = img.load()
        
        # 1. Remove Black Background
        # Get background color from top-left (assumed black #000000)
        bg_color = (0, 0, 0) 
        
        for y in range(height):
            for x in range(width):
                r, g, b, a = pixels[x, y]
                # Tolerance for compression artifacts
                if r < 30 and g < 30 and b < 30: 
                    pixels[x, y] = (0, 0, 0, 0)

        # 2. Crop
        bbox = img.getbbox()
        if bbox:
            img = img.crop(bbox)
            img.save(path)
            print(f"Processed {path} (Bg removed + Cropped to {bbox})")
        else:
            print(f"No content in {path}")

    except Exception as e:
        print(f"Error processing {path}: {e}")

files = [
    r'C:/Users/loicr/.gemini/antigravity/brain/b2befceb-9342-4e27-8737-edf362d9966a/iso_paladin_1770501473438.png',
    r'C:/Users/loicr/.gemini/antigravity/brain/b2befceb-9342-4e27-8737-edf362d9966a/iso_inquisitor_1770501487266.png',
    r'C:/Users/loicr/.gemini/antigravity/brain/b2befceb-9342-4e27-8737-edf362d9966a/iso_warlock_1770501500179.png',
    r'C:/Users/loicr/.gemini/antigravity/brain/b2befceb-9342-4e27-8737-edf362d9966a/iso_slayer_1770501512954.png'
]

for f in files:
    process_sprite(f)
