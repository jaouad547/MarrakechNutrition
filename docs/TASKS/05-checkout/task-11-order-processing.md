# Task 11: Order Processing

## Goal
Handle order submission, stock deduction, order number generation, and status tracking.

## Parent Milestone
[Milestone 5: Order & Checkout](../00-main-plan.md)

## Prerequisites
- [Task 10: Delivery Form](../05-checkout/task-10-delivery-form.md)

## Acceptance Criteria
- [x] Submitting the checkout form creates an order record with a unique order number
- [x] Order number is human-readable (for example: ORD-20240603-001)
- [x] Order item records are created for each cart item with quantity and price at time of order
- [x] Product stock is reduced by the ordered quantity upon successful order creation
- [x] Order status is set to "Pending payment on delivery" upon creation
- [x] If stock is insufficient during checkout, an error is shown and the order is not created
- [x] Cart is cleared after successful order creation
- [x] Guest orders are supported and linked to the provided delivery info
- [x] Authenticated user orders are linked to their user account
- [x] Failed orders do not modify stock levels

## Files to Create / Modify
- Order controller
- Order model
- Order item model
- Stock management logic
- Cart clearing logic

## Estimated Duration
3–4 hours

## Status
✅ Completed
