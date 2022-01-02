import { Component } from "./Component"
import { v4 } from 'uuid'

type Components = { [id: string]: Component } 

export class Entity {
    private static entityId: number
    private components: Components
    public name: string
    public id: string

    constructor(name?: string) {
        this.name = name || 'Entity_' + Entity.entityId.toString()
        this.id = v4()
        this.components = {}
        Entity.entityId += 1
    }

    public static init() {        
        Entity.entityId = 0
    }

    public GetComponents(Type: any): any[] {
        const components:  any[] = []

        for (const componentId in this.components) {
            if (this.components[componentId] instanceof Type) {
                components.push(this.components[componentId])
            }
        }

        return components
    }

    public GetComponent(Type: any): any {
        for (const componentId in this.components) {
            if (this.components[componentId] instanceof Type) {
                return this.components[componentId]
            }
        }
        return null
    }

    public AddComponent(component: Component) {
        component.entity = this
        this.components[component.id] = component

    }
}