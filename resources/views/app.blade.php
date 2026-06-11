<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="MarrakechNutrition — Produits de nutrition et compléments alimentaires à Marrakech. Livraison à domicile, paiement à la livraison." />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    @routes
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead
  </head>
  <body>
    @inertia
  </body>
</html>
