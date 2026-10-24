# TaskFlow (projet de démo)

API de gestion de tâches en TypeScript, sans dépendance. Node 22.18+ exécute le TypeScript directement.

## Commandes
- `npm test` : lance tous les tests (runner natif `node --test`)
- `node --test test/tasks.test.ts` : un seul fichier de test
- `npm start` : serveur HTTP sur le port 3000

## Architecture
- `src/types.ts` : types partagés (`Task`, `Priority`)
- `src/tasks.ts` : `TaskStore`, stockage en mémoire
- `src/validate.ts` : validation des entrées
- `src/priority.ts` : score d'urgence
- `src/stats.ts` : statistiques
- `src/server.ts` : routes HTTP
- `test/` : un fichier `*.test.ts` par module de `src/`

## Règles
- Imports relatifs avec l'extension `.ts` (`import { x } from "./x.ts"`)
- Pas de dépendance externe sans validation de l'équipe
- Toute fonction publique de `src/` a un test dans `test/`
- Messages d'erreur en français
- Ne jamais lire ni modifier `.env` ni `logs/`
