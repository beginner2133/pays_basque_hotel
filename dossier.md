Dossier de Projet : Hôtel du Pays Basque
Titre Professionnel de Développeur Web et Web Mobile (DWWM)

Candidat : [Votre Nom]

Date : Juillet 2025

Sommaire
Partie 1 : Analyse et Conception

Contexte et Expression des Besoins
1.1. Contexte du Projet et Enjeux Métier
1.2. Objectifs du Projet (Fonctionnels, Techniques, Normatifs)
1.3. Expression des Besoins Fonctionnels (Cas d'Utilisation)
1.4. Contraintes du Projet

Solution Technique Proposée
2.1. Présentation de l'Architecture et de la Pile Technologique
2.2. Justification des Choix Technologiques
2.3. Schéma de l'Architecture Technique

Partie 2 : Développement et Implémentation
3.  Développement de la Partie Front-end (CCP 1)
3.1. Structure et Sémantique HTML
3.2. Mise en Forme et Responsive Design (CSS)
3.3. Développement de l'Interface Dynamique (JavaScript)
4.  Développement de la Partie Back-end (CCP 2)
4.1. Modélisation et Mise en Place de la Base de Données
4.2. Développement de l'API RESTful (Flask)
4.3. Implémentation d'une Règle Métier : Tarification Saisonnière
4.4. Sécurité de l'API

Partie 3 : Qualité, Déploiement et Bilan
5.  Tests et Validation
5.1. Plan de Tests Manuels
5.2. Analyse des Résultats
6.  Infrastructure et Déploiement (CI/CD)
6.1. Orchestration avec Docker Compose
6.2. Configuration du Reverse Proxy (Nginx)
7.  Bilan du Projet et Perspectives
7.1. Difficultés Rencontrées et Solutions Apportées
7.2. Bilan des Compétences
7.3. Conclusion et Perspectives

Partie 4 : Annexes

Annexe A : Artefacts de Conception Visuels (Wireframes, Maquettes)

Annexe B : Fichiers de Configuration (docker-compose.yml, Dockerfile, nginx.conf)

Annexe C : Plan de Tests Détaillé

Partie 1 : Analyse et Conception
1. Contexte et Expression des Besoins
1.1. Contexte du Projet et Enjeux Métier
À l'ère du numérique, l'hôtellerie indépendante fait face à un défi majeur : une forte dépendance aux plateformes de réservation en ligne (OTA - Online Travel Agencies). Si ces plateformes assurent une visibilité indispensable, elles imposent des commissions élevées qui réduisent significativement les marges et privent les hôteliers de la relation directe avec leur clientèle.

Le présent projet vise à répondre à cette problématique en développant une solution web complète pour "L'Hôtel du Pays Basque". L'objectif n'est pas de créer une simple vitrine, mais un outil commercial stratégique permettant à l'établissement de :

Reprendre le contrôle de son canal de vente en internalisant le processus de réservation.

Améliorer sa rentabilité en s'affranchissant des commissions des OTA.

Maîtriser sa relation client en captant directement les données pour mieux connaître et fidéliser sa clientèle.

Valoriser son offre et son identité à travers une expérience numérique moderne et personnalisée.

L'enjeu est donc à la fois commercial, financier et relationnel : fournir à l'hôtel les moyens de son autonomie numérique.

1.2. Objectifs du Projet
Pour répondre à ces enjeux, le projet est structuré autour de trois axes d'objectifs clairs.

Objectifs Fonctionnels :

Fournir un parcours de réservation complet et fluide : consultation de l'offre, sélection des dates, visualisation des tarifs saisonniers dynamiques, et confirmation.

Mettre en valeur l'établissement et sa région à travers un blog intégré, afin d'enrichir l'expérience client.

Permettre la création de comptes utilisateurs pour le suivi et l'historique des réservations.

Objectifs Techniques :

Construire une architecture moderne et découplée (front-end et back-end indépendants) pour garantir la maintenabilité et l'évolutivité.

Assurer un déploiement robuste et reproductible grâce à la conteneurisation Docker, où chaque service (Nginx, Flask, MongoDB) est isolé et orchestré.

Développer une API RESTful sécurisée comme point de communication unique entre l'interface utilisateur et la logique métier.

Objectifs Normatifs :

Garantir la conformité avec le RGPD pour tout traitement de données à caractère personnel.

Respecter les standards d'accessibilité web (RGAA) pour rendre l'application utilisable par le plus grand nombre.

Valider les compétences techniques et transversales définies par le référentiel du Titre Professionnel DWWM.

1.3. Expression des Besoins Fonctionnels (Cas d'Utilisation)
Les fonctionnalités clés ont été formalisées sous forme de cas d'utilisation (Use Cases) pour décrire les interactions du point de vue de l'utilisateur.

Réf.

Cas d'Utilisation

Acteur(s)

Description

UC-01

Consulter les chambres

Visiteur

L'utilisateur souhaite voir la liste des chambres disponibles pour une période donnée, avec leur tarif actualisé en fonction de la saison.

UC-02

Réserver une chambre

Client

L'utilisateur sélectionne une chambre, fournit ses informations et confirme sa réservation via un paiement (simulé).

UC-03

Interagir avec le blog

Visiteur, Client

L'utilisateur consulte des articles sur la région et peut laisser des commentaires pour enrichir le contenu.

UC-04

Créer et gérer son compte

Client

L'utilisateur s'inscrit pour suivre ses réservations, gérer son profil et faciliter ses futures visites.

1.4. Contraintes du Projet
Le développement est encadré par un ensemble de contraintes qui garantissent la qualité et la robustesse de la solution finale.

Type

Contrainte

Justification et Impact sur le Projet

Technique

Architecture découplée

Impose la création d'une API RESTful stable et bien définie. Facilite la maintenance et l'évolutivité future (ex: application mobile).

Technique

Conteneurisation (Docker)

Garantit la reproductibilité des environnements (développement, test, production). Le projet est orchestré via docker-compose.

Sécurité

Hachage des mots de passe

Aucun mot de passe ne doit être stocké en clair. Utilisation de bibliothèques robustes comme werkzeug.security.

Sécurité

Prévention des failles

Le code doit être protégé contre les vulnérabilités web courantes (injections NoSQL, XSS).

Réglementaire

Conformité RGPD

Nécessite une gestion explicite du consentement et des droits des utilisateurs (accès, suppression des données).

Accessibilité

Respect des normes (RGAA)

Exige une structure HTML sémantique rigoureuse et des tests d'accessibilité.

Performance

Temps de chargement

Les requêtes à l'API et le poids des pages doivent être optimisés pour garantir une expérience utilisateur fluide.

2. Solution Technique Proposée
2.1. Présentation de l'Architecture et de la Pile Technologique
Pour répondre aux exigences définies, l'application repose sur une architecture multi-couches, découplée et conteneurisée.

Couche

Technologie

Rôle et Justification

Front-end

HTML5, CSS3, JavaScript (ES6+)

Crée une interface utilisateur interactive, accessible et responsive. Le JavaScript moderne gère les appels asynchrones à l'API via fetch.

Back-end (API)

Python 3.9 / Flask

Flask, micro-framework léger et performant, a été choisi pour développer rapidement une API RESTful claire, robuste et facile à maintenir.

Base de Données

MongoDB

Base de données NoSQL orientée document, offrant une grande flexibilité pour faire évoluer le schéma des données. Son format natif (BSON/JSON) s'intègre parfaitement avec l'API.

Serveur Web / Proxy

Nginx

Sert les fichiers statiques du front-end avec une haute performance et agit comme reverse proxy pour l'API Flask, ajoutant une couche de sécurité et de flexibilité.

Conteneurisation

Docker & Docker Compose

Isole chaque composant (Nginx, Flask, MongoDB) dans un conteneur, garantissant un environnement de déploiement homogène et simplifiant l'orchestration des services.

Tests Automatisés

Pytest & Requests

Assurent la non-régression et la qualité du code de l'API back-end de manière continue.

CI/CD

Jenkins

Automatise les processus de build, de test et de déploiement, assurant un contrôle qualité fiable et des livraisons rapides.

2.2. Justification des Choix Technologiques
La pertinence de cette pile réside dans la synergie de ses composants :

Synergie Flask & MongoDB : La légèreté de Flask et la flexibilité de MongoDB permettent de construire un back-end très efficace pour manipuler et servir des données au format JSON, sans la complexité d'un ORM traditionnel.

Découplage Front-end / Back-end : Cette séparation claire des responsabilités est fondamentale. Le front-end est un pur consommateur de l'API fournie par le back-end. Cela permet de faire évoluer les deux parties indépendamment et facilite la maintenance.

Industrialisation avec Docker : L'utilisation de Docker et Docker Compose élimine le problème classique du "ça marche sur ma machine". Elle garantit que l'environnement est identique partout, du poste de développement au serveur de production, ce qui simplifie radicalement le déploiement.

2.3. Schéma de l'Architecture Technique
Le schéma ci-dessous illustre le flux des requêtes au sein de l'architecture conteneurisée.

[Image d'un schéma d'architecture technique illustrant le flux du client vers Nginx, puis vers Flask et MongoDB]

Description du flux :

Le Client (navigateur web) envoie une requête HTTP.

Le conteneur Nginx reçoit la requête.

Si la requête concerne un fichier statique (/index.html, /style.css...), Nginx le sert directement.

Si la requête concerne l'API (/api/...), Nginx agit comme reverse proxy et la transfère au conteneur Flask.

Le conteneur Flask traite la logique métier de la requête.

Si nécessaire, l'application Flask communique avec le conteneur MongoDB pour lire ou écrire des données.

Flask renvoie une réponse (généralement en JSON) à Nginx.

Nginx transmet la réponse finale au Client.

Partie 2 : Développement et Implémentation
3. Développement de la Partie Front-end (CCP 1)
3.1. Structure et Sémantique HTML
La structure de chaque page a été construite en HTML5 en respectant la sémantique des balises (<header>, <nav>, <main>, <section>, <footer>). Cette approche est essentielle pour l'accessibilité (RGAA) et le référencement naturel (SEO).

Extrait de la structure de reservation.html :

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réservation - Hôtel du Pays Basque</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body id="page-reservation">
    <header>
        <!-- Navigation principale -->
    </header>
    <main class="container">
        <section id="search-form">
            <h1>Nos chambres & Réservation</h1>
            <!-- Formulaire de recherche de dates -->
        </section>
        <section id="room-selection" style="display:none;">
            <h2>Choisissez votre chambre</h2>
            <div id="room-container">
                <!-- Les cartes des chambres seront injectées ici par JavaScript -->
            </div>
        </section>
        <section id="payment-step" style="display:none;">
            <h2>Finalisez votre réservation</h2>
            <!-- Formulaire de paiement et récapitulatif -->
        </section>
    </main>
    <footer>
        <!-- Pied de page -->
    </footer>
    <script src="assets/script.js"></script>
</body>
</html>

3.2. Mise en Forme et Responsive Design (CSS)
L'apparence visuelle est gérée par une feuille de style externe, assurant une séparation claire entre le contenu (HTML) et la présentation (CSS). Des techniques modernes comme Flexbox sont utilisées pour créer des mises en page flexibles, et les Media Queries garantissent une adaptation parfaite sur tous les écrans.

Extrait de style.css :

/* Grille de présentation des chambres utilisant Flexbox */
#room-container {
    display: flex;
    flex-wrap: wrap; /* Permet aux éléments de passer à la ligne */
    justify-content: center;
    gap: 20px; /* Espace entre les cartes de chambre */
}

.card {
    border: 1px solid #ddd;
    border-radius: 8px;
    width: 300px;
    /* ... autres styles ... */
}

/* Media Query pour les écrans mobiles */
@media (max-width: 768px) {
    #room-container {
        flex-direction: column; /* Affiche les chambres en colonne */
        align-items: center;
    }
}

