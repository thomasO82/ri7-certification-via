# Architecture

L’application utilise HTML, CSS et des modules JavaScript natifs. La réorganisation conserve la logique métier existante, les clés de sauvegarde et les règles de déblocage des cours.

## Responsabilités

- `core` ne dépend pas du DOM : moteur de progression, validation et persistance.
- `data` décrit les chapitres, les 39 notions et les trois tuteurs.
- `features` regroupe les outils de cours, notes et progression.
- `ui` gère la scène et les interactions visuelles.
- `main.js` coordonne ces modules. Il contient encore les écrans hérités ; ce refactoring change leur emplacement et leurs dépendances sans réécrire leurs comportements.
- `generated` isole les documents intégrés dans des iframes. Leurs sources tierces sont dans `vendor/ri7`.

## Exécution et construction

Le serveur de développement sert `index.html`, `src` et `public` sur localhost. Il ne publie pas les autres dossiers du projet. Le serveur d’aperçu sert uniquement `dist`.

La construction copie les modules et ressources pour produire un site statique, puis parcourt le graphe d’imports de `src/main.js` pour produire une version autonome avec images et polices intégrées. Les deux formes sont nécessaires : hébergement classique et fichier transportable hors ligne.

L’ancien chemin `outputs/Jouer-au-laboratoire.html` contient uniquement un lanceur généré. Son fragment d’URL transporte exclusivement les six clés de sauvegarde Ri7 autorisées ; elles sont restaurées uniquement si absentes à destination, puis le fragment est effacé.

## Validation

`npm test` vérifie le moteur, les sauvegardes, le lecteur, les notions, les tâches, les dialogues, les chemins d’imports et les ressources. La vérification navigateur couvre la classe, les notes, les révisions et l’ouverture des slides.

Les sources tierces nécessaires sont conservées ; les anciennes captures et étapes de développement sont hors du projet dans la sauvegarde de nettoyage.
