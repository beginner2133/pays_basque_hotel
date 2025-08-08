# PAYS BASQUE HOTEL – Application Web

Je présente ici mon projet de site web pour l’Hôtel du Pays Basque 
Un App Web moderne avec un système de réservation internalisé, entièrement conteneurisé & déployé via Docker, Jenkins & Nginx


## Table des matières

1. [Fonctionnalités](#fonctionnalités)  
2. [Stack technique](#stack-technique)  
3. [Architecture et déploiement](#architecture-et-déploiement)  
4. [Prérequis](#prérequis)  
5. [Installation et lancement](#installation-et-lancement)  
6. [Structure du projet](#structure-du-projet)  
7. [Tests](#tests)  
8. [CI/CD avec Jenkins](#cicd-avec-jenkins)  
9. [Configuration Nginx](#configuration-nginx)  
10. [Contribuer](#contribuer)  

## Fonctionnalités

- Consultation de l’offre de l’hôtel  
- Réservation de chambre avec sélection de dates & paiement "simulé"  
- Création & gestion de compte utilisateur  
- Lecture & commentaire d’articles de blog  
- Pages statiques => CGU, mentions légales, plan de tests, annexes  
- Responsive design & conformité RGAA  

## Stack technique

- Front-end : HTML5, CSS3, JavaScript (ES6)  
- Back-end : Python 3.9 + Flask (API RESTful)  
- Base de données => MongoDB (conteneurs Docker)  
- Serveur d’application => Gunicorn  
- Reverse proxy => Nginx  
- Conteneurisation => Docker & Docker Compose  
- Tests => Pytest (back-end), outils JS à venir pour le front-end  
- Intégration continue => Jenkins  


## Architecture & déploiement

1. Docker Compose orchestre trois services :  
   - **frontend** (site statique servi par Nginx)  
   - **backend** (API Flask + Gunicorn)  
   - **mongodb** (stockage NoSQL)  

2. Jenkins déclenche les builds :  
   - Construction des images Docker  
   - Exécution des suites de tests  
   - Déploiement automatique sur l’environnement de staging  

3. Nginx joue le rôle de reverse proxy & de serveur de fichiers statiques, sécurisé par mes configurations personnalisées


## Prérequis

- Docker (>= 20.10) & Docker Compose  
- Git  
- Accès à un runner Jenkins (optionnel localement)  
- (Optionnel) Python 3.9 pour tests hors conteneur  


## Installation & lancement

1. Clonez le dépôt :  
   ```bash
   git clone https://github.com/beginner2133/pays_basque_hotel.git
   cd pays_basque_hotel
   ```

2. Copiez le fichier d’exemple d’environnement & ajustez les variables si nécessaire :  
   ```bash
   cp .flaskenv.example .flaskenv
   ```

3. Démarrez les services :  
   ```bash
   docker-compose up --build
   ```

4. Accédez à l’application :  
   - Front-end : http://localhost  
   - API : http://localhost:5000/api  


## Structure du projet

```text
pays_basque_hotel/
├── backend/
│   ├── .venv/                  # Environnement virtuel (optionnel)
│   ├── tests/                  # Tests Pytest
│   ├── .flaskenv               # Variables d’environnement Flask
│   ├── app.py                  # Point d’entrée de l’API
│   ├── Dockerfile              # Image backend
│   └── requirements.txt        # Dépendances Python
│
├── frontend/
│   ├── assets/                 # Images, styles, scripts
│   ├── index.html              # Page d’accueil
│   ├── reservation.html        # Page de réservation
│   ├── blog.html               # Blog et commentaires
│   ├── cgu.html                # Conditions générales
│   ├── annexes.html            # Annexes du projet
│   ├── plan_de_tests.html      # Scénarios de tests
│   ├── schema.html             # Schémas de conception
│   └── workflow.html           # Diagrammes de workflow
│
├── docker-compose.yml          # Orchestration des conteneurs
├── nginx.conf                  # Configuration Nginx  
├── Jenkinsfile                 # Pipeline CI/CD  
├── .gitignore  
└── dossier.md                  # Dossier complet du projet => README.PBH.md
```

## Tests

- Dans le conteneur **backend**, je lance :  
  ```bash
  pytest --maxfail=1 --disable-warnings -q
  ```
- J’ai prévu des tests unitaires pour chaque route CRUD & des fixtures pour MongoDB
- À terme, j’introduirai des tests JavaScript (Jest ou Mocha) pour le front-end


## CI/CD avec Jenkins

1. **Build** les images front/backend  
2. **Test** back-end via Pytest  
3. **Push** éventuel vers un registry Docker  
4. **Déploiement** sur l’environnement de staging  
5. **Notification** des résultats par e-mail ou Slack  

mon `Jenkinsfile` décrit chaque étape et les enchaînements conditionnels


## Configuration Nginx

- **Reverse proxy** vers le backend (`/api/`)  
- **Cache** des assets statiques  
- **Redirections** HTTPS (à ajouter si certificat SSL)  
- Fichier principal : `nginx.conf`


## Contribuer (si vous le voulez, & laisser un commentaire ....positif et/ou constructif)
## Soyez bienveillant, sinon passez votre chemin !!
Je suis ouvert à toute amélioration :  
- Proposer des tests front-end  
- Optimiser les performances & le SEO  
- Ajouter des fonctionnalités (chat, notifications)  

1. Forkez le projet  
2. Créez une branche feature  
3. Ouvrez une Pull Request  

Merci de votre intérêt & bonne découverte !

