export class Vector2 {
    public x: number
    public y: number

    constructor(x?: number, y?: number ) {
        this.x = x || 0
        this.y = y || 0
    }

    public sum(vector2: Vector2) {
        return new Vector2(this.x + vector2.x, this.y + vector2.y)
    }

    public dif(vector2: Vector2) {
        return new Vector2(vector2.x - this.x, vector2.y - this.y)
    }

    public scale(factor: number) {
        return new Vector2(this.x * factor, this.y * factor)
    }

    public dot(vector2: Vector2) {
        return new Vector2(this.x * vector2.x, this.y * vector2.y)
    }

    public static copy(vector: Vector2) {
        return new Vector2(vector.x, vector.y)
    }

    public static get zero() {
        return new Vector2()
    }

    public static get one() {
        return new Vector2(1,1)
    }

    public static get up() {
        return new Vector2(0,1)
    }

    public static get left() {
        return new Vector2(-1,0)
    }
    public static get right() {
        return new Vector2(1,0)
    }
}