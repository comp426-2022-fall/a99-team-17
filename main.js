let addToDoButton = document.getElementById('addToDo');
let toDoContainer = document.getElementById('toDoContainer');
let inputField = document.getElementById('inputField');


addToDoButton.addEventListener('click', function(){
    var paragraph = document.createElement('p');
    paragraph.classList.add('paragraph-styling');
    paragraph.innerText = inputField.value;
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

    fetch('/clicked', {method: 'POST'})
    .then(function(response) {
        if(response.ok) {
            console.log('Click was recorded');
            return;
        } throw new Error('Request failed.');
    })
    .catch(function(error) {
        console.log(error);
    });
});

setInterval(function() {
    fetch('/clicks', {method: 'GET'})
      .then(function(response) {
        if(response.ok) return response.json();
        throw new Error('Request failed.');
      })
      .then(function(data) {
        document.getElementById('counter').innerHTML = `Button was clicked ${data.length} times`;
      })
      .catch(function(error) {
        console.log(error);
      });
  }, 1000);