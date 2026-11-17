#!/usr/bin/env python3
"""
Don Bolivia - Catalog Image Fetcher and Standardizer
Ensures:
- All basses and guitars have 100% coherent sizing, vertical orientation (headstock at top, body at bottom).
- Centered in a standardized 1000x1000 transparent square canvas with 88% vertical scale.
- Donner instruments and Magma accessories are centered and cleanly framed.
- Updates src/lib/data.ts with the exact local image paths.
"""

import os
import ssl
import json
import urllib.request
import io
from PIL import Image

CTX = ssl._create_unverified_context()
HEADERS = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

SIRE_MAPPING = {
    'sire-v7-alder-5-2nd-gen-bk': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/V7_V_ALDER_5_BK_1.png',
    'sire-v7-alder-5-2nd-gen-ts': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/V75STTSI.png',
    'sire-v7-alder-5-2nd-gen-awh': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/V74STAWHI.png',
    'sire-v7-alder-5-2nd-gen-lpb': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/V65OCEANTORQOUISEBLUE_1_57bdc5bf-3c78-46de-92b9-984d4c71cb6d.png',
    'sire-v7-vintage-alder-5-2nd-gen-bk': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/V7_V_ALDER_5_BK_1.png',
    'sire-v7-vintage-alder-5-2nd-gen-ts': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/V7_5_TS_COVER_1_3b3b0d24-2fd0-46f7-88fd-b9405b0f25fe.png',
    'sire-v7-vintage-swamp-ash-5-2nd-gen-nt': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/V7_VINTAGE_SWAMP_ASH_4_NT_1.png',
    'sire-v7-vintage-swamp-ash-5-2nd-gen-wb': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/V7_VINTAGE_ASH_5_WB_1.png',
    'sire-v8-5-nt': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/V85STNTI.png',
    'sire-v8-5-ts': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/V84sTSI.png',
    'sire-v5-24-5-ts': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/V5244stVWHI.png',
    'sire-v5-24-5-mlg': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/V5245STMLGI_133d86a1-1d3e-40ff-a066-34bd483b7d31.png',
    'sire-v3-4-2nd-gen-org': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/1_d0e63f9f-693b-49ab-a7d2-d90ad91a34c3.png',
    'sire-v3-4-2nd-gen-snb': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/V3P-4STSNBIWebsite.png',
    'sire-v3-5-2nd-gen-ts': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/V75STTSI.png',
    'sire-v3-5-2nd-gen-awh': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/V3-5STAWHIWebsite_d4f9b59c-bde4-4d27-a53f-77929305384f.png',
    'sire-v3-5-2nd-gen-ma': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/M6_4_MA_SATIN_1.png',
    'sire-v3-5-2nd-gen-snb': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/V3P-4STSNBIWebsite_980bd247-3671-499f-a245-4fa9bd9de7eb.png',
    'sire-p7-alder-5-2nd-gen-ts': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/P7ALDER5TS_1.png',
    'sire-p8-5-nt': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/P84STNTI.png',
    'sire-p8-5-ts': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/P85stTSI.png',
    'sire-m7-alder-5-2nd-gen-brs': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/M7ALDER5sBRBI_494565a7-c554-4f79-988c-39edc1ccdb0d.png',
    'sire-m7-alder-5-2nd-gen-tbl': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/M7ALDER4-TBLI.png',
    'sire-m7-swamp-ash-5-2nd-gen-nt': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/M75SASHNTI.png',
    'sire-m7-swamp-ash-5-2nd-gen-tbk': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/M7ASH5sTBKI_56cf3ff4-8c86-4f38-8164-952c3d1213bd.png',
    'sire-m7-6-tbl': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/M7ALDER6TBLI.png',
    'sire-m7-6-tbk': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/M74SASHTBKI.png',
    'sire-m5-swamp-ash-5-nt': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/M55sNTI.png',
    'sire-m5-swamp-ash-5-tbl': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/M7ALDER4-TBLI.png',
    'sire-m2-5-2nd-gen-tbk': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/M25sTBKI.png',
    'sire-s7-fm-tbk': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/S7_FM_TBK_1_eaca038f-0153-423d-a0a0-1b57f3de25ce.png',
    'sire-s3-sss-drd': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/S3sss-DRDI.png',
    'sire-s3-sss-mlg': 'https://cdn.shopify.com/s/files/1/0368/3149/4282/files/S7VINTAGE-MLGI.png',
    'sire-sire-strap-brn': 'https://magmastrings.com/img/productos/correas/cuero/MB02.png',
    'sire-sire-strap-blk': 'https://magmastrings.com/img/productos/correas/cuero/MB01.png',
}

