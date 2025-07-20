# Architecture et Guide de Contribution Front-End

Ce projet suit les principes d'une architecture modulaire par features, avec une séparation claire des responsabilités et une approche Atomic Design pour les composants.

---

## Structure du Projet

```
src/
├── assets/        # Ressources statiques (fonts, images, icônes)
├── components/    # Composants génériques réutilisables suivant l'Atomic Design
├── features/      # Modules métier organisés par fonctionnalité
├── lib/           # Services, utilitaires et configurations globaux
├── navigation/    # Gestion du routage et de la navigation
└── theme/         # Thème visuel global personnalisé
```

---

## Règles Principales

- La logique métier est encapsulée dans les features.
- Les composants génériques ne dépendent jamais des features spécifiques.
- Chaque feature est auto-suffisante avec ses propres hooks, services et stores.
- Les appels API sont centralisés dans les services.
- La validation des données est séparée et réutilisable.

---

## Workflow pour une Nouvelle Feature

1. Créer le dossier de la feature dans `features/` avec sa structure complète.
2. Définir les modèles spécifiques dans `models/` de la feature.
3. Implémenter les services d'API dans `services/` de la feature.
4. Créer les hooks métier dans `hooks/` de la feature.
5. Développer les composants dans `components/` de la feature.
6. Configurer le store local si nécessaire dans `store/` de la feature.
7. Ajouter les routes dans `navigation/`.

---

## Structure Détaillée

### Components (Atomic Design)

```
src/components/
├── atoms/         # Éléments de base (Button, Text, Input)
├── molecules/     # Assemblages simples (Card, Modal)
└── organisms/     # Composants complexes réutilisables
```

### Features (Modules Métier)

```
src/features/{feature}/
├── components/    # Composants spécifiques à la feature
├── hooks/         # Hooks métier de la feature
├── services/      # Services API de la feature
├── models/        # Types et interfaces de la feature
├── validation/    # Schémas de validation de la feature
├── store/         # État local de la feature
├── tests/         # Tests unitaires de la feature
└── index.ts       # Point d'entrée de la feature
```

### Lib (Services Globaux)

```
src/lib/
├── api/           # Clients API et fetchers globaux
├── config.ts      # Configuration et constantes globales
├── models/        # Types et interfaces globaux
├── services/      # Services transversaux
├── store/         # Store global (Zustand)
├── utils/         # Fonctions utilitaires pures
└── validation/    # Règles de validation globales
```

---

## Meilleures Pratiques

- Jamais d'import depuis `features` dans `components` ou `lib`.
  Cette règle existe pour éviter les dépendances circulaires et préserver l'intégrité architecturale. Les `features` encapsulent la logique métier et ne doivent pas introduire de couplage avec des composants génériques ou des services globaux, afin de maintenir une séparation claire des responsabilités et de faciliter la maintenance.
- Chaque feature doit exposer ses fonctionnalités via son `index.ts`.
- Les modèles globaux sont dans `lib/models`, les spécifiques dans `features/{feature}/models`.
- La validation suit le même principe : globale dans `lib`, spécifique dans les features.
