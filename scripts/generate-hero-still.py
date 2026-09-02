#!/usr/bin/env python3
"""Generates public/hero-still.jpg — the hero's base plate and video poster.

Same geometry language as the logomark: orthogonal traces, 45-degree chamfers,
square contact pads. Deliberately dark and low-contrast so paper-white display
type clears WCAG AA over it without a scrim doing all the work.
"""
import math, random
from PIL import Image, ImageDraw, ImageFilter

W, H = 1920, 1080
SS = 2  # supersample
BG = (11, 11, 12)
random.seed(20260902)


def chamfered(draw, pts, colour, width):
    """Draw an orthogonal polyline whose corners are cut at 45 degrees."""
    out = []
    for i, p in enumerate(pts):
        if i == 0 or i == len(pts) - 1:
            out.append(p)
            continue
        a, b, c = pts[i - 1], p, pts[i + 1]
        cut = 26 * SS
        for src, dst in ((a, b), (c, b)):
            dx, dy = dst[0] - src[0], dst[1] - src[1]
            length = math.hypot(dx, dy) or 1
            k = min(cut, length / 2)
            out.append((dst[0] - dx / length * k, dst[1] - dy / length * k))
    draw.line(out, fill=colour, width=width, joint='curve')


def trace_layer(size, count, greys, widths, pad_chance=0.7):
    layer = Image.new('RGB', size, BG)
    d = ImageDraw.Draw(layer)
    cols = 24
    step = size[0] / cols
    for _ in range(count):
        x = round(random.randrange(cols) * step)
        y = random.randrange(0, size[1])
        pts = [(x, y)]
        horizontal = random.random() < 0.5
        for _ in range(random.randint(2, 4)):
            last = pts[-1]
            run = random.choice([2, 3, 4, 6, 8]) * step
            if horizontal:
                pts.append((last[0] + run * random.choice([1, -1]), last[1]))
            else:
                pts.append((last[0], last[1] + run * random.choice([1, -1])))
            horizontal = not horizontal
        colour = random.choice(greys)
        chamfered(d, pts, colour, random.choice(widths))
        if random.random() < pad_chance:
            px, py = pts[-1]
            s = 7 * SS
            d.rectangle([px - s, py - s, px + s, py + s], fill=colour)
    return layer


base = Image.new('RGB', (W * SS, H * SS), BG)
draw = ImageDraw.Draw(base)

# Column rules — the same 12-column logic the layout uses, doubled.
for i in range(1, 24):
    x = round(i * (W * SS) / 24)
    draw.line([(x, 0), (x, H * SS)], fill=(18, 18, 20), width=1 * SS)

far = trace_layer((W * SS, H * SS), 26, [(22, 24, 28), (26, 29, 34)], [2 * SS, 3 * SS])
far = far.filter(ImageFilter.GaussianBlur(4 * SS))
base = Image.blend(base, far, 0.9)

near = trace_layer((W * SS, H * SS), 14, [(38, 42, 48), (46, 50, 58)], [3 * SS, 4 * SS], 0.85)
base = Image.blend(base, near, 0.55)

glow = base.filter(ImageFilter.GaussianBlur(26 * SS))
base = Image.blend(base, glow, 0.3)

img = base.resize((W, H), Image.LANCZOS)

# Vignette: light pooled left of centre, edges pulled down so type stays legible.
mask = Image.new('L', (W, H), 0)
md = ImageDraw.Draw(mask)
cx, cy, r = W * 0.34, H * 0.46, W * 0.62
for i in range(60):
    t = i / 60
    md.ellipse(
        [cx - r * (1 - t), cy - r * (1 - t) * 0.72, cx + r * (1 - t), cy + r * (1 - t) * 0.72],
        fill=int(6 + 34 * t),
    )
mask = mask.filter(ImageFilter.GaussianBlur(90))
light = Image.new('RGB', (W, H), (30, 34, 40))
img = Image.composite(Image.blend(img, light, 0.5), img, mask)

dark = Image.new('RGB', (W, H), BG)
edge = Image.new('L', (W, H), 0)
ed = ImageDraw.Draw(edge)
ed.rectangle([0, 0, W, H], fill=190)
ed.ellipse([-W * 0.25, -H * 0.4, W * 1.25, H * 1.4], fill=0)
edge = edge.filter(ImageFilter.GaussianBlur(160))
img = Image.composite(dark, img, edge)

grain = Image.effect_noise((W, H), 14).convert('L').point(lambda v: 128 + (v - 128) * 0.5)
img = Image.blend(img, Image.merge('RGB', (grain, grain, grain)), 0.045)

img.save('public/hero-still.jpg', quality=82, optimize=True, progressive=True)
print('public/hero-still.jpg', img.size)
