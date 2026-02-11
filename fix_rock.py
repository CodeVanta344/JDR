from PIL import Image

def fix_rock():
    try:
        path = 'd:/JDR/public/rock.png'
        img = Image.open(path).convert("RGBA")
        datas = img.getdata()
        
        new_data = []
        for item in datas:
            # Higher tolerance for "black" (dark grey pixels)
            # R, G, B < 40 covers dark noises
            if item[0] < 40 and item[1] < 40 and item[2] < 40:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
                
        img.putdata(new_data)
        img.save(path, "PNG")
        print(f"Fixed {path}")
    except Exception as e:
        print(f"Error: {e}")

fix_rock()
