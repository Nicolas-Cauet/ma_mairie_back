echo -n "Que veux tu faire ? 
 1 : coucou
 2 : Heroku push  
 3 : git commit github
 4 : git push github

Entrée un chiffre : "
read action

if [[ $action == 1 ]]
then
  echo "coucou ça va ?"
fi

if [[ $action == 2 ]]
then
  echo "Message pour commit : "
read message
git commit -am "'$message'";
git push heroku main;
fi

if [[ $action == 3 ]]
then
git add .
  echo "Message pour commit : "
read message
git commit -m "'$message'";
fi

if [[ $action == 4 ]]
then
git add .
  echo "Message pour commit : "
read message
git commit -m "'$message'";
  echo "Sur quel branch push ? : "
read branch
git push "$branch";
fi






