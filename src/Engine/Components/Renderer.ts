import { Component } from "../Component";
import { Vector2 } from "../Math/Vector2";
import { Transform2D } from "../Transform2D";
import { Mesh } from "./Mesh";

export class Renderer extends Component {
    private meshes: Mesh[]
    private transform: Transform2D

    public override start() {
        this.meshes = this._entity.GetComponents(Mesh)
        this.transform = this._entity.GetComponent(Transform2D)
    }

    private drawPath(path: Vector2[]) {
        this.context.beginPath()

        const centerPosition: Vector2 = this.transform.position

        const realPath: Vector2[] = []
        for (let i = 0; i < path.length; i++) {
            const x = path[i].x * Math.cos(this.transform.rotation.phi) + path[i].y * Math.sin(this.transform.rotation.phi)
            const y = path[i].y * Math.cos(this.transform.rotation.phi) - path[i].x * Math.sin(this.transform.rotation.phi)

            realPath.push(new Vector2(x, y))
        }

        const positionStart: Vector2 = centerPosition.sum(realPath[0])

        this.context.moveTo(positionStart.x, positionStart.y)
        
        for (let i = 1; i < realPath.length; i++) {
            const position = centerPosition.sum(realPath[i])
            this.context.lineTo(position.x, position.y)
        }

        this.context.lineTo(positionStart.x, positionStart.y)

        this.context.stroke()
    }

    public override render() {
        if (this.meshes.length > 0) {
            for ( const mesh of this.meshes ) {
                this.drawPath(mesh.path)
            }
        }
    }

    constructor (protected context: CanvasRenderingContext2D) {
        super()       
    }
}