# Authntication api 

a microservice to handle singup and authenticating users


## User Routes

  signup
  login
  logout
  me
  update
  profilePicture
  delete



## articles

``` http
  POST /api/user/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `firstName` | `string` | **Required**.   |
| `lastName` | `string` | **Required**.   |
| `email` | `string` | **Required**.   |
| `password` | `string` | **Required**.   |



> Returns:

  * Created user data



## payment

``` http
    POST /api/user/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**.   |
| `password` | `string` | **Required**.   |



> Returns:
*  User TOKEN

``` http
   POST /api/user/logout
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `header Prameter` | **Required**.   |


> Returns:
* User logedout



``` http
   PATCH /api/user/update
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `header Prameter` | **Required**.   |


> Returns:
* New user data



``` http
   PATCH /api/user/profilePicture
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `header Parameter` | **Required**.   |
| `file` | `jpg,png` | **Required**.   |


> Returns:
* Imge uploaded



``` http
   DELTE /api/user/delete
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `header Parameter` | **Required**.   |



> Returns:
* Imge uploaded




## Author
- [@AhmedRabie](https://github.com/ARMMM96)


