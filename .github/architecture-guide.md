# Architecture et Guide de Contribution Front-End

Ce projet suit les principes d'une architecture modulaire par features, avec une séparation claire des responsabilités et une approche Atomic Design pour les composants, en respectant les principes SOLID pour garantir un code maintenable et évolutif. 

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

## Principes SOLID Appliqués

### Single Responsibility Principle (SRP)

Chaque composant, hook ou service ne doit avoir qu'une seule responsabilité.

**Règles d'implémentation :**
- Un composant = une responsabilité unique et bien définie
- Séparation entre hooks métier (logique) et hooks d'interface (UI)
- Un service par domaine fonctionnel

**Exemple :**
```tsx
// Violation SRP
const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const fetchUser = async () => { /* logique API */ };
  
  return (
    <div>
      {/* logique d'affichage complexe */}
    </div>
  );
};

// Respect SRP
const UserProfile = () => {
  const { user, loading } = useUser();
  return <UserDisplay user={user} loading={loading} />;
};

const UserDisplay = ({ user, loading }) => {
  if (loading) return <LoadingSpinner />;
  return <div>{user?.name}</div>;
};
```

### Open/Closed Principle (OCP)

Les composants doivent être ouverts à l'extension mais fermés à la modification.

**Règles d'implémentation :**
- Utilisation de providers et de composition
- Props configurables pour l'extension
- Patterns render props et children pour l'extensibilité

**Exemple :**
```tsx
const DataTable = ({ 
  data, 
  columns, 
  renderRow, 
  renderEmpty,
  onSort,
  onFilter 
}) => {
  return (
    <table>
      <thead>{/* headers */}</thead>
      <tbody>
        {data.length === 0 
          ? renderEmpty?.() 
          : data.map(item => renderRow(item))
        }
      </tbody>
    </table>
  );
};
```

### Liskov Substitution Principle (LSP)

Les composants enfants doivent pouvoir remplacer leurs parents sans casser l'application.

**Règles d'implémentation :**
- Interfaces TypeScript cohérentes
- Props contracts respectés
- Comportements prévisibles

**Exemple :**
```tsx
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const PrimaryButton: React.FC<ButtonProps> = (props) => { /* */ };
const SecondaryButton: React.FC<ButtonProps> = (props) => { /* */ };
const DangerButton: React.FC<ButtonProps> = (props) => { /* */ };
```

### Interface Segregation Principle (ISP)

Ne pas forcer les composants à dépendre d'interfaces qu'ils n'utilisent pas.

**Règles d'implémentation :**
- Props minimales et spécifiques
- Interfaces séparées par responsabilité
- Éviter les "god props"

**Exemple :**
```tsx
// Violation ISP
const UserAvatar = ({ user }: { user: FullUser }) => {
  return <img src={user.avatar} alt={user.name} />;
};

// Respect ISP
interface AvatarProps {
  avatar: string;
  name: string;
}

const UserAvatar = ({ avatar, name }: AvatarProps) => {
  return <img src={avatar} alt={name} />;
};
```

### Dependency Inversion Principle (DIP)

Dépendre d'abstractions, pas d'implémentations concrètes.

**Règles d'implémentation :**
- Injection de dépendances via props
- Hooks abstraits pour la logique métier
- Services injectables

**Attention : Dépendances cachées**

Le piège le plus courant est d'avoir des dépendances fixes dans les composants même après injection de services.

```tsx
// Violation DIP - dépendance fixe
const TodoListWidget = ({ fetchCallback }) => {
  const [todos, setTodos] = useState([]);
  return <TodoListItems todos={todos} />; // Composant fixe
};

// Respect DIP - vraie substitution
const TodoListWidget = ({ 
  fetchCallback, 
  customListItemProvider,
  customListProvider 
}) => {
  const [todos, setTodos] = useState([]);
  
  const handleAddTodo = (newTodo) => setTodos([...todos, newTodo]);
  const handleDeleteTodo = (id) => setTodos(todos.filter(t => t.id !== id));
  
  useEffect(() => {
    fetchCallback().then(setTodos);
  }, [fetchCallback]);
  
  return (
    <div>
      <h1>Todo List Widget</h1>
      {customListProvider(todos, handleDeleteTodo, customListItemProvider)}
    </div>
  );
};
```

---

## Règles Principales

- Chaque composant respecte les 5 principes SOLID
- La logique métier est encapsulée dans les features
- Les composants génériques ne dépendent jamais des features spécifiques
- Chaque feature est auto-suffisante et extensible
- Les appels API sont centralisés dans les services
- La validation des données est séparée et réutilisable

---

## Workflow pour une Nouvelle Feature

1. Analyser les responsabilités selon le principe SRP
2. Créer le dossier de la feature dans `features/` avec sa structure complète
3. Définir les interfaces TypeScript dans `models/` (ségrégation)
4. Implémenter les services abstraits dans `services/` (inversion de dépendance)
5. Créer les hooks métier dans `hooks/` (responsabilité unique)
6. Développer les composants composables dans `components/` (ouverture/fermeture)
7. Configurer le store local si nécessaire dans `store/`
8. Ajouter les routes dans `navigation/`
9. Valider que tous les composants respectent la substitution de Liskov

