console.log('Connected');

let page = 1;  //global variable that holds the page number
let limit = 50;

document.addEventListener("DOMContentLoaded",()=>{
    

    fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
    .then(response => response.json())
    .then(function(monsters){
        monsters.forEach(function(monster){
            renderMonster(monster);
        })
    });

    const forwardButton = document.querySelector('#forward');
    forwardButton.addEventListener('click', nextPageOfMonsters)

    const monsterForm = document.querySelector('#new-monster-form')
    monsterForm.addEventListener('submit', createNewMonster);
})

function renderMonster(monster){
    //ALL MONSTER CONTAINER DIV
    let allMonsters = document.querySelector('#monster-container');

    //create div is container, h2 which is name, h4 is age and p tag is bio
    let monsterContainer = document.createElement('div');
    let monsterName = document.createElement('h2');
    let monsterAge = document.createElement('h4');
    let monsterBio = document.createElement('p') 

    //adding the values in the tags
    monsterName.innerText = monster.name;
    monsterAge.innerText = monster.age;
    monsterBio.innerText = monster.description;


    //appending everything to the monster container div
    monsterContainer.appendChild(monsterName)
    monsterContainer.appendChild(monsterAge);
    monsterContainer.appendChild(monsterBio);

    //append the individual monster container to all monster container
    allMonsters.appendChild(monsterContainer);
}

function nextPageOfMonsters(event){
    let allMonsters = document.querySelector('#monster-container');
    allMonsters.innerText = "";

    page++ //will update what page we are going to be at

    fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
    .then(response => response.json())
    .then(function(monsters){
        monsters.forEach(function(monster){
            renderMonster(monster);
        })
    });
}

function createNewMonster(event) {
    event.preventDefault();
    console.log('you have submitted the form');

    let newMonsterName = document.getElementById('monster-name').value;
    let newMonsterAge = document.getElementById('monster-age').value;
    let newMonsterBio = document.getElementById('monster-bio').value;

   
    fetch('http://localhost:3000/monsters',{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify( {
            name: newMonsterName,
            age: newMonsterAge,
            description: newMonsterBio
        })
    })
    .then(response => response.json())
    .then(function(monster){
        console.log(monster)
        renderMonster(monster);
    })
    .catch(error => console.log(error));
}