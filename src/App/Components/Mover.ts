
import _ from "lodash";
import { Component } from "../../Engine/Component";
import { Time } from "../../Engine/DeltaTime";
import { Transform2D } from "../../Engine/Transform2D";

export class Mover extends Component {
    private transform: Transform2D
    private speedX: number
    private speedY: number

    public override start() {
        this.transform = this.entity.GetComponent(Transform2D)
        this.speedX =  _.random(-10,100)
        this.speedY =  _.random(-4,100)
    }

    public override update() {

        if (this.transform.position.x > 1020) {
            this.transform.position.x = -20
        }

        if (this.transform.position.y > 520) {
            this.transform.position.y = -20
        }

        this.transform.position.y += this.speedY * Time.deltaTime
        this.transform.position.x += this.speedX * Time.deltaTime
    }
}