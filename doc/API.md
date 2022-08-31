---
title: Plant Manager v0.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="plant-manager">Plant Manager v0.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

會員植物管理系統

Base URLs:

* <a href="http://192.168.168.83:3000/api">http://192.168.168.83:3000/api</a>

* <a href="http://192.168.56.100:3000/api">http://192.168.56.100:3000/api</a>

# Authentication

* API Key (auth)
    - Parameter Name: **Auth**, in: header. 

* API Key (authMethod)
    - Parameter Name: **Auth-Method**, in: header. 

<h1 id="plant-manager-user">user</h1>

使用者 API

## get__user

> Code samples

```shell
# You can also use wget
curl -X GET http://192.168.168.83:3000/api/user \
  -H 'Accept: application/json' \
  -H 'Auth: API_KEY' \
  -H 'Auth-Method: API_KEY'

```

```http
GET http://192.168.168.83:3000/api/user HTTP/1.1
Host: 192.168.168.83:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Auth':'API_KEY',
  'Auth-Method':'API_KEY'
};

fetch('http://192.168.168.83:3000/api/user',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Auth' => 'API_KEY',
  'Auth-Method' => 'API_KEY'
}

result = RestClient.get 'http://192.168.168.83:3000/api/user',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Auth': 'API_KEY',
  'Auth-Method': 'API_KEY'
}

r = requests.get('http://192.168.168.83:3000/api/user', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Auth' => 'API_KEY',
    'Auth-Method' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://192.168.168.83:3000/api/user', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://192.168.168.83:3000/api/user");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Auth": []string{"API_KEY"},
        "Auth-Method": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://192.168.168.83:3000/api/user", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /user`

*Get User from token*

> Example responses

> 200 Response

