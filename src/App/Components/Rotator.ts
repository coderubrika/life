
import _ from "lodash";
import { Component } from "../../Engine/Component";
import { Time } from "../../Engine/DeltaTime";
import { Transform2D } from "../../Engine/Transform2D";

export class Rotator extends Component {
    private transform: Transform2D
    private speed: number

    public override start() {
        this.transform = this.entity.GetComponent(Transform2D)
        this.speed =  _.random(1,10)
    }

    public override update() {
        this.transform.rotation.phi += this.speed * Time.deltaTime
    }
}