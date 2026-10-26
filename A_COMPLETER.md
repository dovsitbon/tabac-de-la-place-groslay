# À compléter / à confirmer avec les gérants

Chaque point correspond à un marqueur jaune `[À CONFIRMER]` visible sur le site (ou à une donnée absente).

## Accueil
- [ ] **Horaires** : les horaires viennent de Google (lun.–ven. 7h–20h, sam. 8h–20h, dim. 7h–20h). Les faire valider, puis retirer les marqueurs dans `src/pages/index.astro` (affichette + tableau). Fichier : `src/data/site.ts`.
- [ ] **Fermetures exceptionnelles à venir** (congés, jours fériés) : à saisir dans `src/data/aujourdhui.json`.
- [ ] **Terrasse** : oui / non, nombre de places, saison.
- [ ] **Services tabac et jeux** : FDJ, PMU, Nickel, timbres fiscaux, recharges, colis… Ne lister que ce qui est confirmé (`src/data/services.json`).
- [ ] **Prénoms des deux gérants** (et accord pour leur photo).
- [ ] **Stationnement** à proximité (parking, places en zone bleue…).
- [ ] Autres détails possibles : écran pour les matchs, jeux d'arcade (lesquels), boissons chaudes, carte des boissons et prix.

## SEO / données structurées
- [ ] **Coordonnées GPS** (`geo`) : non renseignées faute de source sûre. Récupérer latitude/longitude sur la fiche Google et les ajouter dans `src/layouts/Base.astro`.
- [ ] **Lien de la fiche Google** et éventuels réseaux sociaux (Facebook, Instagram) → `SITE.sameAs` dans `src/data/site.ts`. Le lien « Lire les avis » pointe pour l'instant vers une recherche Google Maps.
- [ ] Domaine définitif : `src/data/url.mjs`, `public/robots.txt`, `public/llms.txt`.

## Mentions légales (`src/pages/mentions-legales.astro`)
- [ ] Forme juridique, raison sociale
- [ ] SIRET, RCS, capital social
- [ ] N° TVA intracommunautaire
- [ ] E-mail de contact
- [ ] Directeur de la publication
