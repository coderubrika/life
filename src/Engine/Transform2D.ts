import { Component } from "./Component"
import { Angle } from "./Math/Angle"
import { Vector2 } from "./Math/Vector2"

export class  Transform2D extends Component {
    private _position: Vector2 
    private _localPosition: Vector2
    
    public get localPosition(): Vector2 {
        return Vector2.copy(this._localPosition)
    }
    public set localPosition(position: Vector2) {
        this._localPosition = position
    }

    public get position(): Vector2 {
        return Vector2.copy(this._position)
    }

    public set position(position: Vector2) {
        this._position = position
    }

    public get localRotation(): Angle {
        return this._localRotation
    }
    public set localRotation(angle: Angle) {
        this._localRotation = angle
    }

    public get rotation(): Angle {
        return this._rotation
    }

    public set rotation(angle: Angle) {
        this._rotation = angle
    }

    private _rotation: Angle
    private _localRotation: Angle

    private _parent: Transform2D
    private _childrens: Transform2D[]

    constructor() {
        super()
    }

    public override update(): void {
        // приводит свои позиции через позиию родителя
    }
}