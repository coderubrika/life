import { v4 } from "uuid"
import { ExtraLs } from "../../External/ExtraLocalStorage"
import StorageDomains from "../Editor/Domains"
import { Entity } from "../Engine/Entity"
import '../style/styles.scss'

class Select {
    public pointerId: string

    constructor(pointerId: string) {
        this.pointerId = pointerId
    }
}

const extraLs: ExtraLs = new ExtraLs()

extraLs.connectDomain(StorageDomains.EntitiesDomain)
extraLs.connectDomain(StorageDomains.SelectedDomain)

const $createBtn = document.querySelector('button#create')
const $deleteBtn = document.querySelector('button#delete')

const $enitiesList = document.querySelector('ul#enities-list')

let entities: Entity[] = []

let $selected: HTMLElement
let select: Select

Entity.init()

$createBtn.addEventListener('click', ()=> {
    
    const entity = new Entity()
    entities.push(entity)

    const $li = document.createElement('li')

    

    $li.addEventListener('click', ()=> {

        if ($selected) {
            $selected.classList.remove('selected')
            // отменить селект
            if (select) {
                extraLs.removeFromDomainById(StorageDomains.SelectedDomain, select.pointerId)
                select = null
            }
        }

        $selected = $li
        $selected.classList.add('selected')
        window.dispatchEvent(new CustomEvent<Entity>('select', {detail: entity}))
        // назначить селект

        select = new Select(entity.id)
        extraLs.setToDomainById(StorageDomains.SelectedDomain, select.pointerId, select)
    })

    $li.textContent = entity.name
    $li.dataset.entityId = entity.id

    window.dispatchEvent(new CustomEvent<Entity>('create', {detail: entity} ))
    extraLs.setToDomainById(StorageDomains.EntitiesDomain, entity.id, entity)

    $enitiesList.append($li)

    if ($selected == null) {
        $selected = $enitiesList.querySelector(':first-child')
        // назначить селект

        select = new Select(entity.id)
        extraLs.setToDomainById(StorageDomains.SelectedDomain, select.pointerId, select)

        window.dispatchEvent(new CustomEvent<Entity>('select', {detail: entity}))

        $selected.classList.add('selected')
    }
})

$deleteBtn.addEventListener('click', ()=> {
    const finded: Entity = entities.find(entity => entity.id == $selected.dataset.entityId)

    if (!finded) return

    entities = entities.filter(entity => entity != finded)

    window.dispatchEvent(new CustomEvent<Entity>('remove', {detail: finded} ))
    extraLs.removeFromDomainById(StorageDomains.EntitiesDomain, finded.id)

    $selected.remove()
    // отменить селект
    extraLs.removeFromDomainById(StorageDomains.SelectedDomain, select.pointerId)
    select = null

    $selected = $enitiesList.querySelector(':first-child')
    if ($selected) {

        window.dispatchEvent(new CustomEvent<Entity>('remove', {detail: entities[0]} ))
        $selected.classList.add('selected')
        // назначить селект
        select = new Select(entities[0].id)
        extraLs.setToDomainById(StorageDomains.SelectedDomain, select.pointerId, select)
    }
    
    
})