# Rules — MarrakechNutrition AI Agent

## 1. Project Overview

MarrakechNutrition is a French-language e-commerce site for nutrition products, targeting Moroccan customers in Marrakech. Stack: Laravel 11 + Inertia.js + React + MySQL + Tailwind CSS. Payment is cash on delivery only (simulated, no real gateway).

## 2. Documentation Files Location

All project documentation lives in `docs/`. Read these files before starting any task:

| File | Purpose |
|------|---------|
| `docs/PRD.md` | Product Requirements Document — full feature list |
| `docs/localization-specs.md` | French language + Moroccan Dirham (MAD) rules |
| `docs/ai-agent-instructions.md` | How task files are structured and numbered |
| `docs/commands.md` | Common Laravel/Artisan commands for this project |
| `docs/DESIGN/DESIGN.md` | Design philosophy and global design tokens |
| `docs/DESIGN/*.html` | Reference HTML mockups for each page |
| `docs/TASKS/XX-name/task-NN-*.md` | Individual task files with acceptance criteria |

## 3. Workflow Rules

### Before Starting a Task
1. Read `docs/PRD.md` to understand the feature context
2. Read `docs/localization-specs.md` to apply French/MAD rules
3. Read the specific `docs/TASKS/XX-name/task-NN-*.md` file for acceptance criteria
4. Check `docs/DESIGN/*.html` for the relevant page mockup

### While Working
- Write code in the main project root (not in `docs/`)
- Follow the design tokens from `docs/DESIGN/DESIGN.md`
- All UI text must be in French
- All prices in MAD with format: `1 250,00 DH`
- No code snippets in task files — task files are planning docs only

### After Completing a Task
- Mark acceptance criteria as checked in the task file
- Update `docs/00-main-plan.md` status if it exists
- Commit with descriptive message referencing the task number

## 4. Localization Rules (Always Apply)

| Rule | Detail |
|------|--------|
| Language | French only. No i18n, no language selector |
| Currency | Moroccan Dirham (MAD/DH) only. No conversion, no selector |
| Price format | `1 250,00 DH` — space for thousands, comma for decimals |
| Phone | Moroccan format: 06/07/05 XX XX XX |
| Dates | DD/MM/YYYY |
| Address | Quartier, Ville, Code postal (optional) |
| Payment | "Payer à la livraison" — always, no other option |

## 5. Design Rules (Always Apply)

- Use Tailwind CSS utility classes
- Follow the color palette from `docs/DESIGN/DESIGN.md`
- Mobile-first responsive design
- Components must match the HTML mockups in `docs/DESIGN/`

### Product Display Rules

- Product listings: grid layout with 1 column on mobile, 2 on tablet, 3 on desktop (mobile-first).
- Product card: display image (square crop), product name, category link, price (MAD), and stock badge.
- Image: use consistent aspect ratio (1:1), lazy-load images, and provide `alt` text in French.
- Price: always formatted as `1 250,00 DH` and displayed near the product name.
- Stock badge: show `En stock` (green) when stock > 0, otherwise `Rupture de stock` (red).
- Product detail: large hero image, name, full description, price, stock status, and `Ajouter au panier` button.
- Related products: show 4 related items from same category on product detail pages.
- Filtering & search: keep UI controls compact (sidebar on desktop, dropdown on mobile).
- Accessibility: buttons and links must have discernible labels and keyboard focus states.

## 6. Code Quality Rules

- Laravel conventions: PascalCase controllers/models, camelCase methods, snake_case tables
- React components: PascalCase, functional components with hooks
- Validation: always server-side + client-side
- Auth: use Laravel Breeze/Inertia defaults, extend for roles
- Images: store in `storage/app/public`, symlink via `php artisan storage:link`
- No hardcoded text — use Laravel localization files (`lang/fr/`) for reusability

## 7. Task File Structure

Each task file in `docs/TASKS/` contains:
- Goal
- Parent Milestone
- Prerequisites (links to other tasks)
- Acceptance Criteria (checkable `- [ ]` items)
- Files to Create/Modify
- Estimated Duration
- Status

Task files contain **no code** and **no implementation details** — only behavior descriptions.

## 8. Common Commands

See `docs/commands.md` for:
- Laravel Artisan commands
- Database migrations and seeders
- Inertia/React development commands
- Git workflow commands

## 9. Priority Order

1. Setup and database (tasks 01–02)
2. Authentication (tasks 03–04)
3. Catalog (tasks 05–07)
4. Cart (tasks 08–09)
5. Checkout (tasks 10–12)
6. Client area (tasks 13–14)
7. Admin panel (tasks 15–17)
8. Polish (tasks 18–20)

Do not skip prerequisites. A task is "done" when all acceptance criteria are checked.
