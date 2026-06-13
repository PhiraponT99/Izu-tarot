from pathlib import Path

try:
    from PIL import Image
except ImportError:
    raise SystemExit(
        "Error: Pillow is required to convert the tarot card images.\n"
        "Install it by running: pip install pillow"
    )


OVERWRITE = False
TARGET_WIDTH = 768
WEBP_QUALITY = 85
WEBP_METHOD = 6

PROJECT_ROOT = Path(__file__).resolve().parent
SOURCE_DIR = PROJECT_ROOT / "izu-tarot-assets" / "png-master"
OUTPUT_DIR = PROJECT_ROOT / "public" / "cards" / "major"

CARD_FILES = {
    "00-0-The-Fool-vFinal.png": "00-0-the-fool.webp",
    "01-I-The-Magician-vFinal.png": "01-i-the-magician.webp",
    "02-II-The-High-Priestess-vFinal.png": "02-ii-the-high-priestess.webp",
    "03-III-The-Empress-vFinal.png": "03-iii-the-empress.webp",
    "04-IV-The-Emperor-vFinal.png": "04-iv-the-emperor.webp",
    "05-V-The-Hierophant-vFinal.png": "05-v-the-hierophant.webp",
    "06-VI-The-Lovers-vFinal.png": "06-vi-the-lovers.webp",
    "07-VII-The-Chariot-vFinal.png": "07-vii-the-chariot.webp",
    "08-VIII-Strength-vFinal.png": "08-viii-strength.webp",
    "09-IX-The-Hermit-vFinal.png": "09-ix-the-hermit.webp",
    "10-X-Wheel-of-Fortune-vFinal.png": "10-x-wheel-of-fortune.webp",
    "11-XI-Justice-vFinal.png": "11-xi-justice.webp",
    "12-XII-The-Hanged-Man-vFinal.png": "12-xii-the-hanged-man.webp",
    "13-XIII-Death-vFinal.png": "13-xiii-death.webp",
    "14-XIV-Temperance-vFinal.png": "14-xiv-temperance.webp",
    "15-XV-The-Devil-vFinal.png": "15-xv-the-devil.webp",
    "16-XVI-The-Tower-vFinal.png": "16-xvi-the-tower.webp",
    "17-XVII-The-Star-vFinal.png": "17-xvii-the-star.webp",
    "18-XVIII-The-Moon-vFinal.png": "18-xviii-the-moon.webp",
    "19-XIX-The-Sun-vFinal.png": "19-xix-the-sun.webp",
    "20-XX-Judgement-vFinal.png": "20-xx-judgement.webp",
    "21-XXI-The-World-vFinal.png": "21-xxi-the-world.webp",
}


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    counts = {
        "converted": 0,
        "missing": 0,
        "existing": 0,
        "errors": 0,
    }

    for source_name, output_name in CARD_FILES.items():
        source_path = SOURCE_DIR / source_name
        output_path = OUTPUT_DIR / output_name

        if not source_path.is_file():
            print(f"[SKIPPED - MISSING] {source_path.relative_to(PROJECT_ROOT)}")
            counts["missing"] += 1
            continue

        if output_path.exists() and not OVERWRITE:
            print(f"[SKIPPED - EXISTS]  {output_path.relative_to(PROJECT_ROOT)}")
            counts["existing"] += 1
            continue

        try:
            with Image.open(source_path) as image:
                if image.width <= 0 or image.height <= 0:
                    raise ValueError("Image has invalid dimensions")

                target_height = round(image.height * TARGET_WIDTH / image.width)
                resized_image = image.resize(
                    (TARGET_WIDTH, target_height),
                    Image.Resampling.LANCZOS,
                ).convert("RGB")

                resized_image.save(
                    output_path,
                    format="WEBP",
                    quality=WEBP_QUALITY,
                    method=WEBP_METHOD,
                )
                resized_image.close()

            print(
                f"[CONVERTED]         {source_path.relative_to(PROJECT_ROOT)}"
                f" -> {output_path.relative_to(PROJECT_ROOT)}"
            )
            counts["converted"] += 1
        except Exception as error:
            print(
                f"[ERROR]             {source_path.relative_to(PROJECT_ROOT)}:"
                f" {error}"
            )
            counts["errors"] += 1

    print("\nSummary")
    print(f"  Converted:        {counts['converted']}")
    print(f"  Missing sources:  {counts['missing']}")
    print(f"  Existing outputs: {counts['existing']}")
    print(f"  Errors:           {counts['errors']}")
    print(f"  Total processed:  {len(CARD_FILES)}")


if __name__ == "__main__":
    main()
