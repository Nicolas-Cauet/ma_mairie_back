ALEKS
*****

Concentré sur signalement
Passé les articles en V1.1
PAssé les services en V1.1
On peut passer les 2 en durs si besoin
passe en v2 l'administration de la déchetterie/ramassage poubelle
passe en dur le calendrier, guide, ...

Pour images dans article => chercher un média => fetch => champ dans formulaire => recupére un ficher avec multer => image sur serveur 2 options
on garde l'image sur le serveur => pas top
image en base de données => pas secure avec la base 64 + stockage important
image en cloud => base dt signalement ? check siganelement les derniers signalements dans les 24h puis compraison si meme personnes => bloquer
check text (string similare donnée en média objet ex/ amazons3, ovh et surtout cloudynary
peut etre le voir pour ne pas ajouter ca en MVP et sinon faire les données en dur (surtout pour les images) ==> V1.1

Catégories => sous forme d'un tableau Json en dur
Status => pareil
si pas amener à évoluer => Json

user ne se connecte pas => probleme RGPD en cas de problème ...
crée un user avec son IP lors de la création du signalement
prévoir un encart dans le front qui signale à l'utilisateur que l'IP sera conserver
champ user IP dans signalement

gestion des signalement pour empecher les signalements trolls
admin valide les signalements avant publication, aide l'admin à limiter le troll
api existe pour eviter le troll matching, controle le signalement pour voir si c'est un troll

1 regex vérifie le tel
2 api verifie les conneries
3 deja eut signalement ? check siganelement les derniers signalements dans les 24h puis compraison si meme personnes => bloquer
check text (string similarity) => donne un score et peu filtrer sur le score pour éviter les doublons

Idée => liste signalement, bouton détail qui affiche la suite du signalement => pas de nouvelles pages pour afficher un signalement

Faire un tableau de l'ensemble des routes