```json
{
  "message": "string",
  "user": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "email": "string",
    "isDefaultPassword": true,
    "role": 0
  },
  "rents": [
    {
      "plant": {
        "name": "string",
        "intro": "string",
        "imgPath": "string",
        "nickName": "string",
        "minHumid": 0
      },
      "container": 0
    }
  ]
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

<h3 id="get__user-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Query Success|[UserResponse](#schemauserresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
auth & authMethod
</aside>

## post__user_login

> Code samples

```shell
# You can also use wget
curl -X POST http://192.168.168.83:3000/api/user/login \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST http://192.168.168.83:3000/api/user/login HTTP/1.1
Host: 192.168.168.83:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "email": "string",
  "password": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('http://192.168.168.83:3000/api/user/login',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post 'http://192.168.168.83:3000/api/user/login',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('http://192.168.168.83:3000/api/user/login', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://192.168.168.83:3000/api/user/login', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://192.168.168.83:3000/api/user/login");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://192.168.168.83:3000/api/user/login", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /user/login`

*Login*

> Body parameter

```json
{
  "email": "string",
  "password": "string"
}
```

<h3 id="post__user_login-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[AuthRequest](#schemaauthrequest)|true|登入資訊|

> Example responses

> 200 Response

```json
{
  "message": "string",
  "token": "string",
  "user": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "email": "string",
    "isDefaultPassword": true,
    "role": 0
  },
  "rents": [
    {
      "plant": {
        "name": "string",
        "intro": "string",
        "imgPath": "string",
        "nickName": "string",
        "minHumid": 0
      },
      "container": 0
    }
  ]
}
```

> 400 Response

```json
{
  "message": "Invalid body"
}
```

> 401 Response

```json
{
  "message": "Invalid user or password!"
}
```

<h3 id="post__user_login-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Login success|[LoginSuccessResponse](#schemaloginsuccessresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid body|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid user or password!|[GenericResponse](#schemagenericresponse)|

<aside class="success">
This operation does not require authentication
</aside>

## post__user_register

> Code samples

```shell
# You can also use wget
curl -X POST http://192.168.168.83:3000/api/user/register \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST http://192.168.168.83:3000/api/user/register HTTP/1.1
Host: 192.168.168.83:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "email": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('http://192.168.168.83:3000/api/user/register',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post 'http://192.168.168.83:3000/api/user/register',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('http://192.168.168.83:3000/api/user/register', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://192.168.168.83:3000/api/user/register', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://192.168.168.83:3000/api/user/register");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://192.168.168.83:3000/api/user/register", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /user/register`

*Register*

> Body parameter

```json
{
  "email": "string"
}
```

<h3 id="post__user_register-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[UserRegisterRequest](#schemauserregisterrequest)|true|註冊資訊|

> Example responses

> 200 Response

```json
{
  "message": "Registration success"
}
```

> 400 Response

```json
{
  "message": "Invalid body"
}
```

> 404 Response

```json
{
  "message": "Membership not found"
}
```

> 409 Response

```json
{
  "message": "User already exist"
}
```

<h3 id="post__user_register-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Registration success|[GenericResponse](#schemagenericresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid body|[GenericResponse](#schemagenericresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Registration failure|[GenericResponse](#schemagenericresponse)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|User already exist|[GenericResponse](#schemagenericresponse)|

<aside class="success">
This operation does not require authentication
</aside>

## post__user_password

> Code samples

```shell
# You can also use wget
curl -X POST http://192.168.168.83:3000/api/user/password \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST http://192.168.168.83:3000/api/user/password HTTP/1.1
Host: 192.168.168.83:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "email": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('http://192.168.168.83:3000/api/user/password',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post 'http://192.168.168.83:3000/api/user/password',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('http://192.168.168.83:3000/api/user/password', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://192.168.168.83:3000/api/user/password', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://192.168.168.83:3000/api/user/password");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://192.168.168.83:3000/api/user/password", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /user/password`

*Reset Password Request*

> Body parameter

```json
{
  "email": "string"
}
```

<h3 id="post__user_password-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[UserRegisterRequest](#schemauserregisterrequest)|true|註冊資訊|

> Example responses

> 200 Response

```json
{
  "message": "Request success"
}
```

> 400 Response

```json
{
  "message": "Invalid body"
}
```

> 404 Response

```json
{
  "message": "User not found"
}
```

<h3 id="post__user_password-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Request success|[GenericResponse](#schemagenericresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid body|[GenericResponse](#schemagenericresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Unknown User|[GenericResponse](#schemagenericresponse)|

<aside class="success">
This operation does not require authentication
</aside>

## put__user_password

> Code samples

```shell
# You can also use wget
curl -X PUT http://192.168.168.83:3000/api/user/password \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Auth: API_KEY' \
  -H 'Auth-Method: API_KEY'

```

```http
PUT http://192.168.168.83:3000/api/user/password HTTP/1.1
Host: 192.168.168.83:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "password": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Auth':'API_KEY',
  'Auth-Method':'API_KEY'
};

fetch('http://192.168.168.83:3000/api/user/password',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Auth' => 'API_KEY',
  'Auth-Method' => 'API_KEY'
}

result = RestClient.put 'http://192.168.168.83:3000/api/user/password',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Auth': 'API_KEY',
  'Auth-Method': 'API_KEY'
}

r = requests.put('http://192.168.168.83:3000/api/user/password', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Auth' => 'API_KEY',
    'Auth-Method' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://192.168.168.83:3000/api/user/password', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://192.168.168.83:3000/api/user/password");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Auth": []string{"API_KEY"},
        "Auth-Method": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://192.168.168.83:3000/api/user/password", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /user/password`

*Change the password*

> Body parameter

```json
{
  "password": "string"
}
```

<h3 id="put__user_password-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|

> Example responses

> 200 Response

```json
{
  "message": "Password updated"
}
```

> 400 Response

```json
{
  "message": "Invalid header/body"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

<h3 id="put__user_password-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Password updated|[GenericResponse](#schemagenericresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header/body|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
auth & authMethod
</aside>

## get__rent_list_others

> Code samples

```shell
# You can also use wget
curl -X GET http://192.168.168.83:3000/api/rent/list/others \
  -H 'Accept: application/json' \
  -H 'Auth: API_KEY' \
  -H 'Auth-Method: API_KEY'

```

```http
GET http://192.168.168.83:3000/api/rent/list/others HTTP/1.1
Host: 192.168.168.83:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Auth':'API_KEY',
  'Auth-Method':'API_KEY'
};

fetch('http://192.168.168.83:3000/api/rent/list/others',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Auth' => 'API_KEY',
  'Auth-Method' => 'API_KEY'
}

result = RestClient.get 'http://192.168.168.83:3000/api/rent/list/others',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Auth': 'API_KEY',
  'Auth-Method': 'API_KEY'
}

