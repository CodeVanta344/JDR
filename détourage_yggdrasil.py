from PIL import Image
import os
import numpy as np

def process_image(input_path, output_path):
    print(f"Détourage (fond blanc) de {input_path}...")
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img)
    
    # Create mask for pixels that are very close to pure white
    # Threshold 245 to catch slightly off-white pixels at the edges
    r, g, b, a = data.T
    bg_mask = (r > 245) & (g > 245) & (b > 245)
    
    # Apply transparency
    data[..., 3][bg_mask.T] = 0
    
    # Save result
    new_img = Image.fromarray(data)
    new_img.save(output_path, "PNG")
    print(f"Asset transparent final sauvegardé dans : {output_path}")

if __name__ == "__main__":
    input_file = r"C:\Users\loicr\.gemini\antigravity\brain\d74be551-3619-409d-be74-fb85c2b757cf\yggdrasil_pure_white_bg_1771081012911.png"
    output_file = r"C:\Users\loicr\.gemini\antigravity\brain\d74be551-3619-409d-be74-fb85c2b757cf\yggdrasil_world_tree_final.png"
    
    if os.path.exists(input_file):
        process_image(input_file, output_file)
    else:
        print(f"Fichier non trouvé : {input_file}")
