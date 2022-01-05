import React, { useEffect, useRef, useState } from "react";
import { ExtraLs } from "../../../External/ExtraLocalStorage";
import { StorageConnection } from "../../../External/ExtraLocalStorage/StorageConnection";
import StorageDomains from "../../Editor/Domains";
import { Entity } from "../../Engine/Entity";



const HierarchyApp = () => {
    const [entities, setEntities] = useState<Entity[]>([])

    const extraLsRef = useRef<ExtraLs>(new ExtraLs())
    const entitiesConnectionRef = useRef<StorageConnection>(extraLsRef.current.connectDomain(StorageDomains.EntitiesDomain))
    const selectConnectionRef = useRef<StorageConnection>(extraLsRef.current.connectDomain(StorageDomains.SelectedDomain))

    function onUpdateEntities() {
        setEntities(entitiesConnectionRef.current.getAll())
        
    }


    useEffect(()=>{
        entitiesConnectionRef.current.OnAddCallback = onUpdateEntities
        entitiesConnectionRef.current.OnRemoveCallback = onUpdateEntities
        
    }, [])

    return (
        <>

            <ul>
                {
                    entities.map(
                        (entity, index) => <li key={index}>{entity.name}</li>
                    )
                }
            </ul>
        </>
    )
}


export default HierarchyApp