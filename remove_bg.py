from PIL import Image
import os

def remove_background(file_path, bg_color):
    try:
        img = Image.open(file_path).convert("RGBA")
        datas = img.getdata()
        
        new_data = []
        for item in datas:
            # Check if pixel matches background color (with slight tolerance)
            if (abs(item[0] - bg_color[0]) < 10 and 
                abs(item[1] - bg_color[1]) < 10 and 
                abs(item[2] - bg_color[2]) < 10):
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
                
        img.putdata(new_data)
        img.save(file_path, "PNG")
        print(f"Processed {file_path}")
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

# Files and their background colors
files = {
    'd:/JDR/public/tree.png': (255, 255, 255),
    'd:/JDR/public/altar.png': (255, 255, 255),
    'd:/JDR/public/pillar.png': (0, 0, 0),
    'd:/JDR/public/rock.png': (0, 0, 0),
    'd:/JDR/public/campfire.png': (0, 0, 0)
}

for path, color in files.items():
    if os.path.exists(path):
        remove_background(path, color)
    else:
        print(f"File not found: {path}")