r = requests.get('http://192.168.168.83:3000/api/rent/list/others', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Auth' => 'API_KEY',
    'Auth-Method' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://192.168.168.83:3000/api/rent/list/others', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://192.168.168.83:3000/api/rent/list/others");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Auth": []string{"API_KEY"},
        "Auth-Method": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://192.168.168.83:3000/api/rent/list/others", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /rent/list/others`

*Get other user's plant information*

> Example responses

> 200 Response

```json
{
  "data": [
    {
      "plant": {
        "name": "string",
        "intro": "string",
        "imgPath": "string",
        "nickName": "string",
        "minHumid": 0
      },
      "container": 0
    }
  ]
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

<h3 id="get__rent_list_others-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Send other's information|[OtherUserPlantResponse](#schemaotheruserplantresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
auth & authMethod
</aside>

## post__rent_register

> Code samples

```shell
# You can also use wget
curl -X POST http://192.168.168.83:3000/api/rent/register \
  -H 'Accept: application/json' \
  -H 'Auth: API_KEY' \
  -H 'Auth-Method: API_KEY'

```

```http
POST http://192.168.168.83:3000/api/rent/register HTTP/1.1
Host: 192.168.168.83:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Auth':'API_KEY',
  'Auth-Method':'API_KEY'
};

fetch('http://192.168.168.83:3000/api/rent/register',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Auth' => 'API_KEY',
  'Auth-Method' => 'API_KEY'
}

result = RestClient.post 'http://192.168.168.83:3000/api/rent/register',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Auth': 'API_KEY',
  'Auth-Method': 'API_KEY'
}

r = requests.post('http://192.168.168.83:3000/api/rent/register', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Auth' => 'API_KEY',
    'Auth-Method' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://192.168.168.83:3000/api/rent/register', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://192.168.168.83:3000/api/rent/register");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Auth": []string{"API_KEY"},
        "Auth-Method": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://192.168.168.83:3000/api/rent/register", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /rent/register`

*Rent registration*

> Example responses

> 200 Response

```json
{
  "message": "Registration successful",
  "waiting": true
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

<h3 id="post__rent_register-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Registration successful|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|

<h3 id="post__rent_register-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|
|» waiting|boolean|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
auth & authMethod
</aside>

## post__rent_plantInfo

> Code samples

```shell
# You can also use wget
curl -X POST http://192.168.168.83:3000/api/rent/plantInfo \
  -H 'Content-Type: multipart/form-data' \
  -H 'Accept: application/json' \
  -H 'Auth: API_KEY' \
  -H 'Auth-Method: API_KEY'

```

```http
POST http://192.168.168.83:3000/api/rent/plantInfo HTTP/1.1
Host: 192.168.168.83:3000
Content-Type: multipart/form-data
Accept: application/json

```

```javascript
const inputBody = '{
  "rent": 0,
  "name": "string",
  "intro": "string",
  "image": "string",
  "nickname": "string",
  "minHumid": 0
}';
const headers = {
  'Content-Type':'multipart/form-data',
  'Accept':'application/json',
  'Auth':'API_KEY',
  'Auth-Method':'API_KEY'
};

