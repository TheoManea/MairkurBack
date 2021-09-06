# MairkurBack

The backend is located here :http://mairkurapi.eu-west-3.elasticbeanstalk.com

## From the front
You can make request from the front by using

``` js
fetch('YOUR BACKEND SERVEUR URL HERE', { method: 'POST OR SOMETHING', headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'token' :'Bearer current_token'}, body: JSON.stringify({ email: "johncena@gmail.com", password: "i love Chuck Noris" }) })
  .then(response => response.json())
  .then(jsonResponse =>
    // do stuff
  );
```

## Routers available

From the root :
```
api
  /events
    /home
      /[GET :idSchool :int] --> get all homepage's events
    /details
      /[GET :idEvent :int] --> get all infos about this event
    /create ~> admin router
      |[POST :title :string // POST :details :string // POST :dayCreation :string // POST :dayStartEvent :string // POST :dayEndEvent :string // lvl2:(POST :idAssos :int)] --> create an event
    /edit ~> admin router
      |[POST :title :string // POST :details :string // POST :id :int // POST :dayStartEvent :string // POST :dayEndEvent :string // lvl2:(POST :idAssos :int)] --> edit specific event according to the id provided
    /delete ~> admin router
      |[POST :id :int] --> delete an event
    /manage ~> admin router
      |--> get the event of the admin management panel

  /assos
    /home
      /[GET :idSchool :int] --> get all assos associate with this school
    /details
      /[GET :idEvent :int] --> get all infos about this assos
    /create ~> admin router
      |[POST :title :string // POST :details :string] --> create an assos
    /edit ~> admin router
      |[POST :title :string // POST :details :string // POST :id :int] --> edit specific assos according to the id provided
    /delete ~> admin router
      |[POST :id :int] --> delete an assos
    /manage ~> admin router
      |--> get the assos of the admin management panel
      
  /auth
    /login 
      |[POST :email :string // POST :password :string] --> if successful, return a token(auth), name, family name, levelAccess and id(user)
    /create ~> admin router (lvl 2 min)
      |[POST :name :string // POST :familyName :string // POST :levelAccess :int // POST :email :string] --> create a new user with the provided levelAccess
    /edit ~> admin router (lvl 2 min) [NOT ABLE YET]
      |[POST :id :int // (POST :name :string) // (POST :familyName :string) // (POST :levelAccess :int)] --> edit a user
    /delete ~> admin router (lvl 2 min)  [NOT ABLE YET]
      |[POST :id :int] --> delete a user

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
``` js
  fetch('http://localhost:3000/api/auth/login', { method: 'POST', headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'variable' :"Kubrick wasn't that good"}, body: JSON.stringify({ email: "michael.bay65@yahoo.com", password: "iSecrEtly_l@v€KuBrick.<3" }) })
  .then(response => response.json())
  .then(jsonResponse =>
    {
      console.log("Well what ?")
      console.log(JSON.stringify(jsonResponse))
    }
  );
```

## License
[MIT](https://www.google.com/search?client=firefox-b-d&q=there+is+no+license)
