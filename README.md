# MairkurBack

The backend is located here :http://mairkurapi.eu-west-3.elasticbeanstalk.com

## From the front
You can make request from the front by using

``` js
fetch('YOUR BACKEND SERVEUR URL HERE', { method: 'POST OR SOMETHING', headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'token' :'here i guess'}, body: JSON.stringify({ email: "johncena@gmail.com", password: "i love Chuck Noris" }) })
  .then(response => response.json())
  .then(jsonResponse =>
    // do stuff
  );
```

## Routes available

From the root :
```
api
  |events
    |home
      |[GET :idSchool :int] --> get all homepage's events
    |detailsevent
      |[GET :idEvent :int] --> get all infos about this event
  |assos
    |[GET :idSchool :int] --> get all assos associate with this school
  |auth
    |login [POST :email :string // POST :password :string] --> if successful, return a auth token
```

Vocabulary :
- homepage's events are composed by all today's events + 10 futurs events
- idSchool is the id of a school
- idEvent is this id of a specific event

## Exemples
To make a GET request, just do
``` js
fetch('http://localhost:3000/api/events/detailsevent/12', { method: 'GET', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'} })
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
