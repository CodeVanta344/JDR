from PIL import Image, ImageDraw
import os

def process_image(input_path, output_path):
    print(f"Opening {input_path}...")
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    # Target the detected background color with a tighter threshold
    # to avoid eating into the tree highlights
    new_data = []
    bg_color = (255, 255, 255) # Standard white base
    
    for item in datas:
        # If the pixel is very close to white, make it transparent
        # Using a threshold of 15 to catch the off-white compression artifacts
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Saved to {output_path}")

if __name__ == "__main__":
    input_file = r"C:\Users\loicr\.gemini\antigravity\brain\4220d9b8-edb6-450a-bfe1-d69a78f1d174\yggdrasil_iso_realistic_1_1771017454492.png"
    output_file = r"C:\Users\loicr\.gemini\antigravity\brain\4220d9b8-edb6-450a-bfe1-d69a78f1d174\yggdrasil_iso_realistic_final.png"
    
    if os.path.exists(input_file):
        process_image(input_file, output_file)
    else:
        print(f"Input file not found: {input_file}")
