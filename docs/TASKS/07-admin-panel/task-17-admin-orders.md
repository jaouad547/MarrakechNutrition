# Task 17: Admin Orders

## Goal
Enable administrators to view all orders, update order statuses, and manage the order lifecycle.

## Parent Milestone
[Milestone 7: Admin Panel](../00-main-plan.md)

## Prerequisites
- [Task 15: Admin Dashboard](../07-admin-panel/task-15-admin-dashboard.md)
- [Task 11: Order Processing](../05-checkout/task-11-order-processing.md)

## Acceptance Criteria
- [ ] Admin can view all orders in a list with order number, customer name, date, total, and status
- [ ] Orders are sortable by date and filterable by status
- [ ] Admin can click an order to view full details including items and delivery info
- [ ] Admin can update order status through a dropdown on the detail page
- [ ] Status transitions follow the sequence: Pending → Preparing → In Delivery → Delivered
- [ ] Admin can cancel an order, which reverts stock quantities
- [ ] Cancelled orders display a distinct visual status
- [ ] Order detail page shows customer contact information for delivery coordination
- [ ] Admin receives confirmation prompt before cancelling an order
- [ ] Success messages appear after status updates

## Files to Create / Modify
- Admin order list page component
- Admin order detail page component
- Admin order controller
- Order status update logic with stock reversion
- Routes for admin order management

## Estimated Duration
3–4 hours

## Status
⬜ Not Started
