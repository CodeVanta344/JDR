from PIL import Image, ImageFilter

def resize_image_with_blur(input_path, output_path, target_width, target_height):
    try:
        img = Image.open(input_path).convert("RGB")
        img_w, img_h = img.size
        target_aspect = target_width / target_height
        img_aspect = img_w / img_h
        
        # Calculate scaling to fit height (pillarbox)
        scale_h = target_height / img_h
        new_w = int(img_w * scale_h)
        new_h = target_height
        
        resized_img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        # Create blurred background
        bg = img.resize((target_width, target_height), Image.Resampling.BICUBIC)
        bg = bg.filter(ImageFilter.GaussianBlur(radius=50))
        
        # Determine paste position (center)
        paste_x = (target_width - new_w) // 2
        paste_y = 0 # Since we scaled to fit height
        
        # Composite
        final_img = bg.copy()
        # Darken bg slightly
        final_img = Image.eval(final_img, lambda x: x * 0.5)
        
        final_img.paste(resized_img, (paste_x, paste_y))
        
        final_img.save(output_path)
        print(f"Saved {output_path}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    resize_image_with_blur("d:/JDR/tarkov_eft_menacing.png", "d:/JDR/tarkov_eft_menacing_2560x1440.png", 2560, 1440)