3.3. Développement de l'Interface Dynamique (JavaScript)
L'interactivité repose sur la communication asynchrone entre le front-end et le back-end. Le script script.js utilise l'API fetch pour envoyer des requêtes au serveur sans recharger la page. La réponse de l'API (au format JSON) est ensuite utilisée pour manipuler le DOM et mettre à jour l'affichage.

Extrait de script.js montrant la récupération et l'affichage des chambres :

// Extrait de la fonction initReservationPage()
searchBtn.addEventListener('click', () => {
    const checkin = document.getElementById('checkin').value;
    // ... validation des dates ...

    // Communication asynchrone avec l'API
    fetch(`/api/chambres?checkin=${checkin}`)
        .then(res => res.json()) // Conversion de la réponse en JSON
        .then(chambres => {
            roomContainer.innerHTML = ''; // Vide le conteneur

            // Boucle sur chaque chambre pour créer et afficher sa carte HTML
            chambres.forEach(chambre => {
                roomContainer.innerHTML += `
                    <div class="card">
                        <img src="${chambre.image}" alt="${chambre.nom}">
                        <div class="card-content">
                            <h3>${chambre.nom}</h3>
                            <p class="price">${chambre.prix_saisonnier}€ / nuit</p>
                            <button class="btn" onclick="selectRoom('${chambre.nom}', ${chambre.prix_saisonnier})">
                                Choisir
                            </button>
                        </div>
                    </div>`;
            });
        });
});

