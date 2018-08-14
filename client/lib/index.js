const base_url = "http://localhost:3000"

$(document).ready(function(){
    $("#home").click(function(){
        window.location.href = "index.html"
    })

    $("#todo").click(function(){
        window.location.href = "todo.html"
        })

    $("#listTodos").click(function(){
       //1. GET /api/todos
        const token = localStorage.getItem("token")
        const id = localStorage.getItem("id")
        const current_user = sessionStorage.current_user
        $.ajax({
            type: 'GET',
            url : `${base_url}/api/todos`,
            headers: {
                "token": token,
                "id" : id,
                "session": current_user,
            }
        })
       .then(todos=>{
            if(!todos.length){
                $("#info").addClass("error").text("No todos");
            }else{
                todos.forEach(todo=>{
                    addTodo(todo)
                })
            }
            $("#listTodos").remove()
       })
       .catch(err=>{
           console.log(err)
       })
    })

    $("#login").click(function(){
        window.location.href = "login.html"
    })

    $("#logout").click(function(){
        window.location.href = "logout.html"

    })

    $("#logoutBtn").click(function(){
        if(sessionStorage.getItem('current_user')!==null){
            $("span").addClass("success").text(`Sayonara, ${sessionStorage.getItem('current_user')}!`)
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            sessionStorage.removeItem('current_user');
            console.log('successfully clearing localStorage and sessionStorage')
        }
        $("#logoutBtn").remove()
    })

    //2. POST /api/todos
    $("#todoInput").keypress(event=>{
        if(event.which == 13){ //to check if an enter key is pressed
            //create todo
            createTodo();
        }
    })

    //3. DELETE /api/todos/:todoId
    $('.list').on('click','span', function(event){
        event.stopPropagation(); //span is inside the li, so we need this method to stop the event (from no 4) from bubbling up 
        removeTodo($(this).parent())
    })

    //4. PUT /api/todos/:todoId =>to update the status to be completed/incompleted
    $('.list').on('click', 'li', function(){
        updateTodo($(this).parent().prevObject)
        
    })
});

function addTodo(todo){
    const newTodo = $('<li class="task">'+todo.name +' <span> X</span></li>')
    newTodo.data('id', todo._id); //this is the method to store the data (here is the todo._id) we get from the server
    newTodo.data('completed', todo.completed) //to store the todo.completed
    if(todo.completed){
      newTodo.addClass("done")  
    }
    $('.list').append(newTodo)
   
}

function createTodo(){
    const userInput = $('#todoInput').val();
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const current_user = sessionStorage.current_user;
    //send request to create new todo
    $.ajax({
        type: 'POST',
        url : `${base_url}/api/todos`,
        headers: {
            "token": token,
            "id": id,
            "session": current_user
        },
        data: {
            "name" : userInput //it becomes req.body.repoName in server
        }
    })
    .then(newTodo=>{
        $('#todoInput').val(""); //to clear the input
        addTodo(newTodo)
    })
    .catch(err=>{
        console.log(err)
        $("#info").addClass("error").text(err.responseText)
    })
}

function updateTodo(todo){
    const clickedId = todo.data('id');
    const isDone = !todo.data('completed'); //false becomes true
    const updateData = {completed : isDone};
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const current_user = sessionStorage.current_user
    $.ajax({
        method : "PUT",
        url: `${base_url}/api/todos/${clickedId}`,
        headers: {
            "token": token,
            "id": id,
            "session": current_user
        },
        data: updateData
    })
    .then(updatedTodo=>{
        todo.toggleClass("done"); //updating the view
        todo.data('completed', isDone); //updating the todo.data('completed'). if the current data is false, it's updated to true and vice versa
    })
    .catch(err=>{
        console.log(err)
        $("#info").addClass("error").text(err.responseText)
    })
}

function removeTodo(todo){
    const clickedId = todo.data('id') 
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const current_user = sessionStorage.current_user
   
    $.ajax({
        method: "DELETE",
        url: `${base_url}/api/todos/${clickedId}`,
        headers: {
            "token": token,
            "id":id,
            "session": current_user
        },
    })
    .then(data=>{
      todo.remove();
    })
    .catch(err=>{
        console.log(err)
        $("#info").addClass("error").text(err.responseText)
    })
}
