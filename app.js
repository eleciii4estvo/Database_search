const list= document.querySelector('#list')
const filter = document.querySelector('#filter')
let USERS = []

filter.addEventListener('input', (event)=>{  //Обрабатывает каждый введенный символ
    // console.log(event.target.value)   //Выводит написанный текст после каждого введенного символа  
    const value = event.target.value.toLowerCase()    
    const filtredUsers = USERS.filter((user)=>{
        return user.name.toLowerCase().includes(value)
    })
    render(filtredUsers)
})

async function start(){
    list.innerHTML='Loading...'
    try {
        
        const resp = await fetch('https://jsonplaceholder.typicode.com/users')     //Get запрос на сервер к json файлу. Возвращает promise
        const data = await resp.json()
        USERS=data
        render(data)

        
    } catch (error) {
        list.innerHTML='Something went wrong... Try again later'
    }
}

function render(users=[]){
    if (users.length!=0){
        const html=users.map(toHTML).join('')
        list.innerHTML=html
    } else{
        list.innerHTML=`No users found`
    }

}

function toHTML(user){
    return`
        <li class="list_item">${user.name}</li>
    `
}

start()