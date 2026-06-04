# Task 09: Cart Persistence

## Goal
Synchronize cart data between session and database for authenticated users so their cart survives logout and cross-device sessions.

## Parent Milestone
[Milestone 4: Shopping Cart](../00-main-plan.md)

## Prerequisites
- [Task 08: Cart Session](../04-cart/task-08-cart-session.md)

## Acceptance Criteria
- [x] Guest cart items are transferred to the user's database cart upon login
- [x] Authenticated user's cart is saved to the database after each modification
- [x] Cart items are loaded from the database when an authenticated user visits the site
- [x] Merging session cart with database cart handles duplicate items by summing quantities
- [x] Merged quantities respect stock limits
- [x] User's database cart is accessible from any device after logging in
- [x] Cart data survives browser restart when user is logged in
- [x] On logout, the cart clears from session but remains in database for next login

## Files to Create / Modify
- Cart database model
- Cart synchronization logic
- Login event handler for cart merge
- Cart controller modifications for dual storage

## Estimated Duration
2–3 hours

## Status
✅ Completed
