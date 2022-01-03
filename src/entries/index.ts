import { ExtraLs } from "../../External/ExtraLocalStorage"
import StorageDomains from "../Editor/Domains"
import { Entity } from "../Engine/Entity"

const $openHierarchyBtn = document.querySelector('button#open-hierarchy')
const $openInspectorBtn = document.querySelector('button#open-inspector')

const extraLs: ExtraLs = new ExtraLs()

extraLs.connectDomain(StorageDomains.EntitiesDomain)
extraLs.connectDomain(StorageDomains.SelectedDomain)

extraLs.setOnAddedCallback(StorageDomains.EntitiesDomain, (params)=> {
    console.log(`added: ${params}`)
    extraLs.commitAnDomain(StorageDomains.EntitiesDomain)
})

extraLs.setOnRemovedCallback(StorageDomains.EntitiesDomain, (params)=> {
    console.log(`removed: ${params}`)
    extraLs.commitAnDomain(StorageDomains.EntitiesDomain)
})

let $hierarchyWindow: Window, $inspectorWindow: Window

let entities: Entity[] = []

$openHierarchyBtn.addEventListener('click', ()=> {
    $hierarchyWindow = window.open(
        '/Hierarchy.html', 
        "_blank", 
        //"left=0,top=0,width=320,height=640,menubar=no,toolbar=no,location=no"
    )    

    $hierarchyWindow.addEventListener('create', (event: CustomEvent<Entity>) => {
        entities.push(event.detail)
    })

    $hierarchyWindow.addEventListener('remove', (event: CustomEvent<Entity>) => {
        entities = entities.filter(entity => entity.id !== event.detail.id)       
    })

    $hierarchyWindow.addEventListener('select', (event: CustomEvent<Entity>) => {
        console.log(event.detail.name);
    })
})
$openInspectorBtn.addEventListener('click', ()=> {
    $inspectorWindow = window.open(
        '/Inspector.html', 
        "_blank", 
        //"right=0,top=0,width=320,height=640,menubar=no,toolbar=no,location=no"
    )    
})



