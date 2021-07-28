# MairkurBack


## From the front
You can make request from the front by using

``` javascript
fetch('YOUR BACKEND SERVEUR URL HERE', {method: 'GET/POST/WHATEVER', body: {"param": "good"}, headers: {"param": "nice"}})
    .then(response => response.json())
    .then(jsonResponse =>
      // do stuff
    }));
  }
```

## Lots of Routes

The beckend is located here :http://mairkurapi.eu-west-3.elasticbeanstalk.com
You can use different routes :
```
/api/event (GET)-> body : idSchool(int) -> get home page events
/api/assos (GET) -> body : isSchool(int) -> get all assos from a school
/api/auth/login (POST) -> body : email(string), password(string) -> get a connection toke
```

## License
[MIT](https://www.google.com/search?client=firefox-b-d&q=there+is+no+license)
