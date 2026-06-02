# Task 02: Database Design

## Goal
Create all database tables, migrations, and seeders needed for users, categories, products, orders, and cart persistence.

## Parent Milestone
[Milestone 1: Project Foundation](../00-main-plan.md)

## Prerequisites
- [Task 01: Project Setup](../01-setup/task-01-project-setup.md)

## Acceptance Criteria
- [ ] Users table stores name, email, phone, address, password, and role
- [ ] Categories table stores name, slug, description, and supports soft visual hierarchy
- [ ] Products table stores name, slug, description, price, stock, image path, active flag, and category link
- [ ] Orders table stores user link, order number, total amount, delivery address, phone, status, and payment method
- [ ] Order items table stores order link, product link, quantity, and unit price
- [ ] Cart tables support storing items for authenticated users
- [ ] Running migrations creates all tables without errors
- [ ] Seeder populates at least 5 categories and 20 products with realistic sample data
- [ ] Seeder creates one admin user and one test client user
- [ ] All slugs are unique and URL-safe

## Files to Create / Modify
- Migration files for all tables
- Database seeder classes
- Model factories for users, categories, and products
- Model files with relationships defined

## Estimated Duration
3–4 hours

## Status
✅ Done