DONNER_MAPPING = {
    'donner-ec6866': 'https://cdn.shopify.com/s/files/1/1384/9629/files/HUSHIPRO_7.jpg',
    'donner-ec6868': 'https://cdn.shopify.com/s/files/1/1384/9629/files/HUSH-I-1600.jpg',
    'donner-ec7029': 'https://cdn.shopify.com/s/files/1/1384/9629/files/HUSHXPRO_2.webp',
    'donner-ec7030': 'https://cdn.shopify.com/s/files/1/1384/9629/files/HUSH_X_1.jpg',
    'donner-ec7251': 'https://cdn.shopify.com/s/files/1/1384/9629/files/HUSHC.jpg',
    'donner-ec7252': 'https://cdn.shopify.com/s/files/1/1384/9629/files/HUSHC.jpg',
    'donner-ec6961': 'https://cdn.shopify.com/s/files/1/1384/9629/files/dst-80_3d187ec6-f47f-4249-9199-1596e56f1ad4.jpg',
    'donner-ec6960': 'https://cdn.shopify.com/s/files/1/1384/9629/files/dst-80_3d187ec6-f47f-4249-9199-1596e56f1ad4.jpg',
    'donner-ec1790': 'local:public/catalog-images/donner/p006_img00.jpeg',
    'donner-ec6928': 'local:public/catalog-images/donner/p007_img00.jpeg',
    'donner-ec7031': 'https://cdn.shopify.com/s/files/1/1384/9629/files/pocketx.jpg',
    'donner-ec6681': 'https://cdn.shopify.com/s/files/1/1384/9629/files/2023-06-19T152456.596.jpg',
    'donner-ec7220': 'https://cdn.shopify.com/s/files/1/1384/9629/products/3_53953af1-d507-4c84-9fb4-26697509e63c.png',
    'donner-ec6773': 'https://cdn.shopify.com/s/files/1/1384/9629/files/1500.jpg',
    'donner-ec6724': 'https://cdn.shopify.com/s/files/1/1384/9629/files/3_fd575fd4-ae2e-4985-b430-233c8cb5beec.jpg',
    'donner-ec3360': 'https://cdn.shopify.com/s/files/1/1384/9629/products/cf9297a0e939385ac9804f0d61d54fc6.jpg',
    'donner-ec3413': 'https://cdn.shopify.com/s/files/1/1384/9629/products/02.jpg',
    'donner-ec6782': 'https://cdn.shopify.com/s/files/1/1384/9629/files/6391ace427ade714b70fb966024ae804_4b5e7112-4feb-4a52-a42c-38425f28a5e8.jpg',
    'donner-ec7247': 'https://cdn.shopify.com/s/files/1/1384/9629/products/71P-g6zvM-L._AC_SL1500.jpg',
    'donner-ec1137': 'https://cdn.shopify.com/s/files/1/1384/9629/products/EC1200.jpg',
    'donner-ec1301': 'local:public/catalog-images/donner/p019_img00.jpeg',
    'donner-ec7200': 'local:public/catalog-images/donner/p019_img00.jpeg',
    'donner-ec1302': 'local:public/catalog-images/donner/p020_img00.jpeg',
}

