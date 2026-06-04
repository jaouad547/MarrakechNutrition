# Task 08: Cart Session

## Goal
Implement guest cart functionality that stores items in session and supports add, update, remove, and view operations.

## Parent Milestone
[Milestone 4: Shopping Cart](../00-main-plan.md)

## Prerequisites
- [Task 07: Product Display](../03-catalog/task-07-product-display.md)

## Acceptance Criteria
- [x] Visitor can add a product to cart from the product detail page with a selected quantity
- [x] Adding to cart validates that requested quantity does not exceed available stock
- [x] Cart icon in navigation displays the current number of items
- [x] Cart page shows a table of items with product image, name, unit price, quantity, and line total
- [x] Visitor can increase or decrease quantity directly from the cart page
- [x] Quantity updates are reflected immediately with recalculated totals
- [x] Visitor can remove an item from the cart with a single action
- [x] Cart displays subtotal, total, and item count
- [x] Cart persists when navigating between pages during the same session
- [x] Attempting to add an inactive or out-of-stock product shows an appropriate message

## Files to Create / Modify
- Cart controller for session-based operations
- Cart page component
- Cart item component
- Add-to-cart component on product detail page
- Navigation cart icon with item count
- Session-based cart storage logic

## Estimated Duration
3–4 hours

## Status
✅ Completed
