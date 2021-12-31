import { Component } from "./Component"

type Components = { [id: string]: Component } 

export class Entity {
    private static entityId: number
    private components: Components
    public name: string
    

    constructor(name?: string) {
        this.name = name || 'Entity_' + Entity.entityId.toString()
        this.components = {}
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