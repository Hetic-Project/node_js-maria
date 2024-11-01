# HETIC WEB3

## Groupe
Le groupe est composé de :
- Imene Toudeft
- Lucas Yalman
- Hamil Yassine

## Configuration
Créez un fichier `.env` à la racine du projet et ajoutez-y la ligne suivante :
JWT_KEY=29adabecc4607233acf1b5a7780b6c4c2027db08a652cfd8dbffbb56081b6665

## Lancer le projet
Pour lancer le projet, exécutez la commande suivante :
- docker compose up --build 
Un fichier Makefile comporte les commandes d'execution des containers.
Un fichier init.sql permet de créer une base de données d'initialisation avec les tables nécessaires.

## Utilisation
1. Lancez avec Live server le fichier [`register.html`]
2. Créez un utilisateur, il sera ajouté dans la base de données.
3. Vous pouvez ensuite vous authentifier.
4. Une fois authentifié, vous pouvez uploader un fichier de votre choix.
5. Le fichier sera correctement ajouté en local dans le répertoire /backend/upload.

## Fonctionnalités
### Fonctionnelles
- Enregistrement et authentification (register, login)
- JWT
- Upload local (fichier max par transfert : 2 Go)

### Non fonctionnelles
- Limite de 2 Go d'upload max par personne pour l'ensemble des fichiers
- Upload des métadonnées depuis le front vers la base de données
- Lien de partage de fichiers
- Gestion des fichiers et des métadonnées

## Remarques
Notre Dockerfile est correct mais, pour une raison inconnue, nous n'arrivons pas à l'utiliser correctement. (Problème de machine)
