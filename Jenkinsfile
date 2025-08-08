pipeline {
    agent any // le pipeline s'exécute sur n'importe quel agent Jenkins dispo

    environment {
        // nom de mon projet 
        DOCKER_COMPOSE_PROJECT_NAME = 'hotel_pays_basque'
    }

    stages {
        stage('1. Checkout from SCM') {
            steps {
                echo 'Récupération du code source...'
                
            }
        }

        stage('2. Build Docker Images') {
            steps {
                echo 'Construction des images Docker via docker-compose...'
                // cette commande lit le docker-compose.yml & construit les images 
                sh 'docker-compose build'
            }
        }

        stage('3. Run Services in Background') {
            steps {
                echo 'Démarrage des services (backend, bdd, nginx) en arrière-plan...'
                // '-d' signifie 'detached' => pour lancer en arrière-plan
                sh 'docker-compose up -d'
                echo 'Attente de 20 secondes pour la stabilisation des services...'
                sleep(20)
            }
        }

        stage('4. Run Integration Tests') {
            steps {
                echo 'Exécution des tests d\'intégration sur le backend...'
                // exécution de la commande 'pytest' DANS le conteneur 'backend' => déjà en cours
                // le -T est important pour que Jenkins n'ait pas de problème au niveau du terminal
                sh 'docker-compose exec -T backend pytest tests/'
            }
        }
    }
    
    post {
        // s'exécute TOUJOURS à la fin => le pipeline réussisse ou pas
        always {
            echo '5. Cleaning up...'
            // pour arrêter & supprimer proprement tous les conteneurs
            sh 'docker-compose down'
        }
    }
}