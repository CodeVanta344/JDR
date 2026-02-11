from PIL import Image, ImageDraw

def make_placeholder(name, color1, color2, vertical=True):
    img = Image.new('RGBA', (128, 128), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    if vertical:
        draw.rectangle([0, 64, 128, 128], fill=color1)
        draw.rectangle([0, 0, 128, 64], fill=color2)
    else:
        draw.rectangle([0, 0, 64, 128], fill=color1)
        draw.rectangle([64, 0, 128, 128], fill=color2)
        
    img.save(f"public/transitions/{name}.png")
    print(f"Placeholder {name} created.")

if __name__ == "__main__":
    import os
    if not os.path.exists("public/transitions"):
        os.makedirs("public/transitions")
    
    # Grass (Green) -> Stone (Grey)
    make_placeholder("grass_to_stone_E", (0, 255, 0, 128), (128, 128, 128, 128), vertical=False)
    # Grass (Green) -> Water (Blue)
    make_placeholder("grass_to_water_N", (0, 255, 0, 128), (0, 100, 255, 128), vertical=True)