4. Développement de la Partie Back-end (CCP 2)
4.1. Modélisation et Mise en Place de la Base de Données
Le choix s'est porté sur MongoDB pour sa flexibilité. La modélisation logique décrit la structure des documents au sein de chaque collection.

Collection chambres : Stocke les informations sur les chambres.

{
  "_id": "ObjectId",
  "nom": "Suite Supérieure Vue Mer",
  "prix_basse_saison": 150,
  "prix_haute_saison": 200,
  "image": "assets/images/suite.jpg"
}

Collection reservations : Enregistre les réservations confirmées.

{
  "_id": "ObjectId",
  "chambre": "Suite Supérieure Vue Mer",
  "checkin": "2025-08-15",
  "checkout": "2025-08-20",
  "montant": 200,
  "email": "client@example.com"
}

Collection users : Gère les comptes utilisateurs.

{
  "_id": "ObjectId",
  "username": "testuser",
  "password": "hash_securise_avec_werkzeug"
}

Un script d'initialisation (init_db.py) a été créé pour peupler la base avec un jeu de données minimal au premier lancement.

4.2. Développement de l'API RESTful (Flask)
L'API a été conçue selon les principes RESTful, exposant les fonctionnalités via des points de terminaison (endpoints) clairs.

GET /api/chambres : Pour lire la liste des chambres disponibles avec le tarif saisonnier.

