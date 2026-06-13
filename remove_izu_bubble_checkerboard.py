from collections import deque
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    raise SystemExit(
        "Error: Pillow is required to remove the checkerboard background.\n"
        "Install it by running: pip install pillow"
    )


PROJECT_ROOT = Path(__file__).resolve().parent
INPUT_PATH = PROJECT_ROOT / "public" / "ui" / "izu-message-bubble.png"
OUTPUT_PATH = (
    PROJECT_ROOT / "public" / "ui" / "izu-message-bubble-transparent.png"
)

MIN_BACKGROUND_CHANNEL = 220
MAX_CHANNEL_DIFFERENCE = 12


def is_checkerboard_background(pixel: tuple[int, int, int, int]) -> bool:
    red, green, blue, _alpha = pixel
    return (
        min(red, green, blue) >= MIN_BACKGROUND_CHANNEL
        and max(red, green, blue) - min(red, green, blue)
        <= MAX_CHANNEL_DIFFERENCE
    )


def remove_edge_connected_checkerboard(image: Image.Image) -> int:
    width, height = image.size
    pixels = image.load()
    visited = bytearray(width * height)
    queue: deque[tuple[int, int]] = deque()

    def enqueue_if_background(x: int, y: int) -> None:
        index = y * width + x
        if visited[index]:
            return

        visited[index] = 1
        if is_checkerboard_background(pixels[x, y]):
            queue.append((x, y))

    for x in range(width):
        enqueue_if_background(x, 0)
        enqueue_if_background(x, height - 1)

    for y in range(1, height - 1):
        enqueue_if_background(0, y)
        enqueue_if_background(width - 1, y)

    transparent_count = 0

    while queue:
        x, y = queue.popleft()
        red, green, blue, _alpha = pixels[x, y]
        pixels[x, y] = (red, green, blue, 0)
        transparent_count += 1

        if x > 0:
            enqueue_if_background(x - 1, y)
        if x + 1 < width:
            enqueue_if_background(x + 1, y)
        if y > 0:
            enqueue_if_background(x, y - 1)
        if y + 1 < height:
            enqueue_if_background(x, y + 1)

    return transparent_count


def main() -> None:
    if not INPUT_PATH.is_file():
        raise SystemExit(f"Error: Input image not found: {INPUT_PATH}")

    with Image.open(INPUT_PATH) as source_image:
        image = source_image.convert("RGBA")

    transparent_count = remove_edge_connected_checkerboard(image)
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    image.save(OUTPUT_PATH, format="PNG")
    image.close()

    print(f"Input: {INPUT_PATH}")
    print(f"Output: {OUTPUT_PATH}")
    print(f"Image size: {source_image.width} x {source_image.height}")
    print(f"Pixels made transparent: {transparent_count}")


if __name__ == "__main__":
    main()
