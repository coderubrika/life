import './styles.scss';

class Entity {
    private static entityId: number
    private components: Component[] 
    public name: string
    

    constructor(name?: string) {
        this.name = name || 'Entity_' + Entity.entityId.toString()
    }

    public static init() {
        Entity.entityId = 0
    }

    public GetComponents(): Component[] {
        return this.components
    }
}

abstract class Component {
    public abstract update(): void
}

Entity.init()

const items = [
    new Entity(),
    new Entity(),
    new Entity(),
    new Entity(),
    new Entity(),
    new Entity()
]

const FPS = 60

const deltaTime = 1000 / FPS


function tick() {
    items.forEach(item => {
        const components = item.GetComponents()

        components.forEach(component => {
            component.update()
        })
    })
}

const timerId = setTimeout(tick, deltaTime)