POST /api/reservation : Pour enregistrer une nouvelle réservation.

POST /api/register : Pour créer un nouvel utilisateur.

GET /api/posts : Pour lire la liste des articles du blog.

POST /api/posts/<id>/comments : Pour ajouter un commentaire à un article.

4.3. Implémentation d'une Règle Métier : Tarification Saisonnière
Une règle métier est la traduction d'une règle de gestion en code. L'exemple représentatif est le calcul du prix des chambres en fonction de la saisonnalité (haute ou basse saison), géré entièrement côté serveur pour garantir la cohérence et la sécurité.

Extrait de app.py montrant la logique métier :

from datetime import datetime
from flask import request, jsonify

def is_haute_saison(checkin_str):
    """Vérifie si une date est en haute saison (ex: Juin, Juillet, Août)."""
    try:
        checkin_date = datetime.strptime(checkin_str, '%Y-%m-%d')
        return checkin_date.month in [6, 7, 8]
    except (ValueError, TypeError):
        return False # Par défaut, basse saison si la date est invalide

@app.route('/api/chambres', methods=['GET'])
def get_chambres_avec_prix():
    checkin_str = request.args.get('checkin')
    haute_saison = is_haute_saison(checkin_str)

    chambres_a_jour = []
    for chambre in db.chambres.find({}, {'_id': 0}):
        if haute_saison:
            chambre['prix_saisonnier'] = chambre['prix_haute_saison']
        else:
            chambre['prix_saisonnier'] = chambre['prix_basse_saison']
        chambres_a_jour.append(chambre)
    
    return jsonify(chambres_a_jour)

4.4. Sécurité de l'API
La sécurité est une priorité. Aucun mot de passe n'est stocké en clair. La bibliothèque Werkzeug (incluse avec Flask) est utilisée pour appliquer un algorithme de hachage robuste.

Extrait de la route d'enregistrement POST /api/register :

from werkzeug.security import generate_password_hash

@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Nom d'utilisateur et mot de passe requis"}), 400

    # Hacher le mot de passe avant de le stocker
    hashed_password = generate_password_hash(password)
    db.users.insert_one({
        "username": username,
        "password": hashed_password
    })

    return jsonify({"message": "Utilisateur créé avec succès"}), 201

