# BrainBox

## Présentation

BrainBox est une application de gestion de connaissances développée dans le cadre d'un projet pédagogique.

L'objectif est de permettre à un utilisateur de constituer progressivement sa propre base de connaissances (notes, extraits de code, procédures, documentations, bonnes pratiques, etc.) et de pouvoir l'interroger en langage naturel grâce à une intelligence artificielle exécutée localement.

Contrairement à un assistant IA classique, BrainBox ne s'appuie pas sur les connaissances générales du modèle. Chaque réponse est générée uniquement à partir des informations enregistrées dans la base de connaissances. Si les informations disponibles sont insuffisantes, l'assistant indique explicitement qu'il ne possède pas la réponse.

---

# Architecture du projet

Le projet est composé de quatre services distincts :

* **Frontend** : Angular
* **Backend** : Node.js / Express
* **Base de données** : MongoDB Atlas
* **Assistant IA** : Ollama exécutant le modèle Qwen3:8B

Le frontend communique uniquement avec l'API Express.

L'API est responsable de :

* la gestion des connaissances,
* la communication avec MongoDB Atlas,
* la construction du prompt,
* la communication avec Ollama,
* le retour de la réponse au frontend.

Cette séparation des responsabilités permet de faire évoluer facilement l'application (authentification, plusieurs utilisateurs, nouveaux modèles IA...).

---

# Fonctionnalités

L'application permet :

* Ajouter une connaissance
* Modifier une connaissance
* Supprimer une connaissance
* Consulter une connaissance
* Lister l'ensemble des connaissances
* Rechercher des connaissances
* Interroger un assistant IA en langage naturel

Chaque connaissance contient :

