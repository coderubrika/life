import { Vector2 } from "../Math/Vector2";
import { Mesh} from "./Mesh";

export class Ngon extends Mesh {
    constructor(radius: number, anglesCount: number) {
        const path: Vector2[] = []

        for (let i = 0; i < anglesCount; i++) {
            const x = radius * Math.cos(2 * Math.PI * i / anglesCount)
            const y = radius * Math.sin(2 * Math.PI * i / anglesCount)

            path.push(new Vector2(x, y))
        }

        super(path)
    }
}