Partie 3 : Qualité, Déploiement et Bilan
5. Tests et Validation
5.1. Plan de Tests Manuels
Pour vérifier le bon fonctionnement des fonctionnalités clés, un plan de tests manuels a été exécuté.

Cas de Test

Étapes de Reproduction

Résultat Attendu

T-01 : Scénario Nominal

1. Sélectionner une date en haute saison. 2. Choisir une chambre. 3. Remplir le formulaire avec un email valide. 4. Cliquer sur "Confirmer".

Le tarif "haute saison" s'affiche. Un message de succès apparaît. Une nouvelle réservation est visible dans la base de données.

T-02 : Scénario d'Erreur

1. Tenter de confirmer une réservation sans remplir le champ email.

Un message d'erreur s'affiche, indiquant que le champ est obligatoire. La réservation n'est pas créée.

T-03 : Test Responsive

1. Afficher le site sur un ordinateur. 2. Utiliser les outils de développement pour simuler un affichage mobile. 3. Naviguer sur les pages.

Le site s'affiche correctement sur mobile. Le menu se transforme. Le contenu est lisible et les éléments ne se chevauchent pas.

5.2. Analyse des Résultats
Les résultats observés lors des tests manuels correspondent parfaitement aux résultats attendus. Le déroulement a montré que :

La communication front-end / back-end est fonctionnelle.

La logique métier de tarification saisonnière est correctement appliquée.

La validation des formulaires côté client est efficace.

Les données sont bien enregistrées en base de données.

6. Infrastructure et Déploiement (CI/CD)
6.1. Orchestration avec Docker Compose
Le fichier docker-compose.yml orchestre le lancement, la configuration et la liaison des trois services (Nginx, Flask, MongoDB). Il garantit que l'infrastructure est définie comme du code, ce qui la rend portable et facile à gérer. (Voir Annexe B pour le fichier complet).

6.2. Configuration du Reverse Proxy (Nginx)
Le fichier nginx.conf configure Nginx pour qu'il serve les fichiers statiques du front-end et agisse comme un reverse proxy, redirigeant toutes les requêtes commençant par /api vers le service back-end Flask. (Voir Annexe B pour le fichier complet).

7. Bilan du Projet et Perspectives
7.1. Difficultés Rencontrées et Solutions Apportées
Difficulté : La courbe d'apprentissage de l'orchestration multi-conteneurs avec Docker Compose, notamment la configuration du réseau interne pour que les conteneurs communiquent entre eux.

Solution : Un débogage méthodique des fichiers de configuration, l'utilisation intensive des logs (docker-compose logs) et la consultation de la documentation officielle pour comprendre les notions de depends_on et des noms d'hôtes réseau internes à Docker.

7.2. Bilan des Compétences
Ce projet a été l'occasion de mettre en œuvre et de valider un large éventail de compétences techniques et transversales :

Conception et modélisation (MCD, architecture).

Développement Front-end (HTML, CSS, JS, DOM, AJAX).

Développement Back-end (Python, Flask, API RESTful).

Gestion de base de données (MongoDB, CRUD).

Infrastructure et déploiement (Docker, Nginx).

Résolution de problèmes, apprentissage continu et communication technique.

7.3. Conclusion et Perspectives
Ce projet a été une expérience formatrice complète, de l'analyse du besoin à la conception, jusqu'au déploiement conteneurisé. Il constitue un socle solide sur lequel je vais continuer à construire.

Les perspectives d'évolution sont nombreuses :

Fonctionnelles : Mettre en place un véritable back-office d'administration pour gérer les chambres et les réservations, intégrer une solution de paiement réelle (Stripe), développer un système de newsletter.

Techniques : Approfondir la sécurité de l'API (authentification JWT), mettre en place un pipeline CI/CD complet avec Jenkins pour automatiser les tests et les déploiements, et explorer le développement d'une application mobile native consommant la même API.

Partie 4 : Annexes
Annexe A : Artefacts de Conception Visuels
(Cette section contiendrait les wireframes et les maquettes graphiques finales de l'application.)

Annexe B : Fichiers de Configuration
(Cette section contiendrait le code complet des fichiers docker-compose.yml, Dockerfile et nginx.conf.)

Annexe C : Plan de Tests Détaillé
(Cette section contiendrait le tableau exhaustif de tous les cas de tests manuels exécutés.)