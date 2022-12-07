import { json } from "express";

let addToDoButton = document.getElementById('addToDo');
let toDoContainer = document.getElementById('toDoContainer');
let inputField = document.getElementById('inputField');


addToDoButton.addEventListener('click', async() => {
    console.log("HELLO")
    const response = await fetch('http://localhost:5555/clicks')

    const data = await response.json()
    console.log(data)
 
    var paragraph = document.createElement('p');
    paragraph.classList.add('paragraph-styling');
    paragraph.innerText = inputField.value;

    // const request = await fetch('http://localhost:5555/clicks', {method: "POST", body: JSON.stringify({
    //     todo: paragraph.innerText
    // })})
    //const todo = await request.json()
    //console.log(todo)
    
    toDoContainer.appendChild(paragraph);
    inputField.value = "";
    paragraph.addEventListener('click', function(){
        paragraph.style.textDecoration = 'line-through';
    })
    paragraph.addEventListener('dblclick', function(){
       paragraph.style.textDecoration = 'none';
    })
    paragraph.addEventListener('click', function(x){
        if(x.detail === 3){
            toDoContainer.removeChild(paragraph);
        }
    })
});