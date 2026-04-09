# T4
---


- Nom du groupe : Arcalis
- Membres du groupe : Thomas Barseghian, Wali Mohseni, Abdullah Nezami
- Liens vers les évaluations T4 :
 - lien 1
 - lien 2
 - ...




## Perroquet
---


**Un jeu Tycoon**
Perroquet est un jeu de type Tycoon qui place le joueur dans la peau d'un streameur politique débutant devant choisir son camp et sa plateforme, et qui s'appuie sur une analyse approfondie des données de chaque contenu pour lui permettre de décrypter la mécanique cachée des algorithmes et de comprendre l'impact direct de ses choix éditoriaux.


### Captures d'écran






### Procédures d'installation et d'exécution
Pour jouer cliquez sur le lien ci-dessous:
https://perroquetpolitics.netlify.app/intro


### Objectifs pédagogiques
Les objectifs pédagogiques de Perroquet sont de permettre au joueur de comprendre:
**Le biais des plateformes:**
Démontrer, par l'analyse des statistiques, comment la surreprésentation de certains camps politiques sur une plateforme influence directement la portée, le nombre de vues et l'acquisition d'abonnés.
**Expérimenter le dilemme de l'intégrité éditoriale:**
Expérimenter le dilemme de l'intégrité éditoriale en gérant l'équilibre précaire entre ses convictions politiques, sa santé mentale et les nécessités financières imposées par la « méta » (Most Effective Tactic Available) dans notre cas le type de contenu, des plateformes.
**L'impact des datas sur la création de contenu:** 
Comprendre comment l'analyse des données et le suivi des tendances transforment le rôle du créateur en soumettant sa ligne éditoriale à la dictature des métriques et des chiffres
#### Objectifs pédagogiques avancés
**L'exploitation des sujets tendances:**
L'usage de thématiques spécifiques et de parler des sujets de tendance qui sollicitent plus de vues et d’abonnés engendrent plus d’engagement.
**La radicalisation de l'audience:**
Lorsqu'un créateur fidélise une audience sur un créneau radical, l'audience finit par dicter la ligne éditoriale. S'il tente de revenir à la nuance, il subit un "backlash" (rejet, désabonnements) de sa propre communauté.
#### Références


Référence 1:
https://git.unistra.fr/arcalis/vin-26-t-4-b/-/blob/master/Refrences/Gamejam_Illkirch.pdf?ref_type=heads


