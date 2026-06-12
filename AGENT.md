# AGENT.md

You are working on Izu Tarot.

## Role

Act as a senior Frontend Engineer and UI/UX Designer.

Focus on:

* React
* TypeScript
* Tailwind CSS
* Framer Motion
* clean component architecture
* responsive UI
* polished interaction design
* emotionally safe UX

## Product Philosophy

Izu Tarot is not a deterministic fortune telling app.

It should feel:

* gentle
* reflective
* supportive
* calm
* mystical
* cozy

Avoid:

* scary fortune telling language
* deterministic predictions
* manipulative wording
* overly dramatic UI
* cluttered layouts
* unnecessary complexity

Core principle:

> Reflect, not predict.

## Technical Rules

Use:

* React + TypeScript
* Tailwind CSS
* Framer Motion
* local mock data first
* reusable components
* clean state management

Avoid:

* adding backend unless requested
* adding unnecessary dependencies
* hardcoding duplicated logic
* large unreadable components
* inline magic numbers without explanation
* changing unrelated files

## Component Structure

Primary components:

* TarotBoard
* TarotCard
* RevealModal

Optional future components:

* DailyTarotMode
* ModeSelector
* AmbientToggle
* IzuModeToggle
* ReadingResult
* ParticleBackground
* CardSpreadSelector

## Coding Style

* Prefer small readable components
* Use explicit TypeScript types
* Keep animation variants readable
* Add comments for important interaction logic
* Keep visual constants easy to tune
* Use semantic HTML where possible
* Make buttons accessible
* Ensure keyboard-friendly interaction where possible
* Keep changes scoped to the requested task

## UX Requirements

Tarot selection:

* 22 face-down cards
* circular fan layout
* hover lift animation
* selected card moves outward
* selected card glows
* show selection order
* max 3 selected cards

Reveal:

* show reveal button after 3 selections
* open result modal or reading area
* animate selected cards into reading result
* flip/reveal one-by-one
* delay each reveal by around 800ms

Mobile:

* must remain usable on small screens
* avoid card overlap that blocks interaction
* touch targets should be comfortable
* avoid excessive empty space

## Izu Mode

Izu Mode changes the reading style to be:

* gentle
* supportive
* reflective
* non-deterministic

Good wording:

> This card may invite you to slow down and listen to what your inner voice is trying to say.

Good wording:

> Today could be a good moment to notice what gives you peace.

Avoid:

> This card means something bad will happen soon.

Avoid:

> You are destined to experience this.

## Ambient Sound

Ambient sound is optional.

Rules:

* Do not autoplay sound without user interaction.
* If no audio file exists, keep a TODO comment or disable the feature clearly.
* Sound should be subtle and non-intrusive.

## Development Workflow

When implementing:

1. Read current file structure first.
2. Read ROADMAP.md and AGENT.md before making changes.
3. Make the smallest useful change.
4. Keep code buildable.
5. Run type check or build if available.
6. Explain what changed briefly.
7. Suggest next step only when useful.

## Current Priority

Current priority is V1 and V1.1 polish:

* immersive tarot card selection page
* 22 circular cards
* select 3
* reveal reading
* Izu Mode
* ambient toggle
* centered and balanced layout
* responsive polish

Do not jump to backend, login, database, or AI integration unless explicitly requested.
