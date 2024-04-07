# Guide de lancement du code
## Commandes pour lancer le projet
### Backend
Cloner le projet shoploc-backend sur votre machine.
Depuis un IDE, lancer le backend afin d'ouvrir l'API.
### Frontend
Cloner le projet shoploc-frontend sur votre machine.
Lancer les commandes suivantes à la racine du projet (dossier shoploc-frontend) :
```
npm install
npx expo start
```
Votre application est désormais accessible !
## Générer un AAB
Pour construire le fichier AAB de l'application, lancez la commande suivante :
```
eas build -p android 
```
Pour rappel, ce fichier permet au Play Store de construire une APK adaptée au mobile de chaque personne le téléchargeant.
