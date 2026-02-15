from PIL import Image
import sys
import os

def remove_white_bg(image_path, tolerance=40):
    print(f"Processing {image_path}...")
    try:
        img = Image.open(image_path).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # item is (R, G, B, A)
            r, g, b, a = item
            
            # Check for white (or near white)
            if r > 255 - tolerance and g > 255 - tolerance and b > 255 - tolerance:
                newData.append((255, 255, 255, 0)) # Fully transparent
            else:
                newData.append(item)
                
        img.putdata(newData)
        
        # Crop to content (optional but good for tokens)
        bbox = img.getbbox()
        if bbox:
            img = img.crop(bbox)
            
        output_path = os.path.splitext(image_path)[0] + "_transparent.png"
        img.save(output_path, "PNG")
        print(f"Saved transparent image to: {output_path}")
        return output_path
    except Exception as e:
        print(f"Error processing {image_path}: {e}")
        return None

if __name__ == "__main__":
    if len(sys.argv) > 1:
        for arg in sys.argv[1:]:
            remove_white_bg(arg)
    else:
        print("Usage: python script.py <image_path>")
