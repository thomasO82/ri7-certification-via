# Architecture web classique — Implementation Plan

**Goal:** Séparer les sources, ressources publiques, tests, outils et livrables sans changer le fonctionnement du jeu.
**Architecture:** JavaScript natif avec modules ES, ressources statiques dans public, sortie web et autonome générées dans dist. Aucun framework ni installation supplémentaire requis pour lancer, tester et construire.
**Tech Stack:** Node.js >=20, HTML, CSS, JavaScript.

- [x] Déplacer les modules vers src/core, src/data, src/ui, src/features et src/generated ; réécrire les imports et les tests.
- [x] Mettre les ressources dans public/assets, le point d’entrée index.html à la racine, les CSS dans src/styles.
- [x] Ajouter scripts/build.mjs, scripts/dev.mjs et scripts/preview.mjs ; isoler les sources tierces dans vendor/ri7.
- [x] Vérifier la résolution des imports, la construction web/autonome, les tests et le parcours dans un navigateur.
- [x] Mettre à jour README et documentation d’architecture ; retirer les anciens dossiers de travail du projet.

Conserver les clés de sauvegarde et les règles de progression. Le chemin historique du jeu reste un lanceur de compatibilité, le livrable officiel devient dist/Jouer-au-laboratoire.html. Les vidéos restent facultatives et distantes.
