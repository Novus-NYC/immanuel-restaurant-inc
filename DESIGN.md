# Immanuel Restaurant: design notes

## Brief

- **Subject:** Immanuel Restaurant INC, 799 Stanley Ave, Brooklyn (East New York). Chef and owner
  Yonayka Bryant Green, born in Colón, Panama. Opened June 2018. Panamanian frituras, soul food,
  American and Spanish breakfast, lunch specials, family combos.
- **Audience:** neighbors ordering breakfast or lunch, Panamanians in New York looking for food
  from home, people who drive in for soul food, delivery customers comparing apps.
- **Job:** get people to order (first-party DoorDash Storefront), call, or walk in. Make the menu
  easy to read on a phone. Tell the chef's story with dignity.
- **Client notes:** "a more professional and yummy feel." Then, after the first version: drop the
  scroll-driven scene entirely; make it polished, sleek and yummy, and be creative.
- **Constraints:** the research file holds no images. The restaurant's own photos were pulled
  from their DoorDash store page (provenance in `raw messy data/media/SOURCES.md`). The hero uses
  their corn empanada photo; the rest of the site keeps hand-drawn SVG illustrations of real dishes.
- **Client note 3:** replace the hero illustration with a real picture, animation welcome.

## Concept card (v2)

```
Idea:        Set the table. The site is a flat lay of their real plates, drawn from above.
Metaphor:    A food-magazine flat lay: gold-rimmed plates on a dark aubergine table.
Signature:   "What are you hungry for?": four plates (Panamanian breakfast, soul food, the
             breakfast counter, drinks). Pick one and the plate turns onto the table, the food
             is set down piece by piece, and the dishes and prices rise in beside it.
Emotion:     Hungry and taken care of. Abundant plates, warm gold, nothing fussy.
Motion verb: Set down (pieces drop a few pixels into place and settle, like a plate served).
Screenshot:  The hero: their real corn empanada and tortilla photo served as a round plate,
             their logo line turning around it in gold, next to "A heavenly taste".
```

Why not the scroll scene: the client judged it mid, and a centerpiece that is only mid makes the
whole site feel worse. Flat illustration plays to strengths that are hard to get wrong: crisp
shapes, rich color, and generous plates (reviewers keep praising portion size).

## Illustration system (`src/components/food`)

- Top-down view, one light from the upper left. Fried pieces use a radial gradient (pale gold to
  deep brown), a gloss line, blisters and specks. Every piece casts the same soft shadow in world
  space, whatever its rotation.
- Pieces: empanada (scalloped crimped edge), carimañola, arina, corn tortilla, fried egg, bacon,
  sausage, pancakes, home fries, toast, drumstick, collard greens, mac and cheese, candied yams,
  chorizo, sweet plantains, coffee, four drinks (sorrel, chicheme, passion fruit, panela), plate,
  napkin (gold and plum stripe, after the awning), fork, crumbs, steam.
- Plates are full on purpose: abundance reads as appetite.

## Art direction

| Role | Hex | Use |
|---|---|---|
| ground | `#170B1C` | aubergine table, dark sections |
| plum | `#2B1533` | raised dark surfaces |
| ink | `#F7EBD5` | text on dark |
| muted | `#CDBBD8` | secondary text on dark (AA on ground) |
| gold | `#EBB14A` | action, the ticker band, fritura gold |
| cream | `#F5EAD3` | the menu card and the plates |
| ink-dark | `#1E1024` | text on cream and gold |
| gold-deep | `#8A560F` | small accents on cream (AA) |
| lavender | `#C8B3E6` | awning capitals in the footer only |

**Type:** Gloock (display) + Switzer (text and UI). Tabular figures for prices and hours.

**Shape:** controls are stadiums; containers are square; food is round.

**Motion (polished, never scroll-driven):**
- Hero photo: the plate opens from the centre while the photo settles from a slight zoom; the
  ring of their logo line ("Where you experience a heavenly taste") turns once every 80 s; the
  photo drifts slowly (Ken Burns) under a soft gold halo and leans away from the pointer; a
  "Fried to order" sticker spins in and tips on hover. Static under reduced motion.
- Ticker: their dishes run past on a gold band, set like the awning strip. Pauses on hover.
- Hungry tabs: the plate turns in, pieces set down, dishes rise in. Arrow keys work.
- Reveals: blocks rise and settle as they enter. Page transitions: a plum panel rises with a domed
  edge and lifts off.
- Reduced motion: no entrance animation, no ticker movement, no parallax, static steam.
- Inner pages are quiet at rest; their life is in hovers, reveals and the transition.

## Pages

- `/` hero table, dish ticker, what are you hungry for, the chef in three numbers, what people
  come back for, recognition, visit strip, awning footer.
- `/menu` the full menu as a printed card on cream, with an illustrated icon per section.
- `/story` the chef's path, the logo line, recognition.
- `/visit` hours (today highlighted), address, phone, ordering channels, access.
- 404: an empty plate with crumbs. "Someone got to this one first."

## Genericness test

- A generic restaurant site puts a stock photo behind centered white text. Here the hero is a
  drawn flat lay of their own signature dishes, with the headline on the left grid line.
- A generic site lists "Breakfast, Lunch, Dinner" in three equal cards. Here one plate at a time
  turns onto the table, with real dishes and real prices.
- A generic footer is a link list. Here the footer is their awning.
