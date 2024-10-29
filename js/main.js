'use strict';

const saveData= document.querySelector('.js-saveData');
const recoverData= document.querySelector('.js-recoverData');
const listUsers = document.querySelector('.js-listUsers');

saveData.addEventListener('click', saveUsersToLs)
recoverData.addEventListener('click', getUsersFromLs)

let dataUsers = []
let friendsList = []

function renderUsers(data){
  listUsers.innerHTML = ""
  
  for(let i=0; i<data.length; i++){
    listUsers.innerHTML+=`<li id="${data[i].id.value}" class="user userElement">
    <p>${data[i].name.first + ' ' + data[i].name.first}</p>
    <p>${data[i].location.city}</p>
    <p>${data[i].login.username}</p>
    <img src="${data[i].picture.medium}"/>

    </li>`
  }
  const users = document.querySelectorAll(".user")

  addListenerUsers(users) 
}

function addListenerUsers(usersList) {
  for(const user of usersList) {
    user.addEventListener('click', (e) => {
      handleClickFriend(user, e)
    })
  }
}

function handleClickFriend(userEl, e) {
console.log(e, userEl)
  dataUsers = dataUsers.map(user => {
    if(user.id.value === userEl.id){
      user = {...user, isFriend: true}
      console.log(user)
    }

    return user
  })

  addClassFriend(e.currentTarget)
}

function addClassFriend(element) {
  element.classList.remove('userElement')
  element.classList.add('userFriend')
}

function getUsers() {
  fetch('https://randomuser.me/api/?results=10')
  .then(response => response.json())
  .then(data => {
    dataUsers = data.results
    renderUsers(dataUsers)
  });
}

function saveUsersToLs() {
  const usersParse = JSON.stringify(dataUsers);

  localStorage.setItem('users', usersParse)
}

function getUsersFromLs() {
  const usersFromLs = JSON.parse(localStorage.getItem('users'))

  if(usersFromLs && usersFromLs.length > 0){
    dataUsers = usersFromLs
    renderUsers(dataUsers)
  }
}

getUsers();
