# Design System Automation — Claude Instructions

## Project Overview
This project automates the generation and management of design tokens, themes, and components from a design system source (e.g., Figma).

## Key Commands
- `npm run build:tokens` — Transform raw tokens into CSS/SCSS/TS outputs
- `npm run generate:component` — Scaffold a new component token file

## Directory Structure
- `tokens/base/` — Primitive values (colors, spacing)
- `tokens/semantic/` — Theme-aware tokens (light/dark)
- `tokens/components/` — Component-specific tokens
- `scripts/` — Build and generation scripts
- `build/` — Output artifacts (do not edit manually)
- `docs/` — Design system documentation

## Conventions
- Token files use JSON format
- All color values are in HEX or rgba()
- Spacing values use px units
