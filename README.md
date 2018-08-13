# todo-fancy

List of User routes:

|        ROUTE       | HTTP   | DESCRIPTION                 |
|:------------------:|--------|-----------------------------|
| /api/users/login   | POST   | Login                       |
| /api/users/logout  | GET    | Logout                      |
| /api/users         | GET    | Get all users               |
| /api/users         | POST   | Add new user                |
| /api/users/:userId | GET    | Get a user                  |
| /api/users/:userId | PUT    | Edit name and email of user |
| /api/users/:userId | PATCH  | Edit role of user           |
| /api/users/:userId | DELETE | Delete a user               |
  
List of Todo api routes:
  
| ROUTE              | HTTP   | DESCRIPTION    |
|--------------------|--------|----------------|
| /api/todos         | GET    | List all todos |         
| /api/todos         | POST   | Add a new todo |
| /api/todos/:todoId | GET    | Get a todo     |
| /api/todos/:todoId | PUT    | Edit a todo    |
| /api/todos/:todoId | DELETE | Delete a todo  |
  
Usage  
```
server-side:
npm install
node app.js

client-side:
live-server
```  

For testing purpose, use this test-user:  
name : Alias  
email : alias_kuupohb_alias@tfbnw.net  
password: alias123  

p.s. Alias' role is a customer, so Alias doesn't has an authorization to show all todos. Only an admin can see all todos.

[Link to the client-side](http://localhost:8080)