* un titre,
* un contenu,
* une catégorie,
* une liste de tags,
* une date de création,
* une date de modification (lorsqu'elle existe).

---

# Prérequis

Avant de lancer le projet, les outils suivants doivent être installés :

* Docker Desktop
* Docker Compose
* Node.js (version 20 ou supérieure recommandée)
* Angular CLI
* Git
* MongoDB Compass
* Un compte MongoDB Atlas
* Ollama(ou utilisation du conteneur Docker prévu)

Le backend utilise le **driver officiel MongoDB pour Node.js**.

---

# Installation

## 1. Cloner le dépôt

```bash
git clone <https://github.com/FloR3473/Brainbox.git>

cd BrainBox
```

## 2. Installer les dépendances

### Backend

Se placer dans le dossier du backend :

```bash
cd Back
```

Installer les dépendances du projet :

```bash
npm install
```

Si nécessaire, installer le driver officiel MongoDB :

```bash
npm install mongodb
```

### Frontend

Se placer dans le dossier du frontend :

```bash
cd ../Front
```

Installer les dépendances :

```bash
npm install
```

---

# Configuration de MongoDB Atlas

## 1. Créer un cluster

Depuis votre compte MongoDB Atlas :

* créer un nouveau cluster ;
* créer un utilisateur disposant des droits de lecture et d'écriture ;
* configurer les accès réseau (**Network Access**) en autorisant votre adresse IP (ou `0.0.0.0/0` pour un environnement de développement).

---

## 2. Récupérer l'URI de connexion

Dans MongoDB Atlas :

```
Connect
→ Drivers
→ Node.js
```

Copiez l'URI de connexion fournie par Atlas.

Exemple :

```text
mongodb+srv://<username>:<password>@cluster.mongodb.net/
```

---

## 3. Configurer les variables d'environnement

Créer le fichier :

```
Back/.env
```

Puis renseigner les variables suivantes :

```env
MONGODB_USERNAME="nom_utilisateur"

MONGODB_PASSWORD="mdp"

MONGODB_URI=<votre_uri_mongodb>

MONGODB_DB=<nom_de_la_base>

MONGODB_COLLECTION=<nom_de_la_collection>

OLLAMA_URL=http://ollama:11434/api/generate

OLLAMA_MODEL=qwen3:8b
```

---

## 4. Connexion avec MongoDB Compass

MongoDB Compass permet de visualiser facilement les documents enregistrés par BrainBox.

Au premier lancement :

1. Ouvrir **MongoDB Compass**.
2. Cliquer sur **New Connection**.
3. Coller l'URI de connexion MongoDB Atlas utilisée dans le fichier `.env`.
4. Cliquer sur **Connect**.

Une fois connecté :

* sélectionner la base de données définie par `MONGODB_DB` ;
* ouvrir la collection définie par `MONGODB_COLLECTION`.

Vous pourrez alors consulter les connaissances ajoutées, modifiées ou supprimées directement depuis l'interface graphique de MongoDB Compass, ce qui facilite les phases de développement et de débogage.

---

# Lancement d'Ollama

BrainBox utilise Ollama afin d'exécuter un modèle de langage local.

Télécharger le modèle :

```bash
ollama pull qwen3:8b
```

Vérifier les modèles installés :

```bash
ollama list
```

Le projet prévoit également l'exécution d'Ollama dans un conteneur Docker via le fichier `docker-compose.yml`.

L'accélération GPU NVIDIA est activée grâce à la configuration suivante :

```yaml
deploy:
  resources:
    reservations:
      devices:
        - driver: nvidia
          count: 1
          capabilities:
            - gpu
```

Cette configuration permet à Ollama d'utiliser le GPU lorsque celui-ci est disponible afin d'améliorer les performances d'inférence.

---

# Lancement de l'application

Depuis la racine du projet :

```bash
docker compose up -d --build
```

Les services démarrés sont :

| Service          | Port  |
| ---------------- | ----- |
| Frontend Angular | 4200  |
| Backend Express  | 9000  |
| Ollama           | 11434 |

L'application est ensuite accessible à l'adresse :

```
http://localhost:4200
```

---

# Routes disponibles

## Connaissances

### Obtenir toutes les connaissances

```
GET /knowledge
```

---

### Obtenir une connaissance

```
GET /knowledge/:id
```

---

### Ajouter une connaissance

```
POST /knowledge
```

Body :

```json
{
    "title":"Angular",
    "content":"...",
    "category":"Développement",
    "tags":"Angular,TypeScript"
}
```

---

### Modifier une connaissance

```
PUT /knowledge/:id
```

Body :

```json
{
    "title":"...",
    "content":"...",
    "category":"...",
    "tags":"..."
}
```

---

### Supprimer une connaissance

```
DELETE /knowledge/:id
```

---

## Assistant IA

### Poser une question

```
POST /assistant
```

Body :

```json
{
    "question":"Comment fonctionne Angular ?"
}
```

Lorsqu'une question est envoyée :

1. le frontend transmet la question à l'API,
2. l'API extrait les mots-clés de la question,
3. les connaissances correspondantes sont recherchées dans MongoDB,
4. l'API construit un prompt contenant uniquement ces connaissances,
5. le prompt est envoyé à Ollama,
6. la réponse est renvoyée au frontend.

Si aucune connaissance pertinente n'est trouvée, l'assistant indique qu'il ne possède pas suffisamment d'informations pour répondre.

---

# Modèle IA utilisé

BrainBox utilise le modèle **Qwen3:8B** exécuté localement grâce à **Ollama**.

Le choix de ce modèle répond aux contraintes définies pour le projet : l'assistant doit fonctionner localement, rester suffisamment léger pour être exécuté sur un poste de développement classique et produire des réponses uniquement à partir des connaissances enregistrées par l'utilisateur. Il répond également aux contraintes matérielles liées aux ressources disponibles sur la machine de développement.

BrainBox utilise une approche de type **RAG (Retrieval Augmented Generation)**. Le modèle n'est donc pas utilisé comme une source de connaissances générale. Avant chaque requête, l'API recherche les informations pertinentes dans MongoDB Atlas, construit un prompt contenant uniquement ces connaissances, puis transmet ce contexte à Ollama. Le rôle du modèle est ensuite d'analyser ces informations et de générer une réponse cohérente.

Qwen3:8B a été choisi car il offre un bon équilibre entre :
- **compréhension du langage naturel** : le modèle est capable d'interpréter des questions formulées de différentes manières et de faire le lien avec les connaissances enregistrées pour ensuite générer des réponses cohérentes,
- **capacité de synthèse** : il peut reformuler et organiser les informations fournies dans le contexte ;
- **rapidité d'exécution** : sa taille permet une utilisation locale avec des ressources limitées ;
- **confidentialité** : aucune donnée utilisateur n'est envoyée vers un service d'intelligence artificielle externe.

La configuration matérielle utilisée pour le développement étant :
- Processeur : **11th Gen Intel(R) Core(TM) i7-11800H @ 2.30GHz**
- Mémoire RAM : **16Go**
- Carte graphique : **NVIDIA GeForce RTX 3070 Laptop GPU**

Qwen3:8B constitue donc un choix adapté à cette configuration, tout en respectant la contrainte du projet demandant un modèle suffisamment léger pour fonctionner sur un poste de développement.

Un modèle plus volumineux aurait pu apporter de meilleures performances générales, mais il aurait nécessité davantage de ressources matérielles et n'aurait pas été forcément pertinent pour BrainBox. En effet, la qualité des réponses dépend principalement de la pertinence des connaissances retrouvées dans MongoDB et de la construction du prompt par l'API.

---

# Technologies utilisées

* Angular
* TypeScript
* Node.js
* Express
* MongoDB Atlas
* Driver officiel MongoDB
* Ollama
* Qwen3:8B
* Docker
* Git