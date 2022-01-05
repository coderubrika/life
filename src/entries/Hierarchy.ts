import { v4 } from "uuid"
import { ExtraLs } from "../../External/ExtraLocalStorage"
import { StorageConnection } from "../../External/ExtraLocalStorage/StorageConnection"
import StorageDomains from "../Editor/Domains"
import { SelectEntity } from "../Editor/Select"
import { Entity } from "../Engine/Entity"
import '../style/styles.scss'

import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "../React/Hierarcy/App"

const $root = document.getElementById('root-react')

ReactDOM.render(React.createElement(App), $root)


const extraLs: ExtraLs = new ExtraLs()

const entitiesConnection: StorageConnection = extraLs.connectDomain(StorageDomains.EntitiesDomain)
const selectConnection: StorageConnection = extraLs.connectDomain(StorageDomains.SelectedDomain)

const $createBtn = document.querySelector('button#create')
const $deleteBtn = document.querySelector('button#delete')

const $enitiesList = document.querySelector('ul#enities-list')

let entities: Entity[] = []

let $selected: HTMLElement
let select: SelectEntity

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
                selectConnection.remove(select.id)
                select = null
            }
        }

        $selected = $li
        $selected.classList.add('selected')
        // назначить селект

        select = new SelectEntity(entity.id)
        selectConnection.add(select.id, select)
    })

    $li.textContent = entity.name
    $li.dataset.entityId = entity.id

    entitiesConnection.add(entity.id, entity)

    $enitiesList.append($li)

    if ($selected == null) {
        $selected = $enitiesList.querySelector(':first-child')
        // назначить селект

        select = new SelectEntity(entity.id)
        selectConnection.add(select.id, select)

        $selected.classList.add('selected')
    }
})

$deleteBtn.addEventListener('click', ()=> {
    const finded: Entity = entities.find(entity => entity.id == $selected.dataset.entityId)

    if (!finded) return

    entities = entities.filter(entity => entity != finded)

    entitiesConnection.remove(finded.id)

    $selected.remove()
    // отменить селект
    selectConnection.remove(select.id)
    select = null

    $selected = $enitiesList.querySelector(':first-child')
    if ($selected) {

        $selected.classList.add('selected')
        // назначить селект
        select = new SelectEntity(entities[0].id)
        selectConnection.add(select.id, select)
    }
    
    
})