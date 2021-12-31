import { v4 as uuidv4 } from 'uuid'
import { Entity } from './Entity'

export abstract class Component {
    protected _entity: Entity
    public get entity(): Entity {
        return this._entity
    }
    public set entity(_entity: Entity) {
        this._entity = _entity
    }

    public readonly id: string
    
    public update() {

    }

    public start() {
        
    }
    public render() {
        
    }
    constructor() {
        this.id = uuidv4()
    }
}