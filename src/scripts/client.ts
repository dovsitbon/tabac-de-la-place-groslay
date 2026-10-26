// Met à jour, dans le navigateur, le statut ouvert/fermé, le tableau du jour,
// la ligne du jour dans les horaires et la liste des fermetures à venir.
import data from '../data/aujourdhui.json';
import { fmtPlages } from '../data/site';
import { maintenantParis, calculerJour, calculerStatut, ajouterJours, annoncesDuJour, dateLongue, nomJour, type Aujourdhui } from './horaires';

const D = data as Aujourdhui;

function maj() {
  const { date } = maintenantParis();
  const statut = calculerStatut(D);

  document.querySelectorAll<HTMLElement>('[data-statut]').forEach((el) => {
    el.dataset.ouvert = statut.ouvert ? 'oui' : 'non';
    const t = el.querySelector('[data-statut-texte]');
    if (t) t.textContent = statut.texte;
  });

  const tab = document.querySelector<HTMLElement>('[data-tableau]');
  if (tab) {
    const auj = calculerJour(date, D);
    const dem = calculerJour(ajouterJours(date, 1), D);
    const set = (sel: string, txt: string) => { const e = tab.querySelector(sel); if (e) e.textContent = txt; };
    set('[data-auj-date]', dateLongue(date));
    set('[data-auj-heures]', auj.ferme ? 'Fermé' : fmtPlages(auj.plages).replace(/ – /g, '–'));
    set('[data-dem-heures]', `Demain, ${nomJour(dem.jour).toLowerCase()} : ${dem.ferme ? 'fermé' : fmtPlages(dem.plages)}${dem.exceptionnel ? ' (exceptionnel)' : ''}`);

    const exc = tab.querySelector<HTMLElement>('[data-auj-exception]');
    if (exc) {
      if (auj.exceptionnel) {
        exc.hidden = false;
        const titre = auj.exceptionnel === 'fermeture' ? 'Fermeture exceptionnelle' : 'Horaires modifiés aujourd’hui';
        exc.textContent = auj.motif ? `${titre} : ${auj.motif}` : titre;
      } else exc.hidden = true;
    }
    const liste = tab.querySelector<HTMLElement>('[data-auj-annonces]');
    const vide = tab.querySelector<HTMLElement>('[data-auj-vide]');
    const annonces = annoncesDuJour(date, D);
    if (liste) {
      liste.replaceChildren(...annonces.map((a) => { const li = document.createElement('li'); li.textContent = a.texte; return li; }));
      liste.hidden = annonces.length === 0;
    }
    if (vide) vide.hidden = annonces.length > 0;
    tab.dataset.ferme = auj.ferme ? 'oui' : 'non';
  }

  const jour = new Date(date + 'T12:00:00Z').getUTCDay();
  document.querySelectorAll('[data-jour]').forEach((el) => {
    if (el.getAttribute('data-jour') === String(jour)) el.setAttribute('aria-current', 'date');
    else el.removeAttribute('aria-current');
  });

  // Masque les fermetures déjà passées ; affiche « aucune » s'il n'en reste pas.
  document.querySelectorAll<HTMLElement>('[data-fermetures]').forEach((bloc) => {
    let restantes = 0;
    bloc.querySelectorAll<HTMLElement>('[data-au]').forEach((li) => {
      const passe = (li.dataset.au ?? '') < date;
      li.hidden = passe;
      if (!passe) restantes++;
    });
    const aucune = bloc.querySelector<HTMLElement>('[data-aucune]');
    if (aucune) aucune.hidden = restantes > 0;
  });
}

try { maj(); setInterval(maj, 60_000); } catch { /* le contenu statique reste affiché */ }
