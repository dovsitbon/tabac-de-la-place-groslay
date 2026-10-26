# Prompt Claude Code : site « Tabac de la Place » (café-bar-tabac, Groslay)

Tu es un développeur front-end et directeur artistique senior. Crée le site vitrine du **Tabac de la Place**, café-bar-tabac du centre de Groslay. Objectif business : présenter le **café du centre-ville** repris par une nouvelle équipe, faire venir les habitants boire un verre, et surtout **afficher des horaires fiables et à jour** (un avis récent reproche des ouvertures irrégulières : le site doit corriger cette image).

## Fiche d'identité (informations vérifiées)
- **Nom** : Tabac de la Place (référencé par la mairie de Groslay comme « café bar restaurant »)
- **Type** : bar-tabac, café, bar (bière, vin, alcools, spiritueux), jeux d'arcade ; services de tabac et de jeux `[À CONFIRMER : FDJ, PMU, Nickel, timbres fiscaux, recharges…]`
- **Adresse** : 9 rue du Général Leclerc, 95410 Groslay (centre-ville)
- **Téléphone** : 01 39 83 32 90
- **Horaires (Google)** : lundi au vendredi 07h00–20h00 · samedi 08h00–20h00 · dimanche 07h00–20h00 `[À CONFIRMER avec les gérants]`
- **Note Google** : 4,4/5 sur 70 avis
- **Gérance** : repris il y a environ 3 ans par **deux jeunes gérants** (selon de nombreux avis), dynamiques et accueillants
- **Vie locale** : lieu de rencontre (ex. un élu y a tenu une permanence)
- **Paiements** : CB, sans contact
- **Schema.org** : `BarOrPub` (+ `Store` pour la partie tabac)

## Ce que disent les clients
Nouveaux propriétaires sympathiques, accueillants, serviables, ambiance familiale et conviviale, « très bien pour le centre de Groslay », « un lieu où on se sent bien », boisson citée : **le Monaco**. Un avis récent négatif sur le respect des horaires → solution intégrée au site (voir plus bas).

Extraits d'avis utilisables (« Avis Google ») :
- « Établissement repris par deux jeunes très souriants et sympathiques. C'est très bien pour le centre de Groslay. »
- « Avant, j'étais client pour le tabac seulement. Depuis le changement de propriétaires, j'ai pris le temps de boire un verre. Les nouveaux patrons sont dynamiques et sympathiques. »
- « Si vous souhaitez profiter d'un moment entre potes autour d'un verre, allez-y les yeux fermés. »
- « Accueil très chaleureux et familial depuis les nouveaux propriétaires ! »

## Direction artistique (angle : « le zinc de la place »)
- Inspiration : **le comptoir en zinc, les tickets de caisse, les sous-bocks, l'enseigne « carotte » rouge des tabacs** (dessinée de façon libre, pas de logo officiel), les affichettes scotchées au comptoir.
- Palette : rouge carotte, gris zinc, crème, noir ; une touche jaune pour les infos du jour.
- Typo : une condensée d'affiche (ex. Anton ou Oswald) + une serif de journal (ex. Source Serif 4) pour le texte.
- Idée signature : un **« tableau du jour » à la façon d'une affichette de comptoir** en haut de page : horaires du jour, fermeture exceptionnelle éventuelle, événement (match, soirée), le tout dans `src/data/aujourdhui.json` modifiable en 30 secondes. C'est la réponse au problème d'horaires.

