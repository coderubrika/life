import { Component } from "./Component"

type Components = { [id: string]: Component } 

export class Entity {
    private static entityId: number
    private components: Components
    public name: string
    

    constructor(name?: string) {
        this.name = name || 'Entity_' + Entity.entityId.toString()
    }

    public static init() {
        Entity.entityId = 0
    }

    public GetComponents(): Components {
        return this.components
    }

    public AddComponent(component: Component) {
        component.entity = this
        this.components[component.id] = component

    }
}