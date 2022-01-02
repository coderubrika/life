import { Entity } from "../Engine/Entity"
import '../style/styles.scss'

// теперь настала пора немного отрефракторить это дело и подтянуть в localStorage, потом можно воспользоваться монгой, 
// тк она позволяет запихивать в себя json хотя можно и бд, но пока что все что угодно 

const ls: Storage = window.localStorage



// как будет работать локал сторадре там будут списки с id и update c id а также флаг needtoupdate для каждой
// сущности

// в общем сдесь будет все записывать, а в index буду все читать и проверть

// при нажатии на кнопку создать, я хочу создавать энтити и отображать его имя в списке
const $createBtn = document.querySelector('button#create')
const $deleteBtn = document.querySelector('button#delete')

const $enitiesList = document.querySelector('ul#enities-list')

let entities: Entity[] = []

let $selected: HTMLElement

Entity.init()

$createBtn.addEventListener('click', ()=> {
    
    const entity = new Entity()
    entities.push(entity)

    const $li = document.createElement('li')

    $li.addEventListener('click', ()=> {

        if ($selected) {
            $selected.classList.remove('selected')
        }

        $selected = $li
        $selected.classList.add('selected')
        window.dispatchEvent(new CustomEvent<Entity>('select', {detail: entity}))
    })

    $li.textContent = entity.name
    $li.dataset.entityId = entity.id

    window.dispatchEvent(new CustomEvent<Entity>('create', {detail: entity} ))

    $enitiesList.append($li)

    if ($selected == null) {
        $selected = $enitiesList.querySelector(':first-child')
        
        window.dispatchEvent(new CustomEvent<Entity>('select', {detail: entity}))

        $selected.classList.add('selected')
    }
})

$deleteBtn.addEventListener('click', ()=> {
    const finded: Entity = entities.find(entity => entity.id == $selected.dataset.entityId)
    entities = entities.filter(entity => entity != finded)

    window.dispatchEvent(new CustomEvent<Entity>('remove', {detail: finded} ))

    $selected.remove()
    $selected = $enitiesList.querySelector(':first-child')
    if ($selected) {

        window.dispatchEvent(new CustomEvent<Entity>('remove', {detail: entities[0]} ))
        $selected.classList.add('selected')
    }
    
    
})