fetch('http://192.168.168.83:3000/api/rent/plantInfo',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'multipart/form-data',
  'Accept' => 'application/json',
  'Auth' => 'API_KEY',
  'Auth-Method' => 'API_KEY'
}

result = RestClient.post 'http://192.168.168.83:3000/api/rent/plantInfo',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data',
  'Accept': 'application/json',
  'Auth': 'API_KEY',
  'Auth-Method': 'API_KEY'
}

r = requests.post('http://192.168.168.83:3000/api/rent/plantInfo', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'multipart/form-data',
    'Accept' => 'application/json',
    'Auth' => 'API_KEY',
    'Auth-Method' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://192.168.168.83:3000/api/rent/plantInfo', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://192.168.168.83:3000/api/rent/plantInfo");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"multipart/form-data"},
        "Accept": []string{"application/json"},
        "Auth": []string{"API_KEY"},
        "Auth-Method": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://192.168.168.83:3000/api/rent/plantInfo", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /rent/plantInfo`

*Add plant information*

> Body parameter

```yaml
rent: 0
name: string
intro: string
image: string
nickname: string
minHumid: 0

```

<h3 id="post__rent_plantinfo-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» rent|body|integer(int32)|false|none|
|» name|body|string|false|none|
|» intro|body|string|false|none|
|» image|body|string(binary)|false|none|
|» nickname|body|string|false|none|
|» minHumid|body|integer(int32)|false|none|

> Example responses

> 200 Response

```json
{
  "message": "Update successful"
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

> 404 Response

```json
{
  "message": "Requested rent not found"
}
```

> 409 Response

```json
{
  "message": "Plant already exist"
}
```

<h3 id="post__rent_plantinfo-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Update successful|[GenericResponse](#schemagenericresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Requested rent not found|[GenericResponse](#schemagenericresponse)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Plant already exist|[GenericResponse](#schemagenericresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
auth & authMethod
</aside>

<h1 id="plant-manager-admin">admin</h1>

管理員 API

## get__admin_rentedInfo

> Code samples

```shell
# You can also use wget
curl -X GET http://192.168.168.83:3000/api/admin/rentedInfo \
  -H 'Accept: application/json' \
  -H 'Auth: API_KEY' \
  -H 'Auth-Method: API_KEY'

```

```http
GET http://192.168.168.83:3000/api/admin/rentedInfo HTTP/1.1
Host: 192.168.168.83:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Auth':'API_KEY',
  'Auth-Method':'API_KEY'
};

fetch('http://192.168.168.83:3000/api/admin/rentedInfo',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Auth' => 'API_KEY',
  'Auth-Method' => 'API_KEY'
}

result = RestClient.get 'http://192.168.168.83:3000/api/admin/rentedInfo',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Auth': 'API_KEY',
  'Auth-Method': 'API_KEY'
}

r = requests.get('http://192.168.168.83:3000/api/admin/rentedInfo', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Auth' => 'API_KEY',
    'Auth-Method' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://192.168.168.83:3000/api/admin/rentedInfo', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://192.168.168.83:3000/api/admin/rentedInfo");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Auth": []string{"API_KEY"},
        "Auth-Method": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://192.168.168.83:3000/api/admin/rentedInfo", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /admin/rentedInfo`

*Get rented list*

> Example responses

> 200 Response

```json
{
  "message": "string",
  "data": [
    {
      "id": 0,
      "owner": {
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "name": "string",
        "email": "string",
        "isDefaultPassword": true,
        "role": 0
      },
      "plant": {
        "name": "string",
        "intro": "string",
        "imgPath": "string",
        "nickName": "string",
        "minHumid": 0
      },
      "container": 0
    }
  ]
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

> 403 Response

```json
{
  "message": "Permission denied"
}
```

<h3 id="get__admin_rentedinfo-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Query Success|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Permission denied|[GenericResponse](#schemagenericresponse)|

<h3 id="get__admin_rentedinfo-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|
|» data|[[AdminRent](#schemaadminrent)]|false|none|none|
|»» id|integer(int32)|false|none|none|
|»» owner|[User](#schemauser)|false|none|none|
|»»» id|string(uuid)|false|none|none|
|»»» name|string|false|none|none|
|»»» email|string|false|none|none|
|»»» isDefaultPassword|boolean|false|none|none|
|»»» role|integer|false|none|none|
|»» plant|[Plant](#schemaplant)|false|none|none|
|»»» name|string|false|none|none|
|»»» intro|string|false|none|none|
|»»» imgPath|string|false|none|none|
|»»» nickName|string|false|none|none|
|»»» minHumid|integer(int32)|false|none|none|
|»» container|integer(int32)|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
auth & authMethod
</aside>

## get__admin_waitList

> Code samples

```shell
# You can also use wget
curl -X GET http://192.168.168.83:3000/api/admin/waitList \
  -H 'Accept: application/json' \
  -H 'Auth: API_KEY' \
  -H 'Auth-Method: API_KEY'

```

```http
GET http://192.168.168.83:3000/api/admin/waitList HTTP/1.1
Host: 192.168.168.83:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Auth':'API_KEY',
  'Auth-Method':'API_KEY'
};

