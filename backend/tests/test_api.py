import requests

# ici l'URL du backend
BASE_URL = "http://backend:5000"

def test_chambres_api_with_date():
    """Teste si l'API des chambres répond correctement avec une date."""
    response = requests.get(f"{BASE_URL}/api/chambres?checkin=2025-07-15")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 15  # on a bien 15 chambres
    assert 'prix_actuel' in data[0] # calcul du prix en fonction des saisons
    assert 'disponibilite' in data[0] # vérifie la disponibilité
    print("\n[OK] Test de l'API /api/chambres réussi.")

def test_blog_posts_api():
    """Teste si l'API du blog renvoie bien les articles."""
    response = requests.get(f"{BASE_URL}/api/posts")
    assert response.status_code == 200
    data = response.json() 
    assert isinstance(data, list) # on a bien une liste
    assert len(data) > 0
    assert '_id' in data[0] # vérifie que l'ID du post est bien présent
    print("[OK] Test de l'API /api/posts réussi.")