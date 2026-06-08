# Task 17: Admin Orders

## Goal
Enable administrators to view all orders, update order statuses, and manage the order lifecycle.

## Parent Milestone
[Milestone 7: Admin Panel](../00-main-plan.md)

## Prerequisites
- [Task 15: Admin Dashboard](../07-admin-panel/task-15-admin-dashboard.md)
- [Task 11: Order Processing](../05-checkout/task-11-order-processing.md)

## Acceptance Criteria
- [x] Admin can view all orders in a list with order number, customer name, date, total, and status
- [x] Orders are sortable by date and filterable by status
- [x] Admin can click an order to view full details including items and delivery info
- [x] Admin can update order status through a dropdown on the detail page
- [x] Status transitions follow the sequence: Pending → Preparing → In Delivery → Delivered
- [x] Admin can cancel an order, which reverts stock quantities
- [x] Cancelled orders display a distinct visual status
- [x] Order detail page shows customer contact information for delivery coordination
- [x] Admin receives confirmation prompt before cancelling an order
- [x] Success messages appear after status updates

## Files to Create / Modify
- Admin order list page component
- Admin order detail page component
- Admin order controller
- Order status update logic with stock reversion
- Routes for admin order management

## Estimated Duration
3–4 hours

## Status
✅ Done
