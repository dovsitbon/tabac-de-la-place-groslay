# Tabac de la Place — site vitrine (Groslay)

Site statique Astro + Tailwind. Café-bar-tabac, 9 rue du Général Leclerc, 95410 Groslay.

## Lancer en local
```bash
npm install
npm run dev        # http://localhost:4413
npm run build      # génère dist/
npm run preview    # sert dist/ sur le port 4413
npm run captures   # captures 390 px et 1440 px dans captures/ (après build)
npm run og         # régénère public/og.png et apple-touch-icon.png
```

## Déployer
Projet Vercel relié au dépôt GitHub : chaque `git push` sur `main` redéploie. Astro statique est détecté automatiquement (aucun réglage).
URL du site : `src/data/url.mjs` (un seul endroit), plus `public/robots.txt` et `public/llms.txt` à ajuster si le domaine change.

## Tableau du jour : modifier en 30 secondes
Tout est dans **`src/data/aujourdhui.json`**. Ouvrez-le sur GitHub (icône crayon), modifiez, « Commit changes » : le site est à jour en une minute environ.

- `misAJourLe` : la date du jour de votre modification (affichée sur l'affichette).
- `annonces` : un événement (match, soirée…). `du` / `au` = dates d'affichage.
- `fermetures` : fermeture exceptionnelle, un jour (`du` seul) ou plusieurs (`du` + `au`). Le statut « Ouvert / Fermé », l'affichette et le bloc « Fermetures exceptionnelles » en tiennent compte automatiquement.
- `horairesModifies` : un jour avec des horaires différents (ex. veille de Noël).

Les dates sont au format `AAAA-MM-JJ`, les heures `HH:MM`. Les dates passées disparaissent toutes seules.

Exemple :
```json
{
  "misAJourLe": "2026-12-20",
  "annonces": [
    { "du": "2026-12-20", "texte": "Match ce soir à 21h, sur l'écran de la salle" }
  ],
  "fermetures": [
    { "du": "2026-12-25", "motif": "Noël" },
    { "du": "2027-08-09", "au": "2027-08-22", "motif": "Congés d'été" }
  ],
  "horairesModifies": [
    { "date": "2026-12-24", "ouvre": "07:00", "ferme": "16:00", "motif": "Veille de Noël" }
  ]
}
```
Attention aux virgules et aux guillemets droits `"` : si le JSON est mal formé, le build échoue et l'ancienne version reste en ligne.
Pour une coupure le midi un jour donné : `"plages": [["07:00","12:30"],["14:00","20:00"]]` à la place de `ouvre`/`ferme`.

## Où changer le reste
- **Horaires habituels, téléphone, adresse, avis, liens** : `src/data/site.ts` (tout le site suit, JSON-LD compris).
- **Services tabac / jeux** : `src/data/services.json`, ex. `{ "services": ["Timbres fiscaux"] }` (uniquement des services confirmés), puis retirer la ligne `[À CONFIRMER]` si la liste est complète.
- **Textes de l'accueil** : `src/pages/index.astro`. Mentions légales : `src/pages/mentions-legales.astro`.
- **Photos** : remplacer les composants `<Photo …/>` de `index.astro` par `<Image src={…} alt="…" />` (`astro:assets`, fichiers dans `src/assets/`). Liste des clichés : `PHOTOS_A_PRENDRE.md`.
- Ce qui reste à confirmer : `A_COMPLETER.md`.
