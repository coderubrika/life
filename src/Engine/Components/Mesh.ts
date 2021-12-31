import { Component } from "../Component";
import { Vector2 } from "../Math/Vector2";

export class Mesh extends Component {
    constructor(public readonly path: Vector2[]) {
        super()
    }
}