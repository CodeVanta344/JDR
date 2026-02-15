from PIL import Image
import sys
import os
import numpy as np

def split_transparent_tokens(image_path):
    print(f"Processing {image_path}...")
    try:
        img = Image.open(image_path).convert("RGBA")
        # Convert to numpy array for fast processing if possible, or just use pixel access
        # PIL pixel access is valid.
        
        width, height = img.size
        pixels = img.load()
        
        # We need to find connected components.
        # Since we don't know if numpy/scipy is installed, we'll use a simple gap-splitting heuristic
        # consistent with typical grid generation.
        
        # 1. Horizontal Projection (Columns)
        # Find columns that have at least one non-transparent pixel
        non_empty_cols = []
        for x in range(width):
            has_pixel = False
            for y in range(height):
                if pixels[x, y][3] > 10: # Threshold for alpha
                    has_pixel = True
                    break
            if has_pixel:
                non_empty_cols.append(x)
                
        if not non_empty_cols:
            print("No content found.")
            return

        # Find gaps in columns
        col_regions = []
        if non_empty_cols:
            start = non_empty_cols[0]
            prev = non_empty_cols[0]
            for x in non_empty_cols[1:]:
                if x > prev + 1:
                    # Gap found
                    col_regions.append((start, prev))
                    start = x
                prev = x
            col_regions.append((start, prev))

        token_count = 0
        base_name = os.path.splitext(image_path)[0]

        # 2. For each vertical strip, find Horizontal rows (Vertical Projection)
        for x_start, x_end in col_regions:
            # Check this strip for y-gaps
            non_empty_rows = []
            for y in range(height):
                has_pixel = False
                for x in range(x_start, x_end + 1):
                    if pixels[x, y][3] > 10:
                        has_pixel = True
                        break
                if has_pixel:
                    non_empty_rows.append(y)
            
            if not non_empty_rows:
                continue

            # Find gaps in rows for this strip
            row_regions = []
            if non_empty_rows:
                y_start = non_empty_rows[0]
                prev_y = non_empty_rows[0]
                for y in non_empty_rows[1:]:
                    if y > prev_y + 1:
                        row_regions.append((y_start, prev_y))
                        y_start = y
                    prev_y = y
                row_regions.append((y_start, prev_y))

            # Now save each region
            for y_start, y_end in row_regions:
                # Add some padding
                pad = 5
                crop_box = (
                    max(0, x_start - pad),
                    max(0, y_start - pad),
                    min(width, x_end + 1 + pad),
                    min(height, y_end + 1 + pad)
                )
                
                # Verify it's not too small (noise)
                if (crop_box[2] - crop_box[0] < 20) or (crop_box[3] - crop_box[1] < 20):
                    continue

                token_img = img.crop(crop_box)
                token_count += 1
                out_name = f"{base_name}_token_{token_count}.png"
                token_img.save(out_name)
                print(f"Saved token {token_count} to {out_name}")

    except Exception as e:
        print(f"Error processing {image_path}: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    if len(sys.argv) > 1:
        for arg in sys.argv[1:]:
            split_transparent_tokens(arg)
    else:
        print("Usage: python split_tokens.py <image_path>")
