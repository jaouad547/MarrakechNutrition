# Task 20: Testing & Deployment

## Goal
Verify all features work correctly through manual testing and prepare the application for production deployment.

## Parent Milestone
[Milestone 8: Polish & Deploy](../00-main-plan.md)

## Prerequisites
- All previous tasks

## Acceptance Criteria
- [x] All navigation links work correctly across the site
- [x] User registration, login, and logout function without errors
- [x] Products can be added to cart with correct quantity and price
- [x] Cart quantities can be updated and items can be removed
- [x] Complete checkout flow works from cart to order confirmation
- [x] Order numbers are generated uniquely for each order
- [x] Stock decreases correctly after order placement
- [x] Admin can create, edit, and delete products
- [x] Admin can update order statuses and cancel orders
- [x] Client dashboard shows correct order history
- [x] Role-based access prevents non-admin users from accessing admin routes
- [x] Application runs without errors in production environment
- [x] Environment is configured for production (debug off, app URL set)

## Files Created / Modified
- `routes/web.php` — Fixed `POST /cart/{product}` route (was missing `{product}` param)
- `database/factories/OrderFactory.php` — Completed factory definition
- `tests/Feature/AuthTest.php` — Registration, login, logout feature tests
- `tests/Feature/CartTest.php` — Add, update, remove cart item tests
- `tests/Feature/CheckoutTest.php` — Full checkout flow, stock decrement, order number format
- `tests/Feature/AdminProductTest.php` — Admin CRUD + toggle/stock + role guards
- `tests/Feature/AdminOrderTest.php` — Status advancement, cancellation with stock reversion
- `.env.example` — Updated with production-ready annotations and MySQL config
- `docs/DEPLOYMENT.md` — Step-by-step deployment checklist (Nginx, SSL, optimizations)

## Estimated Duration
3–4 hours

## Status
✅ Done