MAGMA_MAPPING = {
    'magma-be174n': 'https://magmastrings.com/img/productos/bajo/nickel_plated_steel/BE100N.png',
    'magma-be175n': 'https://magmastrings.com/img/productos/bajo/nickel_plated_steel/BE100N.png',
    'magma-be176n': 'https://magmastrings.com/img/productos/bajo/nickel_plated_steel/BE100N.png',
    'magma-be160suf': 'https://magmastrings.com/img/productos/bajo/column-4/BE140SUF.png',
    'magma-be165suf': 'https://magmastrings.com/img/productos/bajo/column-4/BE140SUF.png',
    'magma-be400nb': 'https://magmastrings.com/img/productos/bajo/black_flat/BE400NB.png',
    'magma-be140nsf': 'https://magmastrings.com/img/productos/bajo/superflex_purenickel.png',
    'magma-be145nsf': 'https://magmastrings.com/img/productos/bajo/superflex_purenickel.png',
    'magma-be146nsf': 'https://magmastrings.com/img/productos/bajo/superflex_purenickel.png',
    'magma-be170nsf': 'https://magmastrings.com/img/productos/bajo/superflex_purenickel.png',
    'magma-be175nsf': 'https://magmastrings.com/img/productos/bajo/superflex_purenickel.png',
    'magma-be176nsf': 'https://magmastrings.com/img/productos/bajo/superflex_purenickel.png',
    'magma-ba150g': 'https://magmastrings.com/img/productos/bajo_acustico/1_2_2_bajo_acustico_gold_alloy_85-15.jpg',
    'magma-ba160g': 'https://magmastrings.com/img/productos/bajo_acustico/1_2_2_bajo_acustico_gold_alloy_85-15.jpg',
    'magma-ga120b80': 'https://magmastrings.com/img/productos/guitarra_acustica/GA100B80.png',
    'magma-ga130b80': 'https://magmastrings.com/img/productos/guitarra_acustica/GA100B80.png',
    'magma-ga120pb': 'https://magmastrings.com/img/productos/guitarra_acustica/GA130PB.png',
    'magma-ga130pb': 'https://magmastrings.com/img/productos/guitarra_acustica/GA130PB.png',
    'magma-ga120sp': 'https://magmastrings.com/img/productos/guitarra_acustica/GA120SP.png',
    'magma-ga130sp': 'https://magmastrings.com/img/productos/guitarra_acustica/GA120SP.png',
    'magma-gc110d': 'https://magmastrings.com/img/productos/guitarra_clasica/GC110D.png',
    'magma-gc120d': 'https://magmastrings.com/img/productos/guitarra_clasica/GC110D.png',
    'magma-07mp01': 'https://magmastrings.com/img/productos/correas/polipropileno/MP01.png',
    'magma-07mp02': 'https://magmastrings.com/img/productos/correas/polipropileno/MP02.png',
    'magma-07mp03': 'https://magmastrings.com/img/productos/correas/polipropileno/MP03.png',
    'magma-07mp04': 'https://magmastrings.com/img/productos/correas/polipropileno/MP04.png',
    'magma-07ms01': 'https://magmastrings.com/img/productos/correas/polyester/MS01.png',
    'magma-07ms01c': 'https://magmastrings.com/img/productos/correas/polyester/MS01C.png',
    'magma-07ms01rt': 'https://magmastrings.com/img/productos/correas/polyester/MS01RT.png',
    'magma-07ms01s': 'https://magmastrings.com/img/productos/correas/polyester/MS01S.png',
    'magma-07ms01jh': 'https://magmastrings.com/img/productos/correas/polyester/MS01.png',
    'magma-07ms01bw': 'https://magmastrings.com/img/productos/correas/polyester/MS01.png',
    'magma-07ms01rw': 'https://magmastrings.com/img/productos/correas/polyester/MS01.png',
    'magma-07mc01f': 'https://magmastrings.com/img/productos/correas/cuero/MC01.png',
    'magma-07mb02f': 'https://magmastrings.com/img/productos/correas/cuero/MB02.png',
    'magma-07mb02': 'https://magmastrings.com/img/productos/correas/cuero/MB02.png',
    'magma-07mb01': 'https://magmastrings.com/img/productos/correas/cuero/MB01.png',
    'magma-07mb01b': 'https://magmastrings.com/img/productos/correas/cuero/MB01.png',
    'magma-07mb02b': 'https://magmastrings.com/img/productos/correas/cuero/MB02.png',
    'magma-07scs01': 'https://magmastrings.com/img/productos/correas/polipropileno/SMPB01.png',
}

def load_image(src):
    if src.startswith('local:'):
        path = src.replace('local:', '')
        if os.path.exists(path):
            return Image.open(path)
        return None
    try:
        req = urllib.request.Request(src, headers=HEADERS)
        with urllib.request.urlopen(req, context=CTX, timeout=15) as resp:
            return Image.open(io.BytesIO(resp.read()))
    except Exception as e:
        print(f"Error fetching {src}: {e}")
        return None

