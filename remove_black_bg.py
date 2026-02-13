from PIL import Image
import os
import sys

def remove_black_background(image_path):
    print(f"Processing {image_path}...")
    try:
        img = Image.open(image_path).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # item is (R, G, B, A)
            r, g, b, a = item
            
            # Calculate brightness/luminance
            # Simple max method for retention of color intensity
            brightness = max(r, g, b)
            
            if brightness < 10:
                # Almost pure black -> transparent
                newData.append((0, 0, 0, 0))
            else:
                # Use brightness as alpha
                # This creates a "screen" effect where darker pixels become more transparent
                # We boost alpha slightly to make the core solid
                new_alpha = min(255, int(brightness * 1.5)) 
                
                # Normalize color to remove black influence (un-premultiply)
                # Avoid division by zero
                if new_alpha > 0:
                    # We want the color to look correct when alpha is applied
                    # (R, G, B) on black = (r, g, b)
                    # New pixel (nr, ng, nb, na) should result in same appearance
                    # We keep original RGB values but set Alpha
                    newData.append((r, g, b, new_alpha))
                else:
                    newData.append((0, 0, 0, 0))

        img.putdata(newData)
        
        output_path = image_path.replace("_black_bg", "_transparent").replace(".png", "_final.png")
        if output_path == image_path:
             output_path = os.path.splitext(image_path)[0] + "_transparent.png"
             
        img.save(output_path, "PNG")
        print(f"Saved to {output_path}")
        return output_path
    except Exception as e:
        print(f"Error processing {image_path}: {e}")
        return None

# List of files to process (Update this list with actual filenames)
files_to_process = [
    r"C:\Users\loicr\.gemini\antigravity\brain\4220d9b8-edb6-450a-bfe1-d69a78f1d174\lightning_bolt_isometric_black_bg_1771019917863.png",
    r"C:\Users\loicr\.gemini\antigravity\brain\4220d9b8-edb6-450a-bfe1-d69a78f1d174\forked_lightning_isometric_black_bg_1771019930970.png",
    # The third image will be added dynamically or manually
]

if __name__ == "__main__":
    # If arguments are passed, use them
    if len(sys.argv) > 1:
        for arg in sys.argv[1:]:
             remove_black_background(arg)
    else:
        for file_path in files_to_process:
            if os.path.exists(file_path):
                remove_black_background(file_path)
            else:
                print(f"File not found: {file_path}")