fetch('http://192.168.168.83:3000/api/admin/waitList',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Auth' => 'API_KEY',
  'Auth-Method' => 'API_KEY'
}

result = RestClient.get 'http://192.168.168.83:3000/api/admin/waitList',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Auth': 'API_KEY',
  'Auth-Method': 'API_KEY'
}

r = requests.get('http://192.168.168.83:3000/api/admin/waitList', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Auth' => 'API_KEY',
    'Auth-Method' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://192.168.168.83:3000/api/admin/waitList', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://192.168.168.83:3000/api/admin/waitList");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Auth": []string{"API_KEY"},
        "Auth-Method": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://192.168.168.83:3000/api/admin/waitList", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /admin/waitList`

*Get rents waiting for container*

> Example responses

> 200 Response

```json
{
  "message": "string",
  "data": [
    {
      "name": "string",
      "email": "string"
    }
  ]
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

> 404 Response

```json
{
  "message": "Rent not found"
}
```

<h3 id="get__admin_waitlist-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Query Success|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Rent not found|[GenericResponse](#schemagenericresponse)|

<h3 id="get__admin_waitlist-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|
|» data|[object]|false|none|none|
|»» name|string|false|none|none|
|»» email|string|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
auth & authMethod
</aside>

## get__admin_rentedAmount

> Code samples

```shell
# You can also use wget
curl -X GET http://192.168.168.83:3000/api/admin/rentedAmount \
  -H 'Accept: application/json' \
  -H 'Auth: API_KEY' \
  -H 'Auth-Method: API_KEY'

```

```http
GET http://192.168.168.83:3000/api/admin/rentedAmount HTTP/1.1
Host: 192.168.168.83:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Auth':'API_KEY',
  'Auth-Method':'API_KEY'
};

fetch('http://192.168.168.83:3000/api/admin/rentedAmount',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Auth' => 'API_KEY',
  'Auth-Method' => 'API_KEY'
}

result = RestClient.get 'http://192.168.168.83:3000/api/admin/rentedAmount',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Auth': 'API_KEY',
  'Auth-Method': 'API_KEY'
}

