from PIL import Image
import sys
import os

def remove_bg_flood(path):
    if not os.path.exists(path):
        print(f"File not found: {path}")
        return
    try:
        img = Image.open(path).convert("RGBA")
        width, height = img.size
        # Use a copy to allow safe editing
        img = img.copy()
        pixels = img.load()
        
        # Background is white (255, 255, 255)
        bg_color = (255, 255, 255)
        
        # Simple tolerance check
        def is_bg(p):
            # Tolerance 20 to catch near-white pixels near edges
            tol = 20
            return abs(p[0] - bg_color[0]) < tol and abs(p[1] - bg_color[1]) < tol and abs(p[2] - bg_color[2]) < tol

        # Replace all matching pixels
        for y in range(height):
            for x in range(width):
                if is_bg(pixels[x, y]):
                    pixels[x, y] = (0, 0, 0, 0)
        
        img.save(path)
        print(f"Successfully processed {path}")
    except Exception as e:
        print(f"Error processing {path}: {e}")

# Process specific high-quality sprites
remove_bg_flood('d:/JDR/public/house_varna.png')
remove_bg_flood('d:/JDR/public/tree_sylvae.png')
remove_bg_flood('d:/JDR/public/statue_khelos.png')

# Process all transitions
transitions_dir = 'd:/JDR/public/transitions'
if os.path.exists(transitions_dir):
    for f in os.listdir(transitions_dir):
        if f.endswith(".png"):
            remove_bg_flood(os.path.join(transitions_dir, f))
