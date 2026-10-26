// Calcul des horaires du jour : horaires habituels + fichier src/data/aujourdhui.json
// (fermetures exceptionnelles, horaires modifiés, annonces). Fuseau Europe/Paris.
import { HORAIRES, fmtHeure, type Jour } from '../data/site';

export type Fermeture = { du: string; au?: string; motif?: string };
export type HoraireModifie = { date: string; plages?: [string, string][]; ouvre?: string; ferme?: string; motif?: string };
export type Annonce = { du: string; au?: string; texte: string };
export type Aujourdhui = { misAJourLe?: string; annonces?: Annonce[]; fermetures?: Fermeture[]; horairesModifies?: HoraireModifie[] };

export type JourCalcule = {
  date: string; // AAAA-MM-JJ
  jour: number; // 0 = dimanche
  plages: [string, string][];
  ferme: boolean;
  exceptionnel: false | 'fermeture' | 'modifie';
  motif?: string;
};

const toMin = (h: string) => { const [a, b] = h.split(':'); return +a * 60 + +b; };

/** Date et minute courantes à Paris. */
export function maintenantParis(d = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(d);
  const g = (t: string) => parts.find((p) => p.type === t)?.value ?? '00';
  return { date: `${g('year')}-${g('month')}-${g('day')}`, minute: +g('hour') * 60 + +g('minute') };
}

/** Ajoute n jours à une date AAAA-MM-JJ (calcul en UTC, sans effet d'heure d'été). */
export function ajouterJours(date: string, n: number) {
  const d = new Date(date + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}
const jourSemaine = (date: string) => new Date(date + 'T12:00:00Z').getUTCDay();
const dansPeriode = (date: string, du: string, au?: string) => date >= du && date <= (au || du);

export function calculerJour(date: string, data: Aujourdhui, horaires: Jour[] = HORAIRES): JourCalcule {
  const jour = jourSemaine(date);
  const fermeture = (data.fermetures ?? []).find((f) => f.du && dansPeriode(date, f.du, f.au));
  if (fermeture) return { date, jour, plages: [], ferme: true, exceptionnel: 'fermeture', motif: fermeture.motif };
  const modif = (data.horairesModifies ?? []).find((m) => m.date === date);
  if (modif) {
    const plages = modif.plages ?? (modif.ouvre && modif.ferme ? [[modif.ouvre, modif.ferme] as [string, string]] : []);
    return { date, jour, plages, ferme: plages.length === 0, exceptionnel: 'modifie', motif: modif.motif };
  }
  const plages = horaires.find((h) => h.jour === jour)?.plages ?? [];
  return { date, jour, plages, ferme: plages.length === 0, exceptionnel: false };
}

export type Statut = { ouvert: boolean; texte: string; exceptionnel: boolean };

export function calculerStatut(data: Aujourdhui, d = new Date()): Statut {
  const { date, minute } = maintenantParis(d);
  const auj = calculerJour(date, data);
  const enCours = auj.plages.find(([a, b]) => minute >= toMin(a) && minute < toMin(b));
  if (enCours) return { ouvert: true, texte: `Ouvert maintenant, jusqu’à ${fmtHeure(enCours[1])}`, exceptionnel: auj.exceptionnel === 'modifie' };
  const prochaineAuj = auj.plages.find(([a]) => minute < toMin(a));
  const prefixe = auj.exceptionnel === 'fermeture' ? 'Fermeture exceptionnelle aujourd’hui' : 'Fermé';
  if (prochaineAuj) return { ouvert: false, texte: `${prefixe}, ouvre à ${fmtHeure(prochaineAuj[0])}`, exceptionnel: !!auj.exceptionnel };
  // Cherche la prochaine ouverture dans les 21 jours.
  for (let i = 1; i <= 21; i++) {
    const j = calculerJour(ajouterJours(date, i), data);
    if (j.plages.length) {
      const quand = i === 1 ? 'demain' : nomJour(j.jour).toLowerCase() + (i > 6 ? ' ' + dateCourte(j.date) : '');
      return { ouvert: false, texte: `${prefixe}, rouvre ${quand} à ${fmtHeure(j.plages[0][0])}`, exceptionnel: !!auj.exceptionnel };
    }
  }
  return { ouvert: false, texte: prefixe, exceptionnel: !!auj.exceptionnel };
}

const NOMS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
export const nomJour = (j: number) => NOMS[j];
export function dateCourte(date: string) {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(date + 'T12:00:00Z'));
}
export function dateLongue(date: string) {
  return new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(date + 'T12:00:00Z'));
}

export const annoncesDuJour = (date: string, data: Aujourdhui) =>
  (data.annonces ?? []).filter((a) => a.du && a.texte && dansPeriode(date, a.du, a.au));