r = requests.get('http://192.168.168.83:3000/api/admin/rentedAmount', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Auth' => 'API_KEY',
    'Auth-Method' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://192.168.168.83:3000/api/admin/rentedAmount', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://192.168.168.83:3000/api/admin/rentedAmount");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Auth": []string{"API_KEY"},
        "Auth-Method": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://192.168.168.83:3000/api/admin/rentedAmount", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /admin/rentedAmount`

*Get rented amount*

> Example responses

> 200 Response

```json
{
  "message": "string",
  "data": {
    "rented": 0,
    "remain": 0
  }
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

> 403 Response

```json
{
  "message": "Permission denied"
}
```

<h3 id="get__admin_rentedamount-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Query Success|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Permission denied|[GenericResponse](#schemagenericresponse)|

<h3 id="get__admin_rentedamount-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|
|» data|object|false|none|none|
|»» rented|integer|false|none|none|
|»» remain|integer|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
auth & authMethod
</aside>

## post__admin_addAdmin

> Code samples

```shell
# You can also use wget
curl -X POST http://192.168.168.83:3000/api/admin/addAdmin \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Auth: API_KEY' \
  -H 'Auth-Method: API_KEY'

```

```http
POST http://192.168.168.83:3000/api/admin/addAdmin HTTP/1.1
Host: 192.168.168.83:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "name": "string",
  "email": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Auth':'API_KEY',
  'Auth-Method':'API_KEY'
};

fetch('http://192.168.168.83:3000/api/admin/addAdmin',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Auth' => 'API_KEY',
  'Auth-Method' => 'API_KEY'
}

result = RestClient.post 'http://192.168.168.83:3000/api/admin/addAdmin',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Auth': 'API_KEY',
  'Auth-Method': 'API_KEY'
}

r = requests.post('http://192.168.168.83:3000/api/admin/addAdmin', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Auth' => 'API_KEY',
    'Auth-Method' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://192.168.168.83:3000/api/admin/addAdmin', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://192.168.168.83:3000/api/admin/addAdmin");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Auth": []string{"API_KEY"},
        "Auth-Method": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://192.168.168.83:3000/api/admin/addAdmin", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /admin/addAdmin`

*Add admin account*

> Body parameter

```json
{
  "name": "string",
  "email": "string"
}
```

<h3 id="post__admin_addadmin-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» name|body|string|false|none|
|» email|body|string|false|none|

> Example responses

> 200 Response

```json
{
  "message": "Add Success"
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

> 403 Response

```json
{
  "message": "Permission denied"
}
```

> 409 Response

```json
{
  "message": "User already exist"
}
```

<h3 id="post__admin_addadmin-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Add Success|[GenericResponse](#schemagenericresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Permission denied|[GenericResponse](#schemagenericresponse)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|User already exist|[GenericResponse](#schemagenericresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
auth & authMethod
</aside>

## put__admin_rent_{rentId}

> Code samples

```shell
# You can also use wget
curl -X PUT http://192.168.168.83:3000/api/admin/rent/{rentId} \
  -H 'Accept: application/json' \
  -H 'Auth: API_KEY' \
  -H 'Auth-Method: API_KEY'

```

```http
PUT http://192.168.168.83:3000/api/admin/rent/{rentId} HTTP/1.1
Host: 192.168.168.83:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Auth':'API_KEY',
  'Auth-Method':'API_KEY'
};

fetch('http://192.168.168.83:3000/api/admin/rent/{rentId}',
{
  method: 'PUT',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Auth' => 'API_KEY',
  'Auth-Method' => 'API_KEY'
}

result = RestClient.put 'http://192.168.168.83:3000/api/admin/rent/{rentId}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Auth': 'API_KEY',
  'Auth-Method': 'API_KEY'
}

