Voici le **cahier des charges** complet pour ton projet **MarrakechNutrition** avec la stack Laravel + Inertia + React + MySQL + Tailwind, et un système de paiement simulé avec option **"Payer à la livraison"**.

---

# 📋 CAHIER DES CHARGES — MARRAKECHNUTRITION

## 1. Présentation du Projet

| Élément | Description |
|---------|-------------|
| **Nom** | MarrakechNutrition |
| **Type** | Site e-commerce de produits nutritionnels |
| **Cible** | Résidents de Marrakech et environs |
| **Objectif** | Vente en ligne de compléments alimentaires, protéines, vitamines et produits bio |
| **Paiement** | À la livraison (simulation, pas de transaction réelle) |

---

## 2. Stack Technique

| Couche | Technologie |
|--------|-------------|
| Backend | Laravel 11 (PHP 8.3+) |
| Frontend | React 18 via Inertia.js |
| Base de données | MySQL 8.0 |
| Styling | Tailwind CSS 3.4 |
| Icons | Lucide React |
| Images | Stock photos (Unsplash/Pexels) |
| Déploiement | VPS local ou Heroku/Railway |

---

## 3. Publics Cibles

| Rôle | Description |
|------|-------------|
| **Visiteur** | Peut naviguer, voir les produits, créer un compte |
| **Client** | Peut commander, consulter ses commandes, gérer son profil |
| **Administrateur** | Gère produits, catégories, commandes, utilisateurs |

---

## 4. Spécifications Fonctionnelles

### 4.1 Module Authentification

| Fonctionnalité | Description |
|----------------|-------------|
| Inscription | Email, nom, téléphone, adresse, mot de passe |
| Connexion | Email + mot de passe |
| Déconnexion | Sécurisée |
| Mot de passe oublié | Email de réinitialisation (simulation) |
| Profil utilisateur | Modification des infos personnelles |

### 4.2 Module Catalogue Produits

| Fonctionnalité | Description |
|----------------|-------------|
| Liste des produits | Grille avec image, nom, prix, catégorie |
| Fiche produit | Image, description, prix, stock, ajout au panier |
| Catégories | Protéines, Vitamines, Bio, Accessoires, etc. |
| Recherche | Par nom de produit |
| Filtres | Par catégorie, prix (min/max), disponibilité |
| Pagination | 12 produits par page |

### 4.3 Module Panier

| Fonctionnalité | Description |
|----------------|-------------|
| Ajouter au panier | Sélection quantité, vérification stock |
| Modifier quantité | + / - avec mise à jour temps réel |
| Supprimer article | Avec confirmation |
| Récapitulatif | Sous-total, total, nombre d'articles |
| Persistance | Panier conservé en session (invité) ou BDD (connecté) |

### 4.4 Module Commande (Paiement à la Livraison)

