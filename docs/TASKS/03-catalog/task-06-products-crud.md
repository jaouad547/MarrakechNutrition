# Task 06: Products CRUD

## Goal
Enable full create, read, update, and delete operations for products in the admin panel.

## Parent Milestone
[Milestone 3: Product Catalog](../00-main-plan.md)

## Prerequisites
- [Task 05: Categories](../03-catalog/task-05-categories.md)

## Acceptance Criteria
- [ ] Admin can create a product with name, description, price, stock, category, image upload, and active status
- [ ] Product slug is auto-generated from the name and is unique
- [ ] Admin can edit all product fields including replacing the uploaded image
- [ ] Admin can toggle a product's active status without deleting it
- [ ] Admin can delete a product with a confirmation dialog
- [ ] Product list in admin shows name, category, price, stock, and status
- [ ] Product list supports pagination
- [ ] Product list supports searching by product name
- [ ] Image uploads are validated for file type and size
- [ ] Deleted product images are removed from storage

## Files to Create / Modify
- Product model and relationships
- Product admin controller
- Admin product list page component
- Admin product form page component
- Image upload handling
- Routes for product CRUD operations

## Estimated Duration
3–4 hours

## Status
⬜ Not Started