r = requests.put('http://192.168.168.83:3000/api/admin/rent/{rentId}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Auth' => 'API_KEY',
    'Auth-Method' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://192.168.168.83:3000/api/admin/rent/{rentId}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://192.168.168.83:3000/api/admin/rent/{rentId}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Auth": []string{"API_KEY"},
        "Auth-Method": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://192.168.168.83:3000/api/admin/rent/{rentId}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /admin/rent/{rentId}`

*Set container of rent as taken*

<h3 id="put__admin_rent_{rentid}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|rentId|path|integer(int64)|true|ID of rent|

> Example responses

> 200 Response

```json
{
  "message": "Update successful"
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

> 403 Response

```json
{
  "message": "Permission denied"
}
```

> 404 Response

```json
{
  "message": "Rent not found"
}
```

> 409 Response

```json
{
  "message": "Rent already taken"
}
```

<h3 id="put__admin_rent_{rentid}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Update successful|[GenericResponse](#schemagenericresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Permission denied|[GenericResponse](#schemagenericresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Rent not found|[GenericResponse](#schemagenericresponse)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Rent already taken|[GenericResponse](#schemagenericresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
auth & authMethod
</aside>

## delete__admin_rent_{rentId}

> Code samples

```shell
# You can also use wget
curl -X DELETE http://192.168.168.83:3000/api/admin/rent/{rentId} \
  -H 'Accept: application/json' \
  -H 'Auth: API_KEY' \
  -H 'Auth-Method: API_KEY'

```

```http
DELETE http://192.168.168.83:3000/api/admin/rent/{rentId} HTTP/1.1
Host: 192.168.168.83:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Auth':'API_KEY',
  'Auth-Method':'API_KEY'
};

fetch('http://192.168.168.83:3000/api/admin/rent/{rentId}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Auth' => 'API_KEY',
  'Auth-Method' => 'API_KEY'
}

result = RestClient.delete 'http://192.168.168.83:3000/api/admin/rent/{rentId}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Auth': 'API_KEY',
  'Auth-Method': 'API_KEY'
}

r = requests.delete('http://192.168.168.83:3000/api/admin/rent/{rentId}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Auth' => 'API_KEY',
    'Auth-Method' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','http://192.168.168.83:3000/api/admin/rent/{rentId}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://192.168.168.83:3000/api/admin/rent/{rentId}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Auth": []string{"API_KEY"},
        "Auth-Method": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://192.168.168.83:3000/api/admin/rent/{rentId}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /admin/rent/{rentId}`

*Remove rent by id*

<h3 id="delete__admin_rent_{rentid}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|rentId|path|integer(int64)|true|ID of rent|

> Example responses

> 200 Response

```json
{
  "message": "Delete successful"
}
```

> 400 Response

```json
{
  "message": "Invalid header"
}
```

> 401 Response

```json
{
  "message": "Invalid JWT token"
}
```

> 403 Response

```json
{
  "message": "Permission denied"
}
```

> 404 Response

```json
{
  "message": "Rent not found"
}
```

<h3 id="delete__admin_rent_{rentid}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Delete successful|[GenericResponse](#schemagenericresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid header|[GenericResponse](#schemagenericresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid JWT token|[GenericResponse](#schemagenericresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Permission denied|[GenericResponse](#schemagenericresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Rent not found|[GenericResponse](#schemagenericresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
auth & authMethod
</aside>

# Schemas

<h2 id="tocS_User">User</h2>
<!-- backwards compatibility -->
<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "name": "string",
  "email": "string",
  "isDefaultPassword": true,
  "role": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|false|none|none|
|name|string|false|none|none|
|email|string|false|none|none|
|isDefaultPassword|boolean|false|none|none|
|role|integer|false|none|none|

<h2 id="tocS_Rent">Rent</h2>
<!-- backwards compatibility -->
<a id="schemarent"></a>
<a id="schema_Rent"></a>
<a id="tocSrent"></a>
<a id="tocsrent"></a>

```json
{
  "plant": {
    "name": "string",
    "intro": "string",
    "imgPath": "string",
    "nickName": "string",
    "minHumid": 0
  },
  "container": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|plant|[Plant](#schemaplant)|false|none|none|
|container|integer(int32)|false|none|none|

<h2 id="tocS_AdminRent">AdminRent</h2>
<!-- backwards compatibility -->
<a id="schemaadminrent"></a>
<a id="schema_AdminRent"></a>
<a id="tocSadminrent"></a>
<a id="tocsadminrent"></a>

```json
{
  "id": 0,
  "owner": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "email": "string",
    "isDefaultPassword": true,
    "role": 0
  },
  "plant": {
    "name": "string",
    "intro": "string",
    "imgPath": "string",
    "nickName": "string",
    "minHumid": 0
  },
  "container": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int32)|false|none|none|
