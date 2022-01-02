import { Entity } from "../Engine/Entity"

// при нажатии на кнопку создать, я хочу создавать энтити и отображать его имя в списке
const $createBtn = document.querySelector('button#create')
const $deleteBtn = document.querySelector('button#delete')

const $enitiesList = document.querySelector('ul#enities-list')

const entities: Entity[] = []

Entity.init()

$createBtn.addEventListener('click', ()=> {
    
    const entity = new Entity()
    entities.push(entity)

    while ($enitiesList.firstChild) {
        $enitiesList.removeChild($enitiesList.firstChild);
    }

    // отрисовываем список в соотвествии с массивом
    entities.forEach( entity => {
        const $li = document.createElement('li')
        $li.textContent = entity.name
        $enitiesList.append($li)
    } )
})

$deleteBtn.addEventListener('click', ()=> {
    
})