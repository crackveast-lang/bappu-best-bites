# Bappu Best Bites — Namkeen

Static marketing + storefront page for **Bappu Best Bites Namkeen**
(M/S Sunnulal Amit Kumar & Sons, Phalka Bazar, Lashkar, Gwalior — est. 1990).

Selling happens on Amazon: there is no cart on this site. Every product CTA is a
direct link out to the Amazon listing.

## Run it

No build step. Open `index.html`, or serve the folder:

    npx http-server -p 8080

## Structure

    index.html              single page, all sections
    assets/css/style.css    design tokens + all styles
    assets/js/main.js       product data, Amazon links, hero rotator, preloader
    assets/img/             hero + editorial photography
    assets/img/cutouts/     transparent pack cut-outs (`-lg` hero, `-sm` cards)
    assets/img/products/    per-product card images (`-pack` / `-alt` = hover image)
    assets/img/shop/        candid shop photography for "Behind the counter"

## ▲ Two things to do before launch

**1. Replace the logo.** `assets/img/logo.png` is a stand-in that was cut out of a
product photograph and colour-corrected, because no logo file existed in the
source folders. It is close but not exact — the gold keyline is slightly uneven
and the left edge has a small artefact, which shows at preloader size. Drop your
real logo in at the same path (transparent PNG, roughly 640×320, mark centred)
and everything picks it up. No code change needed.

**2. Add the Amazon links.** Open `assets/js/main.js` and paste each product's
Amazon URL into its `amazon` field:

    { id: 'ratlami-sev', ..., amazon: 'https://www.amazon.in/dp/XXXXXXXXXX' }

Anything still `null` falls back to `AMAZON_STORE` (a brand search on amazon.in)
so no button is ever dead. `AMAZON_STORE` is at the top of the same file — point
it at your Amazon Brand Store page once you have one.

## The hero

The hero rotates through the five namkeen that have transparent cut-outs. Each
carries a `headline` array (three lines; `<em>` marks the red one) plus `cutLg`
and `cutSm` image paths in the `PRODUCTS` array. Adding a sixth is just a matter
of adding those fields — the rotator, the dots and the bestsellers strip all read
from the same list.

It advances every 6.5 s, pauses while the pointer is over the pack, and holds
still entirely under `prefers-reduced-motion`.

**About the cut-outs:** they were generated from the five packshots that happen
to have been photographed on white. The other three products (Ujjaini, Waffer,
Lahsun) only exist on warm backgrounds, so they are not in the rotator. Shoot
those three on white and the same treatment brings them in.

The preloader tracks the real decode of the hero images, with a 3.5 s hard
ceiling so a slow connection can never trap anyone on it.

## Editing products

All eight products live in the `PRODUCTS` array at the top of `assets/js/main.js`
— name, price, weight, heat level (1–4), category tags, copy, Amazon URL and
image paths. The grid, the filter chips, the hero and the CTAs all read from it.

Categories used by the filter chips: `sev`, `mixture`, `hot`.

## The founder section needs your sign-off

The copy in "The family behind it" is written around the facts we could verify
(below), but the anecdote, the pull quote and the "second generation" line are
**placeholders**. Have the family confirm or rewrite them — there is an HTML
comment marking the block. If a photograph of the founder exists, swap it in for
the shop interior currently in the arch.

The signature is the real one, lifted from the FSSAI declaration form in
`Amazon Docs/`.

## Details taken from packaging and documents

- M/S Sunnulal Amit Kumar and Sons
- ISO 22000:2018 certified company
- Phalka Bazar, Lashkar, Gwalior – 474 003 (M.P.)
- Customer care: 94253 07800, 94254 79767
- E-mail: cacamitnamkeen@gmail.com
- FSSAI Lic. No. 11419570000405
- Net weight 400 g, MRP ₹120 (incl. of all taxes)
- "SINCE 1990" from the S.L.A.K. sunrise emblem in the logo
- Proprietor: Amit Gupta (named on the FSSAI food declaration)

Note: other packs in the source photos carry different FSSAI numbers
(…0105, …0106) and one lists `cantamkmp@rediffmail.com`. The site uses the set
above — confirm which is current before publishing.

## Also still to wire up

- The newsletter form validates but posts nowhere — point it at your provider.
- `Privacy` and `Terms` in the footer are placeholder links.

## Brand palette

Sampled from the logo, defined at the top of `style.css`:

    --red       #D61E26   badge red, primary CTAs and accents
    --red-dk    #A3151B   hover / depth
    --red-deep  #7A1116   the bestsellers panel
    --yellow    #FCD116   logo keyline, accents on dark
    --gold      #C9971B   hairlines and icons on cream
    --espresso  #241512   dark sections, Amazon buttons

## preview-artifact.html

A **build output**, not a source file: the whole site inlined into one
self-contained page (fonts, images and all) for the hosted preview link. Edit
the real files, then regenerate it — never edit it directly.