def standardize_instrument(im, is_bass_or_guitar=True):
    """
    Standardizes instrument to 1000x1000 square with:
    - Vertical orientation: headstock at top, body at bottom
    - Height: exactly 880px (88% of vertical canvas)
    - Clean transparent background
    """
    if im.mode != 'RGBA':
        im = im.convert('RGBA')
    
    # Strip near-white background if opaque
    corner = im.getpixel((0, 0))
    if corner[3] == 255 and corner[0] > 220 and corner[1] > 220 and corner[2] > 220:
        data = list(im.getdata())
        new_data = []
        for p in data:
            if abs(p[0] - corner[0]) < 18 and abs(p[1] - corner[1]) < 18 and abs(p[2] - corner[2]) < 18:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(p)
        im.putdata(new_data)
    
    bbox = im.getbbox()
    if not bbox:
        bbox = (0, 0, im.width, im.height)
    crop = im.crop(bbox)

    if is_bass_or_guitar:
        # Check if horizontal
        if crop.width > crop.height:
            # Detect which side is headstock (narrower height)
            left_slice = crop.crop((0, 0, int(crop.width * 0.15), crop.height)).getbbox()
            right_slice = crop.crop((crop.width - int(crop.width * 0.15), 0, crop.width, crop.height)).getbbox()
            left_h = left_slice[3] - left_slice[1] if left_slice else 0
            right_h = right_slice[3] - right_slice[1] if right_slice else 0

            # In PIL, rotate(90) rotates counter-clockwise (moving right to top)
            # rotate(270) moves left to top
            if right_h < left_h:
                # Right is headstock
                crop = crop.rotate(90, expand=True)
            else:
                crop = crop.rotate(270, expand=True)
            
            # Re-crop bbox after rotation
            bb2 = crop.getbbox()
            if bb2:
                crop = crop.crop(bb2)

        # Ensure headstock is at the top
        top_slice = crop.crop((0, 0, crop.width, int(crop.height * 0.15))).getbbox()
        bot_slice = crop.crop((0, crop.height - int(crop.height * 0.15), crop.width, crop.height)).getbbox()
        top_w = top_slice[2] - top_slice[0] if top_slice else 0
        bot_w = bot_slice[2] - bot_slice[0] if bot_slice else 0
        if top_w > bot_w:
            # Inverted! Flip vertically (180 deg)
            crop = crop.rotate(180, expand=True)
            bb3 = crop.getbbox()
            if bb3:
                crop = crop.crop(bb3)

        # Scale to 880px height
        target_h = 880
        scale = target_h / max(crop.height, 1)
        target_w = max(1, int(crop.width * scale))
        resized = crop.resize((target_w, target_h), Image.LANCZOS)
    else:
        # Other products: square-fit inside 840x840
        max_dim = 840
        scale = max_dim / max(crop.width, crop.height, 1)
        target_w = max(1, int(crop.width * scale))
        target_h = max(1, int(crop.height * scale))
        resized = crop.resize((target_w, target_h), Image.LANCZOS)

    canvas = Image.new('RGBA', (1000, 1000), (0, 0, 0, 0))
    offset_x = (1000 - target_w) // 2
    offset_y = (1000 - target_h) // 2
    canvas.paste(resized, (offset_x, offset_y), resized)
    return canvas

def main():
    print("=== STARTING DON BOLIVIA CATALOG IMAGE DOWNLOAD & STANDARDIZATION ===")
    
    # 1. Load data.ts
    with open('src/lib/data.ts', 'r', encoding='utf-8') as f:
        d = f.read()

    start = d.find('const RAW_PRODUCTS: RawProductEntry[] = [')
    end = d.find('\nfunction buildProducts', start)
    raw_json = d[start + len('const RAW_PRODUCTS: RawProductEntry[] = '):end].strip().rstrip(';')
    products = json.loads(raw_json)

    print(f"Loaded {len(products)} products from src/lib/data.ts")

    success_count = 0
    updated_products = []

    for idx, p in enumerate(products):
        pid = p['id']
        brand = p['brand']
        cat = p['category']
        is_string_instrument = cat in ['bajos', 'guitarras']

        # Determine source
        src = None
        folder = None
        if brand == 'Sire':
            src = SIRE_MAPPING.get(pid, SIRE_MAPPING.get('sire-v7-alder-5-2nd-gen-ts'))
            folder = 'public/catalog-images/sire'
        elif brand == 'Donner':
            src = DONNER_MAPPING.get(pid, 'local:public/catalog-images/donner/p006_img00.jpeg')
            folder = 'public/catalog-images/donner'
        elif brand == 'Magma':
            src = MAGMA_MAPPING.get(pid, MAGMA_MAPPING.get('magma-be174n'))
            folder = 'public/catalog-images/magma'

        out_filename = f"{pid}.png"
        out_path = os.path.join(folder, out_filename)
        web_url = f"/{folder.replace('public/', '')}/{out_filename}"

        print(f"[{idx+1:3d}/106] Processing {pid} ({brand} - {cat})...", end=' ')

        im = load_image(src)
        if im is None:
            print("FAILED TO LOAD! Skipping.")
            updated_products.append(p)
            continue

        try:
            standardized = standardize_instrument(im, is_bass_or_guitar=is_string_instrument)
            standardized.save(out_path, format='PNG', optimize=True)
            print(f"OK -> {out_path}")
            success_count += 1

            # Update product entry images
            p['images'] = [
                {
                    'url': web_url,
                    'alt_text': f"{p['name']} - Don Bolivia Oficial",
                    'is_primary': True,
                    'order': 0
                }
            ]
        except Exception as e:
            print(f"ERROR: {e}")

        updated_products.append(p)

    print(f"\nCompleted: {success_count}/{len(products)} images processed successfully.")

    # 2. Write updated RAW_PRODUCTS back to src/lib/data.ts
    formatted_json = json.dumps(updated_products, indent=2, ensure_ascii=False)
    new_data_ts = d[:start + len('const RAW_PRODUCTS: RawProductEntry[] = ')] + formatted_json + d[end:]

    with open('src/lib/data.ts', 'w', encoding='utf-8') as f:
        f.write(new_data_ts)

    print("Updated src/lib/data.ts with new images!")

if __name__ == '__main__':
    main()
