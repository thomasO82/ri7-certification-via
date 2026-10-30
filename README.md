# RI7, certification VIA

Jeu pédagogique sur l’IA générative : dix chapitres, 31 slides interactives, exercices Ri7, notes et révisions.

## Démarrer

Node.js 20 ou plus récent. Aucune installation de dépendances nécessaire pour utiliser les commandes principales :

```sh
npm run dev
```

Ouvrir http://localhost:5173. Recharger la page après une modification des sources.

```sh
npm test
npm run build
npm run preview
```

L’aperçu du site construit est disponible sur http://localhost:4173. Le port peut être changé avec la variable `PORT`.

## Architecture

```text
index.html                   Point d’entrée du site
src/
  main.js                    Assemblage et parcours de l’interface
  core/                      État du jeu, progression et sauvegarde
  data/                      Cours, notions et rôles des tuteurs
  features/
    course/                  Lecteur vidéo facultatif
    notebook/                Notes et notions débloquées
    progress/                Liste des tâches
  ui/                        Scène, dialogues et adaptation à l’écran
  styles/                    Feuilles de styles
  generated/                 Modules intégrés des slides, exercices et révisions
public/
  assets/                    Décors, slides, polices et licences
  favicon.svg
scripts/                     Construction et serveurs locaux
  ri7/                       Dépendances facultatives de reconstruction des modules Ri7
vendor/ri7/                  Sources tierces des exercices et des révisions
tests/                       Tests Node.js
docs/                        Architecture et plan de refactoring
dist/                        Site construit et HTML autonome (générés)
outputs/                     Lanceur de compatibilité avec l’ancien chemin
```

Modifier les fichiers de `src/` et `public/`. Ne pas modifier directement `dist/` : `npm run build` le régénère. Le serveur de développement utilise directement les sources. `src/generated/` contient les modules pédagogiques déjà intégrés et reste versionné.

## Livrables

- `dist/index.html` et les dossiers `dist/src/`, `dist/assets/` : site à déployer ensemble sur un hébergement statique.
- `dist/Jouer-au-laboratoire.html` : version autonome à ouvrir directement dans le navigateur.
- `outputs/Jouer-au-laboratoire.html` : ancien chemin conservé comme lanceur ; il transfère les clés de sauvegarde du jeu lorsque cela est possible, sans remplacer une sauvegarde déjà présente à destination.

Les vidéos facultatives sont chargées depuis Ri7 et nécessitent Internet. Le navigateur conserve la progression et les notes dans son stockage local. Une version servie sur localhost et une version ouverte comme fichier peuvent avoir des sauvegardes différentes ; le stockage dépend de l’adresse utilisée.

## Reconstruction avancée des ressources Ri7

Uniquement pour modifier les modules intégrés des exercices ou des révisions :

```sh
npm ci --prefix scripts/ri7
npm run build:exercises
npm run build:study
npm run build
```

Les sources correspondantes se trouvent dans `vendor/ri7/`. Leurs fichiers intermédiaires ne sont pas versionnés. Aucune clé d’API ni fichier `.env` n’est nécessaire.

## Sources et droits

Cours : https://demo-learning.ri7.fr/01-comprendre-ia-generative/
Fiche mémo : https://demo-learning.ri7.fr/01-comprendre-ia-generative/fiche-memo/

Les contenus pédagogiques, le logo Ri7 et les ressources tierces conservent leurs droits respectifs. Les licences des polices sont dans `public/assets/fonts/`.
