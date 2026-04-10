# Perroquet - Guide d'Installation

Bienvenue sur le projet **Perroquet**, un serious game de simulation d'influence et de modération sur les réseaux sociaux. 

Ce guide vous expliquera comment récupérer le projet et le faire tourner sur votre machine locale en quelques minutes.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les logiciels suivants sur votre ordinateur :
* **[Git](https://git-scm.com/downloads)** : Pour cloner le dépôt.
* **[Node.js](https://nodejs.org/)** (version 18 ou supérieure recommandée) : Qui inclut automatiquement `npm` (Node Package Manager).

---

## Installation étape par étape

### 1. Cloner le dépôt
Ouvrez votre terminal (Invite de commandes, PowerShell, ou le terminal intégré de VS Code) et téléchargez le code source via Git :

```bash
git clone [https://github.com/AbdullahPro2/Perroquet.git](https://github.com/AbdullahPro2/Perroquet.git)
```

### 2. Accéder au dossier du projet
Déplacez-vous dans le dossier qui vient d'être créé :

```bash
cd perroquet
```

### 3. Installer les dépendances
Elle permet de télécharger toutes les librairies nécessaires au fonctionnement du jeu (React, Zustand, TailwindCSS, Recharts, etc.) :

```bash
npm install
```

---

## Lancer le jeu en local

Une fois l'installation terminée, vous pouvez démarrer le serveur de développement local en tapant :

```bash
npm run dev
```

Le terminal vous affichera une adresse locale (généralement `http://localhost:5173`). 
**Ctrl+Clic** (ou Cmd+Clic sur Mac) sur ce lien pour ouvrir le jeu dans votre navigateur web préféré !

---

**Amusez-vous bien et essayez de survivre à l'algorithme ! **

