# Task 03: Authentication System

## Goal
Enable visitors to register, log in, log out, and reset their password through a complete authentication flow.

## Parent Milestone
[Milestone 2: Authentication](../00-main-plan.md)

## Prerequisites
- [Task 01: Project Setup](../01-setup/task-01-project-setup.md)
- [Task 02: Database Design](../01-setup/task-02-database-design.md)

## Acceptance Criteria
- [ ] Visitor can access a registration page with name, email, phone, address, and password fields
- [ ] Registration validates all fields and displays error messages for invalid input
- [ ] Visitor can access a login page with email and password fields
- [ ] Login validates credentials and redirects authenticated users to the home page
- [ ] Authenticated users see a logout option in the main navigation
- [ ] Logout clears the session and redirects to the home page
- [ ] Password reset can be initiated from the login page (email simulated or logged)
- [ ] Authentication state persists across page navigation via Inertia shared data
- [ ] Middleware blocks unauthenticated users from accessing client-area routes
- [ ] Middleware blocks non-admin users from accessing admin routes

## Files to Create / Modify
- Routes file for authentication
- Auth controller(s)
- Registration page component
- Login page component
- Navigation component to reflect authentication state
- Middleware for role-based access control

## Estimated Duration
4–5 hours

## Status
⬜ Not Started
