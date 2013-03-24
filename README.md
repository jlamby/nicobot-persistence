nicobot-persistence API
===================

L'API est une API REST, chaque requete ou r�ponse est en JSON. Elle est compos�e actuellement de 2 services : **Messages** et **Links**.

## Service Messages

  Ce service permet d'ajouter/r�cup�rer une liste de messages.
  
#### Description d'un message
```javascript
var Message = {
  postedDate : DateTime // (UTC) (ISO 8601),
  username   : String,
  message    : String
}
```
Chaque message est donc compos� de 3 champs :
* postedDate : la date et l'heures � laquelle le message a �t� transmis
* username : le nom de l'utilisateur qui a envoy� le message
* message : le message � proprement parler

#### R�cuperation des messages

Ce service permet de retourner les *n* derniers messages enregistr�s.

> GET /messages?max_messages=x&start_date=y

**Param�tres :**
  * `max_messages` : le nombre maximum de message � retourner (Par d�faut : 10) 
  * `start_date` : � partir de quelle date/heure il faut retourner des messages (Par d�faut : T-5minutes).

Cela signifie donc qu'il y a une double limite pour ce service.

*Exemple :* 
  Il y a 15 messages de sauvegard�s pour les 5 dernieres minutes.
  Une requete est effectu�e avec les param�tres par d�faut, alors seul les 10 derniers messages seront retourn�s. 
  
**Retour du service :**
```javascript
{
  "content" : [
      Message,
      ...
  ]
}
```

#### Ajout de message

Ce service permet de sauvegarder 1 ou plusieurs messages.

> POST /messages
  
**Param�tre :**

  Le corps de la requete est compos� d'un tableau `messages` qui contient le ou les messages � ajouter.

```javascript
  {
    "messages" : [
        Message1,
        Message2
    ]
  }
```

## Service Links

  Ce service permet d'ajouter/r�cup�rer un lien.
  
#### Description d'un lien
```javascript
var Link = {
  link  : String,
  count : int
}
```
Chaque lien est donc compos� de 2 champs :
* link : le lien
* count : le nombre de fois qu'il a d�j� �t� partag�

#### R�cuperation d'un lien

Ce service permet de savoir si un lien a d�j� �t� partag� et si oui, de savoir le nombre de fois qu'il l'a �t�.

> GET /links?link=x

**Param�tres :**
  * `link` : le lien complet (avec le http://)

**Retour du service :**
```javascript
{
  "content" : [
      Link
  ]
}
```

#### Ajout/mise � jour d'un lien

Ce service permet de sauvegarder 1 lien. Si le lien est d�j� pr�sent son compteur de partage est augment� de 1.

> POST /messages
  
**Param�tre :**

  Le corps de la requete est compos� d'un objet `link` qui contient le lien � ajouter.

```javascript
  {
    "link" : "http://www.google.com"
  }
```

**Retour du service :**
```javascript
{
  "content" : [
      Link
  ]
}
```