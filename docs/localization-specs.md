# Spécifications Locale — MarrakechNutrition

## Contexte
MarrakechNutrition est une boutique en ligne destinée exclusivement au marché marocain, et plus particulièrement aux résidents de Marrakech et de ses environs. Toutes les spécifications ci-dessous doivent être respectées dans le développement du site.

---

## 1. Langue

### Langue principale
- **Français** : langue par défaut de l'interface
- Toutes les pages, formulaires, emails, notifications et messages d'erreur doivent être en français

### Exigences linguistiques
- Utiliser un français clair et accessible (éviter le jargon technique)
- Respecter les conventions typographiques françaises :
  - Espace avant les deux-points, points-virgules, points d'interrogation et d'exclamation
  - Nombres séparés par des espaces (ex: 1 250,00)
- Terminologie e-commerce adaptée :
  - "Panier" (et non "Caddie")
  - "Commande" (et non "Ordre")
  - "Livraison" (et non "Shipping")
  - "Payer à la livraison" (et non "Cash on delivery")
  - "Compte client" (et non "Account")
  - "Produits" (et non "Items")

### Contenu éditorial
- Descriptions de produits en français
- Mentions légales, CGV, politique de confidentialité en français
- Emails transactionnels en français

---

## 2. Devise

### Devise unique
- **Dirham marocain (MAD)** : seule devise acceptée
- Symbole affiché : **DH** ou **MAD**
- Format d'affichage : `1 250,00 DH` ou `1 250,00 MAD`

### Règles de formatage
- Séparateur de milliers : espace (`1 250`)
- Séparateur décimal : virgule (`,00`)
- Toujours afficher deux décimales pour les prix
- Pas de conversion vers d'autres devises
- Pas de sélecteur de devise

### Exemples d'affichage
| Montant | Affichage correct |
|---------|-------------------|
| 150 | 150,00 DH |
| 1250 | 1 250,00 DH |
| 1250.50 | 1 250,50 DH |
| 15000 | 15 000,00 DH |

---

## 3. Informations de Contact et Livraison

### Numéros de téléphone
- Format marocain : `+212 6XX-XXXXXX` ou `06XX-XXXXXX`
- Validation : 10 chiffres commençant par 06, 07 ou 05
- Affichage avec espaces pour la lisibilité

### Adresses de livraison
- Structure adaptée au Maroc :
  - Quartier / Hay
  - Ville (Marrakech par défaut, autres villes possibles)
  - Code postal (optionnel, 4 chiffres si fourni)
- Indication "À la livraison" pour le mode de paiement
- Message indiquant la zone de livraison couverte (Marrakech et environs)

### Frais de livraison
- Affichés en dirhams
- Possibilité de livraison gratuite au-delà d'un certain montant (ex: livraison gratuite à partir de 500 DH)
- Montant des frais de livraison clairement indiqué avant validation de la commande

---

## 4. Aspect Culturel et Local

### Identité visuelle
- Palette de couleurs inspirée du Maroc :
  - Vert : nature, santé, argan
  - Terracotta/Orange : Marrakech, terre
  - Or/Bronze : artisanat, élégance

### Contenu
- Références locales possibles : "Livrés à Marrakech", "Produits sélectionnés pour vous"
- Horaires de livraison adaptés (ex: livraison du lundi au samedi)
- Mention des jours fériés marocains si applicable

### Confiance et rassurance
- Badge "Paiement à la livraison" visible sur la page d'accueil et le panier
- Mention "Satisfait ou remboursé" si applicable
- Numéro de téléphone local visible (pas de numéro international)

---

## 5. Contraintes Techniques

### Pas de internationalisation (i18n)
- Une seule langue (français)
- Une seule devise (MAD)
- Pas de sélecteur de langue
- Pas de sélecteur de devise
- Pas de conversion de devises
- Pas de géolocalisation automatique

### Validation des formulaires
- Messages d'erreur en français
- Validation du téléphone au format marocain
- Validation de l'email standard
- Champs obligatoires clairement marqués

### Emails
- Expéditeur avec nom français (ex: "MarrakechNutrition <contact@marrakechnutrition.ma>")
- Contenu entièrement en français
- Montants toujours en DH avec formatage correct

---

## 6. Résumé des Exigences Clés

| Élément | Exigence |
|---------|----------|
| Langue | Français uniquement |
| Devise | Dirham marocain (MAD / DH) uniquement |
| Format prix | `1 250,00 DH` (espace milliers, virgule décimale) |
| Téléphone | Format marocain 06/07/05XX-XXXXXX |
| Livraison | Marrakech et environs, à la livraison |
| Paiement | À la livraison uniquement (simulé) |
| i18n | Non requis |
