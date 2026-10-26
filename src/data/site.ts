// Données du commerce : nom, adresse, téléphone, horaires, liens.
// Modifier ici : tout le site suit (pages, pied de page, JSON-LD, statut ouvert/fermé).
import { SITE_URL } from './url.mjs';

const adresseTexte = '9 rue du Général Leclerc, 95410 Groslay';
const q = encodeURIComponent(adresseTexte);

export const SITE = {
  url: SITE_URL,
  nom: 'Tabac de la Place',
  adresse: { rue: '9 rue du Général Leclerc', cp: '95410', ville: 'Groslay', region: "Val-d'Oise", pays: 'FR' },
  adresseTexte,
  telAffiche: '01 39 83 32 90',
  telLien: '+33139833290',
  note: '4,4',
  noteNum: 4.4,
  nbAvis: 70,
  paiements: 'Carte bancaire, sans contact',
  itineraire: `https://www.google.com/maps/dir/?api=1&destination=${q}`,
  carte: `https://www.google.com/maps?q=${encodeURIComponent('Tabac de la Place, ' + adresseTexte)}&output=embed`,
  avisGoogle: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Tabac de la Place ' + adresseTexte)}`,
  // Réseaux sociaux / fiche Google : à compléter (voir A_COMPLETER.md). Laisser vide plutôt qu'inventer.
  sameAs: [] as string[],
  voisines: ['Montmorency', 'Saint-Brice-sous-Forêt', 'Sarcelles', 'Deuil-la-Barre', 'Montmagny', 'Domont', 'Ézanville'],
};

// Horaires habituels (source : fiche Google, À CONFIRMER avec les gérants).
// jour : 0 = dimanche … 6 = samedi. plages : liste de [ouverture, fermeture] en "HH:MM".
// Pour une coupure le midi : plages: [['07:00', '12:30'], ['14:00', '20:00']].
// Jour fermé : plages: [].
export type Jour = { jour: number; nom: string; plages: [string, string][] };
export const HORAIRES: Jour[] = [
  { jour: 1, nom: 'Lundi', plages: [['07:00', '20:00']] },
  { jour: 2, nom: 'Mardi', plages: [['07:00', '20:00']] },
  { jour: 3, nom: 'Mercredi', plages: [['07:00', '20:00']] },
  { jour: 4, nom: 'Jeudi', plages: [['07:00', '20:00']] },
  { jour: 5, nom: 'Vendredi', plages: [['07:00', '20:00']] },
  { jour: 6, nom: 'Samedi', plages: [['08:00', '20:00']] },
  { jour: 0, nom: 'Dimanche', plages: [['07:00', '20:00']] },
];

export const fmtHeure = (h: string) => h.replace(':', 'h').replace(/^0(?=\d)/, '');
export const fmtPlages = (p: [string, string][]) =>
  p.length ? p.map(([a, b]) => `${fmtHeure(a)} – ${fmtHeure(b)}`).join(' / ') : 'Fermé';

// Les 4 extraits d'avis fournis (Avis Google). Ne jamais en ajouter d'inventés.
export const AVIS = [
  'Établissement repris par deux jeunes très souriants et sympathiques. C’est très bien pour le centre de Groslay.',
  'Avant, j’étais client pour le tabac seulement. Depuis le changement de propriétaires, j’ai pris le temps de boire un verre. Les nouveaux patrons sont dynamiques et sympathiques.',
  'Si vous souhaitez profiter d’un moment entre potes autour d’un verre, allez-y les yeux fermés.',
  'Accueil très chaleureux et familial depuis les nouveaux propriétaires !',
];

export const LOI_EVIN = 'L’abus d’alcool est dangereux pour la santé, à consommer avec modération.';
