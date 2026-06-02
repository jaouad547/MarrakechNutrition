# Task 05: Categories

## Goal
Build category management so products can be grouped and browsed by category.

## Parent Milestone
[Milestone 3: Product Catalog](../00-main-plan.md)

## Prerequisites
- [Task 02: Database Design](../01-setup/task-02-database-design.md)

## Acceptance Criteria
- [x] Admin can create a new category with name, slug, and description
- [x] Admin can edit an existing category's name and description
- [x] Admin can delete a category that has no associated products
- [x] Category list in admin shows all categories with product counts
- [x] Category slug is auto-generated from the name and is unique
- [x] Frontend navigation displays the list of active categories
- [x] Clicking a category navigates to the product listing filtered by that category

## Files to Create / Modify
- Category model and relationships
- Category admin controller
- Admin category list page component
- Admin category form page component
- Navigation component to show category links
- Routes for category management

## Estimated Duration
2–3 hours

## Status
✅ Completed
