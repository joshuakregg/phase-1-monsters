const div = document.getElementById('monster-container')
const form = document.querySelector('form')
const forwardButton = document.getElementById('forward')
const backButton = document.getElementById('back')
let pageNumber = 1

function getMonsters(pageNumber) {
fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
    .then(res => res.json())
    .then(data => data.forEach(element => {
        let p = document.createElement('p')
        
        p.innerText = element.name
       div.appendChild(p)
        let p1 = document.createElement('p')
        p1.innerText = element.age
       div.appendChild(p1)
        let p2 = document.createElement('p')
        p2.innerText = element.description
       div.appendChild(p2)
    }))}
    getMonsters()
    forwardButton.addEventListener('click', (event) => {
        event.preventDefault()
        div.innerHTML = ""
        pageNumber += 1
        getMonsters(pageNumber)
    })
    backButton.addEventListener('click', (event) => {
        while(pageNumber > 0){
        event.preventDefault()
        div.innerHTML = ""
        pageNumber -= 1
        getMonsters(pageNumber)
    }})
    
form.addEventListener('submit',(event) => {
    event.preventDefault()    
    makeRequest(event.target.children[1].value, event.target.children[3].value, event.target.children[5].value)
})

function makeRequest(name, age, description) { 
        fetch('http://localhost:3000/monsters',{
          method: 'POST',
          headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      
      body: JSON.stringify({
        "name": name,
        "age": age,
        "description": description
      })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let p = document.createElement('p')
        
            p.innerText = data.name
           div.appendChild(p)
            let p1 = document.createElement('p')
            p1.innerText = data.age
           div.appendChild(p1)
            let p2 = document.createElement('p')
            p2.innerText = data.description
           div.appendChild(p2)
        })
}