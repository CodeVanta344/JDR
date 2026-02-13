from PIL import Image, ImageDraw
import os

def process_image(input_path, output_path):
    print(f"Opening {input_path}...")
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    # Use flood fill from the corners to create a mask for the background
    # We use a tolerance to handle non-pure white at the edges
    mask = Image.new("L", (width, height), 0)
    
    # We'll try to find a "background" color by looking at the top-left pixel
    bg_color = img.getpixel((0, 0))
    print(f"Detected background color: {bg_color}")
    
    # Fill from the four corners
    # (Checking if the pixel is close to bg_color)
    ImageDraw.floodfill(img, (0, 0), (0, 0, 0, 0), thresh=30)
    ImageDraw.floodfill(img, (width-1, 0), (0, 0, 0, 0), thresh=30)
    ImageDraw.floodfill(img, (0, height-1), (0, 0, 0, 0), thresh=30)
    ImageDraw.floodfill(img, (width-1, height-1), (0, 0, 0, 0), thresh=30)
    
    # Save the result
    img.save(output_path, "PNG")
    print(f"Saved to {output_path}")

if __name__ == "__main__":
    input_file = r"C:\Users\loicr\.gemini\antigravity\brain\4220d9b8-edb6-450a-bfe1-d69a78f1d174\castle_solarius_building_only_white_bg_retry_1771012179761.png"
    output_file = r"C:\Users\loicr\.gemini\antigravity\brain\4220d9b8-edb6-450a-bfe1-d69a78f1d174\castle_solarius_isolated_final.png"
    
    if os.path.exists(input_file):
        process_image(input_file, output_file)
    else:
        print(f"Input file not found: {input_file}")
