import { ExtraLs } from "../../External/ExtraLocalStorage"
import { StorageConnection } from "../../External/ExtraLocalStorage/StorageConnection"
import StorageDomains from "../Editor/Domains"
import { Entity } from "../Engine/Entity"
import { startAll } from "../init"

const $openHierarchyBtn = document.querySelector('button#open-hierarchy')
const $openInspectorBtn = document.querySelector('button#open-inspector')

const extraLs: ExtraLs = new ExtraLs()

const entitiesConnection: StorageConnection = extraLs.connectDomain(StorageDomains.EntitiesDomain)
const selectConnection: StorageConnection = extraLs.connectDomain(StorageDomains.SelectedDomain)

entitiesConnection.OnAddCallback = (params)=> {
    console.log(`added: ${params}`)
}

entitiesConnection.OnRemoveCallback = (params)=> {
    console.log(`removed: ${params}`)
}

$openHierarchyBtn.addEventListener('click', ()=> {
    window.open(
        '/Hierarchy.html', 
        "_blank", 
        //"left=0,top=0,width=320,height=640,menubar=no,toolbar=no,location=no"
    )    
})
$openInspectorBtn.addEventListener('click', ()=> {
    window.open(
        '/Inspector.html', 
        "_blank", 
        //"right=0,top=0,width=320,height=640,menubar=no,toolbar=no,location=no"
    )    
})