|owner|[User](#schemauser)|false|none|none|
|plant|[Plant](#schemaplant)|false|none|none|
|container|integer(int32)|false|none|none|

<h2 id="tocS_Plant">Plant</h2>
<!-- backwards compatibility -->
<a id="schemaplant"></a>
<a id="schema_Plant"></a>
<a id="tocSplant"></a>
<a id="tocsplant"></a>

```json
{
  "name": "string",
  "intro": "string",
  "imgPath": "string",
  "nickName": "string",
  "minHumid": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|none|
|intro|string|false|none|none|
|imgPath|string|false|none|none|
|nickName|string|false|none|none|
|minHumid|integer(int32)|false|none|none|

<h2 id="tocS_AuthRequest">AuthRequest</h2>
<!-- backwards compatibility -->
<a id="schemaauthrequest"></a>
<a id="schema_AuthRequest"></a>
<a id="tocSauthrequest"></a>
<a id="tocsauthrequest"></a>

```json
{
  "email": "string",
  "password": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|false|none|none|
|password|string|false|none|none|

<h2 id="tocS_UserRegisterRequest">UserRegisterRequest</h2>
<!-- backwards compatibility -->
<a id="schemauserregisterrequest"></a>
<a id="schema_UserRegisterRequest"></a>
<a id="tocSuserregisterrequest"></a>
<a id="tocsuserregisterrequest"></a>

```json
{
  "email": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|false|none|none|

<h2 id="tocS_LoginSuccessResponse">LoginSuccessResponse</h2>
<!-- backwards compatibility -->
<a id="schemaloginsuccessresponse"></a>
<a id="schema_LoginSuccessResponse"></a>
<a id="tocSloginsuccessresponse"></a>
<a id="tocsloginsuccessresponse"></a>

```json
{
  "message": "string",
  "token": "string",
  "user": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "email": "string",
    "isDefaultPassword": true,
    "role": 0
  },
  "rents": [
    {
      "plant": {
        "name": "string",
        "intro": "string",
        "imgPath": "string",
        "nickName": "string",
        "minHumid": 0
      },
      "container": 0
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|false|none|none|
|token|string|false|none|none|
|user|[User](#schemauser)|false|none|none|
|rents|[[Rent](#schemarent)]|false|none|none|

<h2 id="tocS_GenericResponse">GenericResponse</h2>
<!-- backwards compatibility -->
<a id="schemagenericresponse"></a>
<a id="schema_GenericResponse"></a>
<a id="tocSgenericresponse"></a>
<a id="tocsgenericresponse"></a>

```json
{
  "message": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|false|none|none|

<h2 id="tocS_UserResponse">UserResponse</h2>
<!-- backwards compatibility -->
<a id="schemauserresponse"></a>
<a id="schema_UserResponse"></a>
<a id="tocSuserresponse"></a>
<a id="tocsuserresponse"></a>

```json
{
  "message": "string",
  "user": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "email": "string",
    "isDefaultPassword": true,
    "role": 0
  },
  "rents": [
    {
      "plant": {
        "name": "string",
        "intro": "string",
        "imgPath": "string",
        "nickName": "string",
        "minHumid": 0
      },
      "container": 0
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|false|none|none|
|user|[User](#schemauser)|false|none|none|
|rents|[[Rent](#schemarent)]|false|none|none|

<h2 id="tocS_OtherUserPlantResponse">OtherUserPlantResponse</h2>
<!-- backwards compatibility -->
<a id="schemaotheruserplantresponse"></a>
<a id="schema_OtherUserPlantResponse"></a>
<a id="tocSotheruserplantresponse"></a>
<a id="tocsotheruserplantresponse"></a>

```json
{
  "data": [
    {
      "plant": {
        "name": "string",
        "intro": "string",
        "imgPath": "string",
        "nickName": "string",
        "minHumid": 0
      },
      "container": 0
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[[Rent](#schemarent)]|false|none|none|