## Structure
1. **Accueil** : « Le café de la place, au cœur de Groslay », tableau du jour, statut ouvert/fermé, bouton « Appeler ».
2. **Le café-bar** : boire un verre, café le matin dès 7h, terrasse `[À CONFIRMER]`, ambiance, le Monaco.
3. **Le tabac & services** : liste `[À CONFIRMER]` (pas d'invention).
4. **Les gérants** : deux jeunes repreneurs, prénoms et photo `[À CONFIRMER]`.
5. **Avis** : 4 extraits + 4,4/5.
6. **Infos pratiques** : horaires de la semaine + bloc « Fermetures exceptionnelles » éditable, adresse, carte.

---

## Règles communes (à respecter strictement)

### 1. Avant de coder
- Liste les skills et plugins disponibles dans ta session et **utilise toutes celles qui s'appliquent** : design frontend (ex. `frontend-design`), tests navigateur / captures (Playwright, `webapp-testing`), images, déploiement, etc. Dis-moi lesquelles tu utilises.
- Propose-moi en 10 lignes max la direction artistique (palette en hex, 2 polices, ambiance, 1 idée de mise en page signature) **puis enchaîne sans attendre ma validation**.

### 2. Stack technique
- **Astro + Tailwind CSS**, site statique, zéro framework JS lourd côté client (îlots JS seulement si nécessaire).
- Polices auto-hébergées (`@fontsource`), pas d'appel Google Fonts.
- Images en AVIF/WebP via `astro:assets`, `loading="lazy"` sauf la première image.
- Déploiement prévu sur **Vercel** (ajoute la config si besoin). Si un accès Vercel est connecté dans ta session, fais un déploiement **preview** et donne-moi l'URL.
- Objectif Lighthouse : ≥ 95 sur les 4 scores, mobile.

### 3. Design qui NE FAIT PAS « site généré par IA » (priorité n°1)
Interdit :
- dégradés violet/bleu, « glassmorphism », blobs flous en fond, néons, ombres molles partout ;
- la grille « 3 cartes avec une icône + titre + 2 lignes » ;
- les emojis comme icônes, les icônes génériques type Heroicons/Lucide posées partout ;
- Inter/Poppins/Montserrat seules, tout centré, tout arrondi en `rounded-2xl` ;
- les phrases creuses : « Bienvenue chez… », « Découvrez… », « Plongez dans… », « Votre partenaire de confiance », « Une expérience unique », « Notre passion, votre satisfaction » ;
- les fausses stats (« +500 clients satisfaits »), les faux témoignages, les photos de banque d'images clichés (poignée de main, personnes en costume qui sourient).

À faire :
- une **identité propre au lieu** (voir la direction artistique plus haut), avec un ou deux partis pris forts : typographie éditoriale, mise en page asymétrique, détails réels (ardoise, ticket, plaque, carte routière, numéro de rue en très grand…) ;
- des textes **courts, concrets, à la voix du commerçant**, avec de vrais détails (horaires, plats, adresses, noms de rues, parkings) ;
- du rythme : alterner sections pleines et aérées, une grande typo, des espaces généreux ;
- des micro-interactions sobres (hover, apparition légère au scroll), rien de plus ;
- `prefers-reduced-motion` respecté.

### 4. Contenu : zéro invention
- Utilise **uniquement** les informations fournies dans ce prompt.
- Tout ce qui manque (prix, plats exacts, photos, nom du gérant, SIRET…) = un marqueur visible **`[À CONFIRMER]`** et une entrée dans le fichier `A_COMPLETER.md` à la racine.
- Avis clients : n'utilise **que** les extraits fournis, attribués « Avis Google ». Jamais d'avis inventé, jamais de nom inventé.

### 5. Photos
- **Ne télécharge pas et n'intègre pas** de photos Google Maps / Facebook / Instagram (droits d'auteur des clients et du commerce).
- Mets des emplacements propres (bloc couleur + légende du cliché attendu, pas de gris « placeholder ») et crée `PHOTOS_A_PRENDRE.md` : la liste précise des photos à faire (cadrage, lumière, format), pour que je les prenne moi-même chez le commerçant.

### 6. SEO local (indispensable)
- `<html lang="fr">`, title + meta description uniques, Open Graph, favicon.
- **JSON-LD schema.org** adapté (type indiqué plus haut) avec nom, adresse, téléphone, horaires `openingHoursSpecification`, géolocalisation, `sameAs` (réseaux sociaux).
- Nom / adresse / téléphone identiques partout (NAP), pied de page compris.
- Carte : iframe Google Maps chargée **au clic** (façade légère) pour ne pas plomber la perf.
- `sitemap.xml`, `robots.txt`, URLs propres, H1 unique, balises `alt` descriptives.
- Mots-clés locaux naturels : la ville + les communes voisines (Groslay, Montmorency, Saint-Brice-sous-Forêt, Sarcelles, Deuil-la-Barre, Montmagny, Domont, Ézanville).

### 7. Conversion et mobile
- Mobile d'abord. **Bouton d'appel fixe en bas d'écran sur mobile** (`tel:`), + bouton itinéraire (lien Google Maps).
- Horaires lisibles, avec indication « Ouvert maintenant / Fermé » calculée en JS léger (fuseau Europe/Paris).
- Accessibilité AA : contrastes, focus visibles, navigation clavier, tailles de cibles ≥ 44 px.

### 8. Légal
- Page **Mentions légales** (éditeur, hébergeur Vercel, SIRET `[À CONFIRMER]`) et **Politique de confidentialité**.
- Pas de traceur, donc pas de bandeau cookies. Si un formulaire existe : consentement RGPD + envoi via un service sans backend (ex. Formspree / Web3Forms, clé `[À CONFIRMER]`).

### 9. Livraison
1. `npm run build` sans erreur ni warning.
2. Captures Playwright **mobile (390 px) et desktop (1440 px)** de chaque page ; regarde-les toi-même et corrige ce qui fait « template » ou « IA » avant de me rendre la main.
3. Un `README.md` court : lancer en local, déployer, où changer textes / photos / horaires.
4. Les fichiers `A_COMPLETER.md` et `PHOTOS_A_PRENDRE.md`.
5. Un résumé final de 10 lignes max : ce qui est fait, ce qui manque.
