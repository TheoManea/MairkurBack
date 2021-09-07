# MairkurBack

The backend is located here :http://mairkurapi.eu-west-3.elasticbeanstalk.com

## From the front
You can make request from the front by using

``` js
fetch('YOUR BACKEND SERVEUR URL HERE', { method: 'POST OR SOMETHING', headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' :'Bearer current_token'}, body: JSON.stringify({ email: "johncena@gmail.com", password: "i love Chuck Noris" }) })
  .then(response => response.json())
  .then(jsonResponse =>
    // do stuff
  );
```

## Routers available

From the root :
```
api
  +-- events
  | +-- home [GET]
  | | `--> get all homepage's events
  | +-- details [GET]
  | | +--> id (:int id event) 
  | | `--> get all infos about this event
  | +-- create [POST] [ADMIN]
  | | +--> title (:string title event)
  | | +--> details (:string details event)
  | | +--> dayStartEvent (:string date of the starting (UTC))
  | | +--> dayEndEvent (:string date of the ending (UTC))
  | | +--> idAssos [LVL2 ADMIN ONLY] (:int id assos associate)
  | | `--> create an event
  | +-- edit [PUT] [ADMIN]
  | | +--> title (:string title event)
  | | +--> details (:string details event)
  | | +--> id (:int id event)
  | | +--> dayStartEvent (:string date of the starting (UTC))
  | | +--> dayEndEvent (:string date of the ending (UTC))
  | | +--> idAssos [LVL2 ONLY] (:int id assos associate)
  | | `--> edit specific event according to the id provided
  | +-- delete [DELETE] [ADMIN]
  | | +--> id (:int id event) 
  | | `--> delete an event
  | +-- manage [POST] [ADMIN]
  | | `--> get the event of the admin management panel
  +-- assos
  | +-- home [GET]
  | | `--> get all assos associate with this school
  | +-- details [GET]
  | | +--> idAssos (:int id assos) 
  | | `--> get all infos about this assos
  | +-- create [POST] [ADMIN]
  | | +--> title (:string title assos)
  | | +--> details (:string details assos)
  | | `--> create an assos
  | +-- edit [PUT] [ADMIN]
  | | +--> title (:string title assos)
  | | +--> details (:string details assos)
  | | +--> id (:int id assos)
  | | `--> edit specific assos according to the id provided
  | +-- delete [DELETE] [ADMIN]
  | | +--> id (:intid assos)
  | | `--> delete an assos
  | +-- manage [POST] [ADMIN]
  | | `--> get the assos of the admin management panel    
  `-- auth
    +-- login [POST] [ADMIN]
    | +--> email (:string email user)
    | +--> password (:string clear password user)
    | `--> if successful, return a token(token), name(name), family name(familyName), levelAccess(levelAccess) and id user(id)
    +-- create [POST] [ADMIN] [LVL2 ONLY]
    | +--> name (:string name user)
    | +--> familyName (:string family name user)
    | +--> levelAccess (:int level access)
    | +--> email (:string email user)
    | `--> create a new user with the provided levelAccess
    +-- edit [PUT] [ADMIN] [LVL2 ONLY] [NOT ABLE YET]
    | +--> id (:int id user)
    | +--> name (:string name user)
    | +--> familyName (:string family name user)
    | +--> levelAccess (:int level access)
    | `--> edit a user
    +-- ownedit [PUT] [ADMIN] [NOT ABLE YET]
    | +--> id (:int id user)
    | +--> name (:string name user)
    | +--> familyName (:string family name user)
    | +--> POST :password (:string clear password user)
    | +--> POST :levelAccess (:int level access)
    | +--> POST :email (:string email user)
    | `--> edit a user
    `-- delete [DELETE] [ADMIN] [LVL2 ONLY] [NOT ABLE YET]
      +--> id (:int id user)
      `--> delete a user

```

Vocabulary :
- homepage's events are composed by all today's events + 10 futurs events
- idSchool is the id of a school
- idEvent is the id of a specific event
- idAssos is the id of a specitif assos

## Admin routers
If you want to access to the admin routers, you have yo get login in the auth router.
The latter will give you a token. Just pass this token through the headers (as the first example), and add userId parameter in the body.


## Exemples
To make a GET request, just do
``` js
fetch('http://localhost:3000/api/events/details/12', { method: 'GET', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'} })
  .then(response => response.json())
  .then(jsonResponse =>
    {
      console.log("i did it ! F*ck yeah")
      console.log(JSON.stringify(jsonResponse))
    }
  );
```

To make a POST request, just do this way
This one is to log in
``` js
  fetch('http://localhost:3000/api/auth/login', { method: 'POST', headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer the_token'}, body: JSON.stringify({ email: "michael.bay65@yahoo.com", password: "iSecrEtly_l@v€KuBrick.<3" }) })
  .then(response => response.json())
  .then(jsonResponse =>
    {
      console.log("Well what ?")
      console.log(JSON.stringify(jsonResponse))
    }
  );
```

This one is to access to admin routers
``` js
  fetch('http://localhost:3000/api/events/manage', { method: 'POST', headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer the_token', 'variable' :"Kubrick wasn't that good"}, body: JSON.stringify({ stuff: "thanks", train: "Thomas" }) })
  .then(response => response.json())
  .then(jsonResponse =>
    {
      console.log("I lick rocks, it tastes like cherry")
      console.log(JSON.stringify(jsonResponse))
    }
  );
```

## License
[MIT](https://www.google.com/search?client=firefox-b-d&q=there+is+no+license)
