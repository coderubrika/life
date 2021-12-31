import { Component } from "./Component"
import { Angle } from "./Math/Angle"
import { Vector2 } from "./Math/Vector2"

export class  Transform2D extends Component {
    private _position: Vector2 
    //private _localPosition: Vector2
    
    // public get localPosition(): Vector2 {
    //     return this._localPosition
    // }
    // public set localPosition(position: Vector2) {
    //     this._localPosition = position
    // }

    public get position(): Vector2 {
        return this._position
    }

    public set position(position: Vector2) {
        this._position = position
    }

    // public get localRotation(): Angle {
    //     return this._localRotation
    // }
    // public set localRotation(angle: Angle) {
    //     this._localRotation = angle
    // }

    public get rotation(): Angle {
        return this._rotation
    }

    public set rotation(angle: Angle) {
        this._rotation = angle
    }

    private _rotation: Angle
    //private _localRotation: Angle

    private _parent: Transform2D

    public get parent(): Transform2D {
        return this._parent
    }

    public set parent(parent: Transform2D) {
        this._parent = parent 
    }

    private _childrens: Transform2D[]

    constructor(/*parent: Transform2D, */position: Vector2, angle: Angle) {
        super()

        //this.parent = parent
        this.position = position
        this.rotation = angle

    }

    public override update() {
        // приводит свои позиции через позиию родителя
    }
}