---

## Structure Détaillée

### Components (Atomic Design + SOLID)

```
src/components/
├── atoms/         # Éléments de base
│   ├── Button/    # Props minimales, extensible via composition
│   ├── Input/     # Interface claire, comportement prévisible
│   └── Text/      # Responsabilité unique d'affichage
├── molecules/     # Assemblages simples
│   ├── Card/      # Composition d'atoms, props configurables
│   └── Modal/     # Ouvert à l'extension via children/renderProps
└── organisms/     # Composants complexes réutilisables
    ├── DataTable/ # Inversion de dépendance via render props
    └── UserList/  # Abstraction des sources de données
```

### Features (Modules Métier + SOLID)

```
src/features/{feature}/
├── components/    # Composants spécifiques à la feature
│   ├── {Feature}Container.tsx    # Orchestration (inversion de dépendance)
│   ├── {Feature}List.tsx         # Affichage seul (responsabilité unique)
│   └── {Feature}Item.tsx         # Composant substitutable
├── hooks/         # Hooks métier de la feature
│   ├── use{Feature}.ts           # Logique métier abstraite
│   └── use{Feature}Api.ts        # Gestion des données
├── services/      # Services API de la feature
│   ├── {feature}Service.ts       # Interface abstraite
│   └── {feature}ApiService.ts    # Implémentation concrète
├── models/        # Types et interfaces de la feature
│   ├── {feature}.types.ts        # Interfaces ségrégées
│   └── {feature}.contracts.ts    # Contrats pour substitution
├── validation/    # Schémas de validation de la feature
├── store/         # État local de la feature
├── tests/         # Tests unitaires de la feature
└── index.ts       # Point d'entrée de la feature
```

### Lib (Services Globaux + SOLID)

```
src/lib/
├── api/           # Clients API et fetchers globaux
│   ├── apiClient.ts      # Interface abstraite
│   └── httpClient.ts     # Implémentation HTTP
├── config.ts      # Configuration et constantes globales
├── models/        # Types et interfaces globaux
│   ├── common.types.ts   # Types partagés
│   └── api.contracts.ts  # Contrats API
├── services/      # Services transversaux
│   ├── storage/          # Abstraction du stockage
│   └── notification/     # Service de notifications
├── store/         # Store global (Zustand/Redux)
├── utils/         # Fonctions utilitaires pures
└── validation/    # Règles de validation globales
```

---

## Patterns Recommandés

### Provider Pattern avec Vraie Substitution

```tsx
const FeatureWidget = ({ 
  apiService,
  listProvider,
  itemProvider,
  emptyProvider 
}) => {
  const { data, loading } = useFeatureData(apiService);
  
  if (loading) return <LoadingSpinner />;
  if (!data?.length) return emptyProvider();
  
  return (
    <div>
      {listProvider(data, itemProvider)}
    </div>
  );
};
```

### Composition Pattern

```tsx
const DataList = ({ children, data, renderEmpty }) => {
  if (!data?.length) return renderEmpty?.();
  return <div>{children}</div>;
};
```

### Custom Hook Pattern

```tsx
const useUserData = (apiService: ApiService) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiService.getUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  }, [apiService]);
  
  return { users, loading, fetchUsers };
};
```

---

## Checklist de Validation SOLID

Lors des code reviews, vérifier :

### SRP (Single Responsibility)
- [ ] Le composant a-t-il une seule responsabilité clairement définie ?
- [ ] La logique métier est-elle séparée de la logique d'affichage ?

### OCP (Open/Closed)
- [ ] Peut-on étendre le comportement sans modifier le code existant ?
- [ ] Les nouvelles fonctionnalités passent-elles par des props ou des providers ?

### LSP (Liskov Substitution)
- [ ] Les composants respectent-ils les mêmes interfaces que leurs abstractions ?
- [ ] Peut-on substituer un composant par un autre sans casser l'application ?

### ISP (Interface Segregation)
- [ ] Le composant reçoit-il uniquement les props dont il a besoin ?
- [ ] Les interfaces sont-elles spécifiques et minimales ?

### DIP (Dependency Inversion)
- [ ] Le composant dépend-il d'abstractions plutôt que d'implémentations ?
- [ ] Y a-t-il des dépendances fixes cachées dans le code ?
- [ ] Tous les sous-composants peuvent-ils être substitués ?

---

## Erreurs Courantes

### Dépendances Fixes Cachées

```tsx
// Problème : TodoList est fixe même avec injection de dépendance
const TodoWidget = ({ fetchCallback }) => {
  const [todos, setTodos] = useState([]);
  return <TodoList todos={todos} onAdd={handleAdd} />;
};
```

### Responsabilités Multiples

```tsx
// Problème : gestion des données ET affichage dans le même composant
const UserComponent = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = () => { /* API call */ };
  
  return (
    <div>
      {/* Complex rendering logic */}
    </div>
  );
};
```

### Props Trop Larges

```tsx
// Problème : le composant reçoit tout l'objet user
const UserAvatar = ({ user }) => {
  return <img src={user.avatar} alt={user.name} />;
};
```

---
