# Task 14: Order History

## Goal
Allow clients to view their complete order history and inspect individual order details.

## Parent Milestone
[Milestone 6: Client Dashboard](../00-main-plan.md)

## Prerequisites
- [Task 13: Client Dashboard](../06-client-area/task-13-client-dashboard.md)
- [Task 11: Order Processing](../05-checkout/task-11-order-processing.md)

## Acceptance Criteria
- [x] Client can view a paginated list of all their past orders
- [x] Order list shows order number, date, total amount, and current status
- [x] Orders are sorted by date with newest first
- [x] Client can click on an order to view its full details
- [x] Order detail page shows all items with images, names, quantities, and prices
- [x] Order detail page shows delivery information and payment method
- [x] Order statuses are displayed with clear visual indicators
- [x] Possible order statuses are: Pending, Preparing, In Delivery, Delivered
- [x] Client receives appropriate message when no orders have been placed yet
- [x] Users can only view their own orders, not orders belonging to other users

## Files to Create / Modify
- Order history page component
- Order detail page component
- Order status badge component
- Client order controller
- Routes for order history and detail

## Estimated Duration
3–4 hours

## Status
✅ Completed

