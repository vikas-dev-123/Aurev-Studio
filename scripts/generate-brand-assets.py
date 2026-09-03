#!/usr/bin/env python3
"""Generates the static brand assets in /public from the logomark geometry.

The mark is drawn from the same coordinates as src/components/navigation/Logomark.tsx
(40x40 grid) so the favicon, touch icon and OG image can never drift from the
component. Run with: python3 scripts/generate-brand-assets.py

Requires Pillow.
"""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, "public")
os.makedirs(PUBLIC, exist_ok=True)

INK = (11, 11, 12, 255)
PAPER = (250, 249, 245, 255)
YELLOW = (244, 217, 62, 255)
GREEN = (47, 214, 115, 255)
PINK = (255, 111, 160, 255)

WINDOWS_FONTS = os.path.join(os.environ.get("WINDIR", "C:\\Windows"), "Fonts")
SANS_BOLD = (
    os.path.join(WINDOWS_FONTS, "arialbd.ttf")
    if os.path.exists(os.path.join(WINDOWS_FONTS, "arialbd.ttf"))
    else "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf"
)
SANS = (
    os.path.join(WINDOWS_FONTS, "arial.ttf")
    if os.path.exists(os.path.join(WINDOWS_FONTS, "arial.ttf"))
    else "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf"
)

# Perpendicular offset for the 45-degree chamfers of a 5-unit wide trace.
O = 2.5 * (2 ** 0.5) / 2


def draw_glyph(draw, unit, ox, oy, color, pads=True):
    """Draws the mark on a 40x40 grid scaled by `unit`, offset by (ox, oy)."""
    def r(x0, y0, x1, y1):
        draw.rectangle([ox + x0 * unit, oy + y0 * unit, ox + x1 * unit, oy + y1 * unit], fill=color)

    def p(points):
        draw.polygon([(ox + x * unit, oy + y * unit) for x, y in points], fill=color)

    r(15, 4, 32, 9)      # top run
    r(15, 31, 32, 36)    # bottom run
    r(4, 15, 9, 25)      # spine
    p([(17.5 + O, 6.5 + O), (6.5 + O, 17.5 + O), (6.5 - O, 17.5 - O), (17.5 - O, 6.5 - O)])
    p([(6.5 + O, 22.5 - O), (17.5 + O, 33.5 - O), (17.5 - O, 33.5 + O), (6.5 - O, 22.5 + O)])
    p([(19.5, 15), (24.5, 20), (19.5, 25), (14.5, 20)])  # core node
    if pads:
        r(27.5, 2, 36.5, 11)
        r(27.5, 29, 36.5, 38)


def glyph_image(px, fg, bg, pads=True, inset=0.14):
    """Square icon at `px`, supersampled 4x for clean 45-degree edges."""
    ss = 4
    size = px * ss
    img = Image.new("RGBA", (size, size), bg)
    draw = ImageDraw.Draw(img)
    pad = size * inset
    unit = (size - pad * 2) / 40
    draw_glyph(draw, unit, pad, pad, fg, pads=pads)
    return img.resize((px, px), Image.LANCZOS)


def tracked(draw, xy, text, font, tracking, fill):
    """Draws text with manual letter-spacing; Inter's tight display tracking."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking
    return x


def build_og():
    W, H = 1200, 630
    img = Image.new("RGBA", (W, H), INK)
    draw = ImageDraw.Draw(img)

    # Three flat bands, hard cuts, no interpolation — the system in one image.
    band_x = 936
    for i, colour in enumerate((YELLOW, GREEN, PINK)):
        draw.rectangle([band_x, i * (H / 3), W, (i + 1) * (H / 3)], fill=colour)

    mark = glyph_image(84, YELLOW, (0, 0, 0, 0))
    img.alpha_composite(mark, (72, 64))

    name = ImageFont.truetype(SANS_BOLD, 25)
    head = ImageFont.truetype(SANS_BOLD, 82)
    body = ImageFont.truetype(SANS, 23)

    tracked(draw, (172, 82), "CONNECTION TECH SOLUTION", name, 1.6, PAPER)
    draw.text((174, 116), "Digital systems, software & AI", font=body, fill=(250, 249, 245, 150))

    tracked(draw, (72, 268), "WE BUILD THE", head, -3.4, PAPER)
    tracked(draw, (72, 358), "SYSTEMS THAT", head, -3.4, PAPER)
    tracked(draw, (72, 448), "MOVE BUSINESS.", head, -3.4, YELLOW)

    draw.rectangle([72, 566, 132, 570], fill=PAPER)
    draw.text((152, 555), "connecttechsolution.in", font=body, fill=(250, 249, 245, 165))
    return img.convert("RGB")


def build_favicon_svg():
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <rect width="40" height="40" fill="#F4D93E"/>
  <g fill="none" stroke="#17170D" stroke-width="5" stroke-linecap="square">
    <path d="M33 8.5 H18.5 L8.5 18.5 V21.5 L18.5 31.5 H33"/>
  </g>
  <polygon points="20.5,15.5 25,20 20.5,24.5 16,20" fill="#17170D"/>
</svg>
"""


if __name__ == "__main__":
    glyph_image(32, INK, YELLOW, pads=False, inset=0.16).save(os.path.join(PUBLIC, "favicon-32.png"))
    glyph_image(16, INK, YELLOW, pads=False, inset=0.12).save(os.path.join(PUBLIC, "favicon-16.png"))
    glyph_image(180, INK, YELLOW, pads=True, inset=0.18).save(os.path.join(PUBLIC, "apple-touch-icon.png"))
    glyph_image(192, YELLOW, INK, pads=True, inset=0.2).save(os.path.join(PUBLIC, "icon-192.png"))
    glyph_image(512, YELLOW, INK, pads=True, inset=0.2).save(os.path.join(PUBLIC, "icon-512.png"))
    build_og().save(os.path.join(PUBLIC, "og.png"), quality=95)
    with open(os.path.join(PUBLIC, "favicon.svg"), "w", encoding="utf-8") as fh:
        fh.write(build_favicon_svg())
    print("brand assets written to", PUBLIC)
