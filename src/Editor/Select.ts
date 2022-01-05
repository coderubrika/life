import { v4 } from "uuid"

export class Select {
    public id: string

    constructor(public pointerId: string, public selectType: string) {
        this.id = v4()
    }
}

export class SelectEntity extends Select {
    constructor(public pointerId: string) {
        super(pointerId, 'entity')
    }
}
