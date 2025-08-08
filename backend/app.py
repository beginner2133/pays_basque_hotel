import os
import datetime
from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
client = MongoClient(os.environ.get("MONGO_URI"))
db = client.hotel_pays_basque


def is_haute_saison(date_str):
    try:
        date = datetime.datetime.strptime(date_str, '%Y-%m-%d').date()
        return (datetime.date(date.year, 6, 1) <= date <= datetime.date(date.year, 9, 30))
    except (ValueError, TypeError):
        return False

def init_db():
    if db.chambres.count_documents({}) < 15:
        db.chambres.drop()
        chambres_data = [
            {'nom': 'Chambre Classique Simple', 'prix_basse_saison': 90, 'prix_haute_saison': 120, 'image': 'assets/images/room-1.jpg'},
            {'nom': 'Chambre Classique Double', 'prix_basse_saison': 110, 'prix_haute_saison': 140, 'image': 'assets/images/room-2.jpg'},
            {'nom': 'Chambre Confort', 'prix_basse_saison': 130, 'prix_haute_saison': 170, 'image': 'assets/images/room-3.jpg'},
            {'nom': 'Chambre Supérieure', 'prix_basse_saison': 160, 'prix_haute_saison': 210, 'image': 'assets/images/room-4.jpg'},
            {'nom': 'Chambre Deluxe', 'prix_basse_saison': 190, 'prix_haute_saison': 250, 'image': 'assets/images/room-5.jpg'},
            {'nom': 'Suite Junior', 'prix_basse_saison': 240, 'prix_haute_saison': 320, 'image': 'assets/images/room-6.jpg'},
            {'nom': 'Suite Prestige', 'prix_basse_saison': 350, 'prix_haute_saison': 450, 'image': 'assets/images/room-7.jpg'},
            {'nom': 'Suite Affaire', 'prix_basse_saison': 280, 'prix_haute_saison': 380, 'image': 'assets/images/room-8.jpg'},
            {'nom': 'Chambre Standard', 'prix_basse_saison': 120, 'prix_haute_saison': 150, 'image': 'assets/images/room-9.jpg'},
            {'nom': 'Suite Luxe', 'prix_basse_saison': 500, 'prix_haute_saison': 700, 'image': 'assets/images/room-10.jpg'},
            {'nom': 'Chambre Éco Solo', 'prix_basse_saison': 80, 'prix_haute_saison': 100, 'image': 'assets/images/room-11.jpg'},
            {'nom': 'Loft d\'Artiste', 'prix_basse_saison': 220, 'prix_haute_saison': 290, 'image': 'assets/images/room-12.jpg'},
            {'nom': 'Chambre Rêve', 'prix_basse_saison': 300, 'prix_haute_saison': 400, 'image': 'assets/images/room-13.jpg'},
            {'nom': 'Chambre Zen', 'prix_basse_saison': 180, 'prix_haute_saison': 240, 'image': 'assets/images/room-14.jpg'},
            {'nom': 'Chambre Calm', 'prix_basse_saison': 260, 'prix_haute_saison': 340, 'image': 'assets/images/room-15.jpg'}
        ]
        db.chambres.insert_many(chambres_data)
        print("Collection 'chambres' initialisée.")

    if db.blog.count_documents({}) == 0:
        db.blog.insert_one({
            'titre': 'Bienvenue sur notre blog',
            'contenu': 'Découvrez les merveilles du Pays Basque...',
            'image': 'assets/images/blog-1.jpg',
            'commentaires': [{'auteur': 'Marie', 'contenu': 'Super article !'}]
        })
        print("Collection 'blog' initialisée.")

with app.app_context():
    init_db()

@app.route('/api/chambres')
def get_chambres():
    checkin_str = request.args.get('checkin')
    if not checkin_str:
        return jsonify({"error": "La date d'arrivée est requise"}), 400
    
    haute_saison = is_haute_saison(checkin_str)
    chambres_a_jour = []
    for chambre in db.chambres.find({}, {'_id': 0}):
        chambre['prix_saisonnier'] = chambre['prix_haute_saison'] if haute_saison else chambre['prix_basse_saison']
        chambres_a_jour.append(chambre)
    return jsonify(chambres_a_jour)

@app.route('/api/create-payment-intent', methods=['POST'])
def create_payment():
    data = request.get_json()
    if not data or 'montant' not in data:
        return jsonify({'error': 'Montant manquant'}), 400
    return jsonify({'clientSecret': 'pi_simulation_secret_ok'}), 200

@app.route('/api/reservation', methods=['POST'])
def confirm_reservation():
    data = request.get_json()
    db.reservations.insert_one(data)
    return jsonify({'status': 'success', 'message': 'Réservation confirmée et enregistrée !'})

@app.route('/api/posts')
def get_posts():
    posts = []
    for post in db.blog.find():
        post['_id'] = str(post['_id'])
        posts.append(post)
    return jsonify(posts)

@app.route('/api/posts/<post_id>/comments', methods=['POST'])
def add_comment(post_id):
    data = request.get_json()
    if not data or not all(k in data for k in ['auteur', 'contenu']):
        return jsonify({'error': 'Données de commentaire manquantes'}), 400
    db.blog.update_one({'_id': ObjectId(post_id)}, {'$push': {'commentaires': data}})
    return jsonify({'status': 'success', 'message': 'Commentaire ajouté.'})

@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.get_json()
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({"error": "Nom d'utilisateur et mot de passe requis"}), 400

    if db.users.find_one({"username": data['username']}):
        return jsonify({"error": "Ce nom d'utilisateur est déjà pris"}), 409

    hashed_password = generate_password_hash(data['password'])

    db.users.insert_one({
        "username": data['username'],
        "password": hashed_password
    })
    return jsonify({"message": "Utilisateur créé avec succès"}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