### Description des fonctionnalités
**Boucle de simulation :** Jeu au tour par tour où chaque publication correspond à une semaine écoulée.
**Création de contenu :** Le joueur paramètre chaque post en choisissant son bord politique, son thème, son format et son ton.
**Évaluation algorithmique :** Les réseaux appliquent des multiplicateurs cachés selon leur architecture (ex : prime au contenu court et radical).
**Récompenses de visibilité :** Un post aligné avec le contenu recherché du réseau génère des bonus massifs d'Audience et de Capital.
**Dilemme moral :** Trahir ses convictions politiques initiales pour s'adapter à l'algorithme fait baisser proportionnellement la jauge de Santé Mentale/Intégrité.
**Suivi des statistiques :** Un tableau de bord permet de surveiller l'équilibre fragile entre la croissance financière et l'intégrité personnelle.
### Simulation : chaque post correspond à une semaine qui passe
**Variables du post :** Le post possède un camp (Extrême gauche, Gauche, Centre, Droite, Extrême droite), un format (court / long), un thème (Immigration, Écologie, Guerre, Avancé scientifique, …) et un ton (Nuancé/Radical).
**L'Algorithme de la Plateforme :** Chaque réseau social possède un multiplicateur caché.
X-Sphere : Multiplicateur positif sur les contenus Courts + Radicaux. Multiplicateur négatif sur les contenus Longs + Nuancés.
**Calcul de l'Impact :**
Lorsqu'un contenu est publié, l'algorithme confronte les paramètres du contenu (nombre d’abonnées actuel, ton, format, alignement) à son algorithme interne.
Si le contenu correspond à ce qu'attends l'algorithme et ce qui intéresse les utilisateurs du réseau social, le joueur gagne un fort bonus d'Audience et de Capital.
Si le joueur publie un contenu en contradiction avec ses convictions initiales pour suivre ce qui marche sur le réseau, sa jauge de Santé Mentale/Intégrité baisse proportionnellement.
#### Interface
L'interface est constituée des éléments suivants :
L'interface se présente sous la forme d'un "Dashboard" (tableau de bord) immersif de créateur de contenu. Son design est purement utilitaire et minimaliste, regroupant toutes les actions et données sur un écran unique :
**La barre des métriques (Jauges) :** Affichage visuel en temps réel des quatre variables de succès : Audience (nombre d'abonnés), Capital (budget disponible), Santé Mentale.
**Le Studio de Création :** Le panneau central où le joueur configure son post hebdomadaire à l'aide de boutons (pour le Camp et le Thème) et des switchs (pour le Format et le Ton).
**Le Centre d'Analyse (Boutique) :** Une zone dédiée à l'achat et à la consultation de datas, affichant en les tendances actuelles et les mots-clés tendance une fois débloqués.
**La Zone de Monitoring (Graphiques) :** Des graphiques dynamiques générés via Recharts. Elle inclut une courbe d'évolution temporelle (Capital vs Santé Mentale) et un "Radar Chart" illustrant visuellement le décalage entre les convictions initiales du joueur et le contenu qu'il publie réellement.
**Le Fil d'Historique (Journal) :** Une liste chronologique récapitulant les posts précédents, affichant pour chacun les vues générées, l'argent gagné et le coût moral encaissé.
#### Actions du joueur
À chaque tour de jeu (qui correspond à une semaine écoulée), le joueur interagit avec son tableau de bord pour effectuer les actions suivantes :
**Publier du contenu :** Définir les paramètres de son post hebdomadaire via des menus et curseurs en choisissant le **Camp** défendu, le **Thème** abordé, le **Format** (Court/Long) et le **Ton** (Nuancé/Radical), puis cliquer sur "Publier".
**Acheter de la Data :** Dépenser du Capital dans la zone d'analyse pour débloquer les "tendances" et révéler les multiplicateurs cachés de l'algorithme et ceux de la  semaine en cours.
**Pivoter sa ligne éditoriale :** Décider de modifier drastiquement ses paramètres habituels pour s'adapter à l'algorithme, en assumant le risque de perdre de la Santé Mentale et de déclencher une crise (backlash) de la part de son audience.
### Scénarios
**Scénario d'introduction et la découverte de la méta:**
En début de partie, le joueur a la possibilité de mener une phase de test en publiant différents types de contenus (neutres ou légèrement orientés) sur plusieurs réseaux sociaux distincts. L'objectif de ce scénario est de forcer le joueur à analyser les données de ses premiers échecs et succès pour comprendre par lui-même quels critères sont favorisés par l'algorithme de chaque plateforme.
**Scénario de crise : Le changement de camp politique:**
Si, au cours de la partie, le joueur décide de modifier radicalement sa ligne éditoriale et de changer de camp politique tout en conservant son canal principal (même compte, mêmes thématiques générales), il déclenche un événement de crise. L'audience réagit violemment à cette dissonance : le joueur subit une perte drastique d'abonnés de sa base initiale, une chute de ses vues, et un impact critique sur sa jauge de Santé Mentale en raison du harcèlement ("backlash") généré par sa propre communauté.
### Contraintes de développement
**Contraintes temporelles et de gestion:**
**Développement ultra-court :**
Le jeu entier, de la conception au déploiement, doit être achevé en deux jours. Aucune fonctionnalité superflue ne doit être développée avant que la boucle de gameplay principale (Publier -> Analyser -> Gagner/Perdre des stats) ne soit fonctionnelle.
**Zéro Back-end :**
Par manque de temps, il n'y aura ni base de données externe ni gestion de comptes utilisateurs complexes. La sauvegarde de la progression (si elle existe) se fera uniquement en local via le localStorage du navigateur.
**Contraintes graphiques et ergonomiques :**
Interface : Le design sera purement utilitaire et minimaliste. Pas de création d'assets graphiques complexes. L'immersion reposera sur l'aspect "tableau de bord de moniteur" utilisant des bibliothèques de composants prêtes à l'emploi.
### Fonctionnalités et scénarios avancés
#### Scénarios Avancés:
**Scénario de l'impact dans le monde réel:**
Un écran de fin généré dynamiquement en fonction des jauges finales du joueur révèle les conséquences concrètes de son influence sur la société mais aussi l’impact sur sa santé mentale.
#### Fonctionnalités Avancées:
**L’achat d’engagement artificiel:**
Le joueur peut utiliser son Capital pour acheter de faux abonnés afin de booster artificiellement son audience et tromper l'algorithme. C'est un pari risqué : cela augmente la visibilité à court terme, mais un événement aléatoire peut bannir son compte ou ruiner sa Santé Mentale à cause du stress d'être découvert.
**La Monétisation Privée :**
En fin de partie, si le joueur a une audience très fidélisée ou radicalisée, il peut ouvrir un canal payant exclusif. 
