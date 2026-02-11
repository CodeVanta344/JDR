from PIL import Image
import os

def trim_transparent(path):
    try:
        img = Image.open(path).convert("RGBA")
        # Get bounding box of non-zero alpha pixels
        bbox = img.getbbox()
        if bbox:
            cropped = img.crop(bbox)
            cropped.save(path)
            print(f"Cropped {path} to {bbox}")
        else:
            print(f"No content in {path}")
    except Exception as e:
        print(f"Error processing {path}: {e}")

files = [
    'd:/JDR/public/tree.png',
    'd:/JDR/public/pillar.png',
    'd:/JDR/public/altar.png',
    'd:/JDR/public/rock.png',
    'd:/JDR/public/campfire.png'
]

for f in files:
    if os.path.exists(f):
        trim_transparent(f)