| Fonctionnalité | Description |
|----------------|-------------|
| Processus de commande | Étape 1: Panier → Étape 2: Livraison → Étape 3: Confirmation |
| Adresse de livraison | Pré-remplie depuis profil, modifiable |
| Téléphone | Obligatoire pour la livraison |
| Mode de paiement | **Unique option: "Payer à la livraison"** |
| Récapitulatif commande | Liste produits, total, frais de livraison |
| Confirmation | Page de succès + numéro de commande généré |
| Email de confirmation | Simulation (affichage à l'écran ou log) |

> ⚠️ **Important** : Aucune intégration Stripe/PayPal. Le paiement est simulé. La commande est enregistrée avec statut "En attente de paiement à la livraison".

### 4.5 Module Espace Client

| Fonctionnalité | Description |
|----------------|-------------|
| Tableau de bord | Résumé des commandes |
| Historique commandes | Liste avec statut, date, total |
| Détail commande | Produits, quantités, prix, statut |
| Statuts possibles | En attente → En préparation → En livraison → Livrée |
| Profil | Modifier nom, email, téléphone, adresse, mot de passe |

### 4.6 Module Administration

| Fonctionnalité | Description |
|----------------|-------------|
| Dashboard admin | Statistiques (ventes, commandes, utilisateurs) |
| Gestion produits | CRUD (Create, Read, Update, Delete) |
| Gestion catégories | CRUD |
| Gestion commandes | Voir, modifier statut, annuler |
| Gestion utilisateurs | Voir, désactiver, promouvoir admin |
| Gestion stocks | Modifier quantité disponible |

---

## 5. Spécifications Techniques

### 5.1 Base de Données (MySQL)

#### Tables principales :

| Table | Description |
|-------|-------------|
| `users` | Clients et admins (role: client/admin) |
| `categories` | Catégories de produits |
| `products` | Produits nutritionnels |
| `orders` | Commandes |
| `order_items` | Lignes de commande |
| `carts` / `cart_items` | Panier (si utilisateur connecté) |

#### Schéma simplifié :

```
users (id, name, email, phone, address, password, role, created_at)
categories (id, name, slug, description, created_at)
products (id, category_id, name, slug, description, price, stock, image, is_active, created_at)
orders (id, user_id, order_number, total, delivery_address, phone, status, payment_method, created_at)
order_items (id, order_id, product_id, quantity, price, created_at)
```

### 5.2 Routes (Laravel)

| Route | Méthode | Description |
|-------|---------|-------------|
| `/` | GET | Page d'accueil |
| `/produits` | GET | Liste des produits |
| `/produits/{slug}` | GET | Fiche produit |
| `/panier` | GET | Panier |
| `/panier/ajouter` | POST | Ajouter au panier |
| `/panier/modifier` | PUT | Modifier quantité |
| `/panier/supprimer` | DELETE | Supprimer du panier |
| `/commande` | GET | Checkout |
| `/commande/valider` | POST | Valider commande |
| `/commande/confirmation/{id}` | GET | Page confirmation |
| `/compte` | GET | Espace client |
| `/compte/commandes` | GET | Historique |
| `/compte/commandes/{id}` | GET | Détail commande |
| `/admin` | GET | Dashboard admin |
| `/admin/produits` | GET/POST | CRUD produits |
| `/admin/commandes` | GET | Gestion commandes |

### 5.3 Architecture Frontend (Inertia + React)

```
resources/js/
├── Pages/
│   ├── Home.jsx              # Page d'accueil
│   ├── Produits/
│   │   ├── Index.jsx         # Liste produits
│   │   └── Show.jsx          # Fiche produit
│   ├── Panier/
│   │   └── Index.jsx         # Panier
│   ├── Commande/
│   │   ├── Checkout.jsx      # Processus commande
│   │   └── Confirmation.jsx  # Confirmation
│   ├── Compte/
│   │   ├── Dashboard.jsx     # Espace client
│   │   ├── Commandes.jsx     # Historique
│   │   └── Profil.jsx        # Modifier profil
│   └── Admin/
│       ├── Dashboard.jsx
│       ├── Produits/
│       └── Commandes/
├── Components/
│   ├── Layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── AdminLayout.jsx
│   ├── UI/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   └── Badge.jsx
│   ├── ProductCard.jsx
│   ├── CartItem.jsx
│   └── OrderStatus.jsx
└── app.jsx
```

---

## 6. Design & UX

### 6.1 Charte Graphique

consulter le dossier /DESIGN

### 6.2 Pages Clés

| Page | Description |
|------|-------------|
| **Accueil** | Hero banner, catégories populaires, produits vedettes, témoignages |
| **Produits** | Grille filtrable, sidebar catégories |
| **Produit** | Image grande taille, infos détaillées, ajout panier |
| **Panier** | Table récapitulative, total, bouton commander |
| **Checkout** | Formulaire livraison, récapitulatif, confirmation |
| **Espace Client** | Dashboard minimaliste, onglets commandes/profil |
| **Admin** | Sidebar navigation, tableaux de données |

---

## 7. Contraintes & Exigences

| Contrainte | Description |
|------------|-------------|
| Responsive | Mobile-first, fonctionne sur tous écrans |
| Performance | Chargement < 3s, images optimisées |
| Sécurité | CSRF protection, validation formulaires, XSS prevention |
| SEO de base | Meta tags, URLs propres (slugs) |
| Accessibilité | Contraste suffisant, labels formulaires |

---

## 8. Livrables Attendus

| Livrable | Description |
|----------|-------------|
| Code source | Repo GitHub avec documentation |
| Base de données | Migrations + seeders (données de test) |
| Documentation technique | Installation, architecture, choix techniques |
| Manuel utilisateur | Guide d'utilisation du site |
| Présentation | Soutenance finale (slides + démo) |

