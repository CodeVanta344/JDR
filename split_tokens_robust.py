from PIL import Image
import sys
import os
import sys

# Increase recursion depth just in case, though we'll try to use iterative
sys.setrecursionlimit(20000)

def split_transparent_tokens_robust(image_path):
    print(f"Processing {image_path}...")
    try:
        img = Image.open(image_path).convert("RGBA")
        width, height = img.size
        pixels = img.load()
        
        visited = set()
        components = []
        
        # Simple iterative flood fill to find connected components
        for y in range(height):
            for x in range(width):
                if (x, y) in visited:
                    continue
                
                r, g, b, a = pixels[x, y]
                # If pixel is not transparent
                if a > 20: 
                    # Start a new component
                    component_pixels = []
                    stack = [(x, y)]
                    visited.add((x, y))
                    
                    min_x, max_x = x, x
                    min_y, max_y = y, y
                    
                    while stack:
                        cx, cy = stack.pop()
                        component_pixels.append((cx, cy))
                        
                        min_x = min(min_x, cx)
                        max_x = max(max_x, cx)
                        min_y = min(min_y, cy)
                        max_y = max(max_y, cy)
                        
                        # Check neighbors (4-connectivity)
                        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                            nx, ny = cx + dx, cy + dy
                            if 0 <= nx < width and 0 <= ny < height:
                                if (nx, ny) not in visited:
                                    nr, ng, nb, na = pixels[nx, ny]
                                    if na > 20:
                                        visited.add((nx, ny))
                                        stack.append((nx, ny))
                    
                    # Store component if it's big enough (filter noise)
                    # Example: at least 50x50 pixels roughly area-wise or strict dims
                    if (max_x - min_x > 20) and (max_y - min_y > 20):
                         components.append({
                             'pixels': component_pixels,
                             'bbox': (min_x, min_y, max_x, max_y)
                         })

        print(f"Found {len(components)} components.")
        
        base_name = os.path.splitext(image_path)[0]
        
        for i, comp in enumerate(components):
            min_x, min_y, max_x, max_y = comp['bbox']
            
            # Add padding
            pad = 10
            crop_min_x = max(0, min_x - pad)
            crop_min_y = max(0, min_y - pad)
            crop_max_x = min(width, max_x + pad)
            crop_max_y = min(height, max_y + pad)
            
            # Crop the original image
            token_img = img.crop((crop_min_x, crop_min_y, crop_max_x + 1, crop_max_y + 1))
            
            out_name = f"{base_name}_token_{i+1}.png"
            token_img.save(out_name)
            print(f"Saved token {i+1} to {out_name}")

    except Exception as e:
        print(f"Error processing {image_path}: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    if len(sys.argv) > 1:
        for arg in sys.argv[1:]:
            split_transparent_tokens_robust(arg)
    else:
        print("Usage: python split_tokens_robust.py <image_path>")
