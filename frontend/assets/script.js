/**
 * @file script.js
 * @description Ce fichier contient toute la logique JavaScript côté client pour l'application "L'Hôtel du Pays Basque".
 * Il gère l'initialisation des pages, l'interaction avec l'utilisateur et la communication avec l'API back-end.
 */

// Point d'entrée principal du script. S'exécute une fois que toute la page HTML est chargée.
document.addEventListener('DOMContentLoaded', () => {
    // Récupère l'ID de la balise <body> pour savoir sur quelle page nous sommes.
    const pageId = document.body.id;

    // Aiguillage : appelle la fonction d'initialisation correspondante à la page actuelle.
    if (pageId === 'page-reservation') {
        initReservationPage();
    }
    if (pageId === 'page-blog') {
        initBlogPage();
    }
});

/**
 * ici s'initialise ttes les fonctionnalités de la page de résa
 */
function initReservationPage() {
    // récupération des éléments du DOM (Document Object Model) nécessaires
    const searchBtn = document.getElementById('search-rooms-btn');
    if (!searchBtn) return; // sécurité => si on n'est pas sur la bonne page, on arrête

    const roomSelectionDiv = document.getElementById('room-selection');
    const roomContainer      = document.getElementById('room-container');
    const paymentStepDiv     = document.getElementById('payment-step');
    const paymentSummary     = document.getElementById('payment-summary');
    const payBtn             = document.getElementById('pay-btn');
    
    // l'objet qui stockera les détails de la résa en cours
    let reservationDetails   = {};

    // ajout d'un écouteur d'événement sur le clic du bouton => recherche
    searchBtn.addEventListener('click', () => {
        // récupération des dates sélectionnées par le user
        const checkin  = document.getElementById('checkin').value;
        const checkout = document.getElementById('checkout').value;

        // validation pour s'assurer que les dates sont bien renseignées
        if (!checkin || !checkout) {
            alert("Veuillez sélectionner une date d'arrivée et de départ.");
            return;
        }

        // stockage des dates pour les étapes suivantes
        reservationDetails = { checkin, checkout };

        // affiche un message de chargement & rend la section des chambres visible
        roomContainer.innerHTML        = `<p>Chargement des chambres...</p>`;
        roomSelectionDiv.style.display = 'block';

        // communication asynchrone avec l'API back-end pour récupérer les chambres disponibles
        fetch(`/api/chambres?checkin=${checkin}`)
            .then(res => res.json()) // conversion de la réponse en format JSON
            .then(chambres => {      // traitement du tableau de chambres reçu
                roomContainer.innerHTML = ''; // nettoyage du message de chargement

                // boucle sur chq chambre pour créer & afficher sa "carte" HTML
                chambres.forEach(chambre => {
                    // utilisation du nom de champ 'prix_saisonnier'
                    roomContainer.innerHTML += `
                        <div class="card">
                            <img src="${chambre.image}" alt="${chambre.nom}">
                            <div class="card-content">
                                <h3>${chambre.nom}</h3>
                                <p class="price">${chambre.prix_saisonnier}€ / nuit</p>
                                <button class="btn"
                                    onclick="selectRoom('${chambre.nom}', ${chambre.prix_saisonnier})">
                                    Choisir
                                </button>
                            </div>
                        </div>`;
                });
            });
    });

    /**
     * Fonction appelée lorsqu'un utilisateur clique sur le bouton "Choisir" d'une chambre.
     * @param {string} nom - Le nom de la chambre sélectionnée.
     * @param {number} prix - Le prix saisonnier de la chambre.
     */
    window.selectRoom = (nom, prix) => {
        // Stockage des détails de la chambre sélectionnée.
        reservationDetails.chambre = nom;
        reservationDetails.montant = prix;

        // Construction du récapitulatif de la commande en HTML.
        paymentSummary.innerHTML = `
            <h3>Récapitulatif</h3>
            <p><strong>Chambre:</strong> ${nom}</p>
            <p><strong>Arrivée:</strong> ${reservationDetails.checkin}</p>
            <p><strong>Départ:</strong> ${reservationDetails.checkout}</p>
            <hr>
            <p class="price"><strong>Total à régler:</strong> ${prix}€</p>`;

        // Affichage de l'étape de paiement et défilement de la page jusqu'à cette section.
        payBtn.textContent = `Payer et Confirmer ${prix}€`;
        paymentStepDiv.style.display = 'block';
        paymentStepDiv.scrollIntoView({ behavior: 'smooth' });
    };

    // Ajout d'un écouteur d'événement sur le clic du bouton de paiement.
    payBtn.addEventListener('click', async () => {
        const email = document.getElementById('email').value;
        if (!email) {
            alert("Veuillez entrer votre email.");
            return;
        }
        reservationDetails.email = email;

        const statusDiv = document.getElementById('payment-status');
        statusDiv.className = 'form-message';
        statusDiv.textContent = 'Traitement en cours...';
        statusDiv.style.display = 'block';

        // Étape 1 : Simulation de la demande de paiement à l'API.
        const paymentIntentRes = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ montant: reservationDetails.montant })
        });

        // Étape 2 : Si le paiement est OK, on enregistre la réservation en base de données.
        if (paymentIntentRes.ok) {
            const reservationRes = await fetch('/api/reservation', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(reservationDetails)
            });
            const result = await reservationRes.json();
            statusDiv.textContent = result.message;
            statusDiv.classList.add('success');
        } else {
            statusDiv.textContent = 'Échec de la communication.';
            statusDiv.classList.add('error');
        }
    });
}

/**
 * Initialise toutes les fonctionnalités de la page du blog.
 */
function initBlogPage() {
    const postsContainer = document.getElementById('posts-container');
    if (!postsContainer) return;

    // Chargement et affichage des articles et de leurs commentaires.
    fetch('/api/posts')
        .then(res => res.json())
        .then(posts => {
            postsContainer.innerHTML = '';
            posts.forEach(post => {
                let commentsHtml = '<div class="comments-section"><h3>Commentaires</h3>';
                if (post.commentaires && post.commentaires.length > 0) {
                    post.commentaires.forEach(comment => {
                        commentsHtml += `<div class="comment"><p class="author">${comment.auteur}:</p><p>${comment.contenu}</p></div>`;
                    });
                } else {
                    commentsHtml += '<p>Soyez le premier à commenter !</p>';
                }
                commentsHtml += '</div>';

                postsContainer.innerHTML += `
                    <article class="blog-post">
                        <img src="assets/images/blog-1.jpg" alt="${post.titre}">
                        <h3>${post.titre}</h3>
                        <p>${post.contenu}</p>
                        ${commentsHtml}
                        <form class="comment-form" onsubmit="addComment(event, '${post._id}')">
                            <h4>Laissez un commentaire</h4>
                            <div class="form-group"><input type="text" placeholder="Votre nom" required></div>
                            <div class="form-group"><textarea placeholder="Votre commentaire" required></textarea></div>
                            <button type="submit" class="btn">Envoyer</button>
                        </form>
                    </article>`;
            });
        });
}

/**
 * Fonction appelée lors de la soumission du formulaire de commentaire
 * @param {Event} event 
 * @param {string} postId 
 */
function addComment(event, postId) {
    event.preventDefault();
    const form = event.target;
    const commentData = {
        auteur: form.elements[0].value,
        contenu: form.elements[1].value,
    };
    fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData)
    }).then(() => {
        form.reset();
        initBlogPage(); 
    });
}
