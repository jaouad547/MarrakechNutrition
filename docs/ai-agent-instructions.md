# AI Agent Instructions — MarrakechNutrition Project

## Objective
Create a main roadmap and task files for the MarrakechNutrition e-commerce project following the structure and conventions defined below.

## Context
- Project name: **MarrakechNutrition**
- Stack: Laravel 11 + Inertia.js + React + MySQL + Tailwind CSS
- Payment: Cash on delivery as main and online payment (online payment should only appear to function)
- Design files already exist in `/DESIGN/` folder (do not recreate)

## Output Structure

Create the following files in a `docs/` folder at the project root:

```
docs/
├── 00-main-plan.md
├── 01-setup/
│   ├── task-01-project-setup.md
│   └── task-02-database-design.md
├── 02-authentication/
│   ├── task-03-auth-system.md
│   └── task-04-user-profiles.md
├── 03-catalog/
│   ├── task-05-categories.md
│   ├── task-06-products-crud.md
│   └── task-07-product-display.md
├── 04-cart/
│   ├── task-08-cart-session.md
│   └── task-09-cart-persistence.md
├── 05-checkout/
│   ├── task-10-delivery-form.md
│   ├── task-11-order-processing.md
│   └── task-12-order-confirmation.md
├── 06-client-area/
│   ├── task-13-client-dashboard.md
│   └── task-14-order-history.md
├── 07-admin-panel/
│   ├── task-15-admin-dashboard.md
│   ├── task-16-admin-products.md
│   └── task-17-admin-orders.md
└── 08-polish/
    ├── task-18-responsive-design.md
    ├── task-19-seo-meta.md
    └── task-20-testing-deployment.md
```

---

## File Conventions

### 1. Main Plan (`00-main-plan.md`)

Must include:
- Project name and stack summary
- Milestone table with: number, name, linked task files, status column (all ⬜)
- Quick links section referencing `/DESIGN/` folder
- Note that design and design philosophy are already provided externally

### 2. Task Files (`task-NN-descriptive-name.md`)

Each task file must use exactly these sections in this order:

#### Required Sections

| Section | Content |
|---------|---------|
| **Goal** | One-sentence description of what this task achieves |
| **Parent Milestone** | Link back to `00-main-plan.md` with milestone number and name |
| **Prerequisites** | List of task files that must be completed before this one (use task numbers and links). Write "None" if no dependencies |
| **Acceptance Criteria** | Numbered list of checkable items using `- [ ]` markdown syntax. Each item must be verifiable without writing code. No code snippets |
| **Files to Create / Modify** | Bullet list of expected file paths. Use `???` for filenames not yet determined |
| **Estimated Duration** | Time estimate in hours (e.g., "2–3 hours") |
| **Status** | Exactly: `⬜ Not Started` |

#### Rules for Task Files
- **No code snippets** in any section
- **No implementation details** (no function names, no package names, no SQL)
- **No "Technical Notes" section**
- Acceptance criteria must describe **behavior** or **outcome**, not implementation
- Use plain language; assume reader knows the stack
- Keep each task completable in **2–6 hours**

---

## Example Task File Format

```markdown
# Task 03: Authentication System

## Goal
Enable users to register, log in, and log out securely.

## Parent Milestone
[Milestone 2: Authentication](../00-main-plan.md)

## Prerequisites
- [Task 01: Project Setup](../01-setup/task-01-project-setup.md)
- [Task 02: Database Design](../01-setup/task-02-database-design.md)

## Acceptance Criteria
- [ ] Visitor can access a registration page with name, email, phone, address, and password fields
- [ ] Registration validates all fields and shows errors for invalid input
- [ ] Visitor can access a login page with email and password fields
- [ ] Login validates credentials and redirects authenticated users to the home page
- [ ] Authenticated users see a logout option in the navigation
- [ ] Logout clears the session and redirects to the home page
- [ ] Password reset flow can be initiated from the login page (email sent or simulated)
- [ ] Auth state persists across page navigation
- [ ] Middleware restricts client-area and admin routes to authenticated users
- [ ] Admin routes are additionally restricted to users with admin role

## Files to Create / Modify
- Routes file for auth and protected routes
- Auth controller(s)
- Registration page component
- Login page component
- Navigation component to show auth-dependent links
- Middleware for role-based access

## Estimated Duration
4–5 hours

## Status
⬜ Not Started
```

---

## Milestones and Tasks to Generate

| Milestone | Tasks |
|-----------|-------|
| 1. Project Foundation | 01 Project Setup, 02 Database Design |
| 2. Authentication | 03 Auth System, 04 User Profiles |
| 3. Product Catalog | 05 Categories, 06 Products CRUD, 07 Product Display |
| 4. Shopping Cart | 08 Cart Session, 09 Cart Persistence |
| 5. Order & Checkout | 10 Delivery Form, 11 Order Processing, 12 Order Confirmation |
| 6. Client Dashboard | 13 Client Dashboard, 14 Order History |
| 7. Admin Panel | 15 Admin Dashboard, 16 Admin Products, 17 Admin Orders |
| 8. Polish & Deploy | 18 Responsive Design, 19 SEO & Meta, 20 Testing & Deployment |

---

## Important Notes

1. **Do not write any code.** Only create planning documents.
2. **Do not create design files.** The `/DESIGN/` folder already contains the design and design philosophy.
3. Reference the `/DESIGN/` folder in the main plan's Quick Links section.
4. All acceptance criteria must be **behavioral** and **verifiable by a human tester** without reading code.
5. Use consistent numbering: `task-01` through `task-20`.
6. Use lowercase with hyphens for folder and file names.
