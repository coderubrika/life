import './styles.scss';
import { v4 as uuidv4 } from 'uuid'

import { Vector2 } from './Engine/Math/Vector2'
import { Angle } from './Engine/Math/Angle'
import { Entity } from './Engine/Entity';
import { Component } from './Engine/Component';
import { Transform2D } from './Engine/Transform2D';




Entity.init()

const entity1 :Entity = new Entity()
const entity2 :Entity = new Entity()
const entity3 :Entity = new Entity()
const entity4 :Entity = new Entity()
const entity5 :Entity = new Entity()
const entity6 :Entity = new Entity()

function initEntities(entities: Entity[]) {
    entities.forEach (entity => {
        entity.AddComponent(new Transform2D())
    })
}

const items = [
    entity1,
    entity2,
    entity3,
    entity4,
    entity5,
    entity6,
]

initEntities(items)

const FPS = 60

const deltaTime = 1000 / FPS


function tick() {

    // здесь нужно предусмотреть древовидную структуру позиций и знать что у всех есть свой трансформ

    items.forEach(item => {
        const components = item.GetComponents()

        for (let componentId in components) {
            components[componentId].update()
        }
    })
}

let timerId: NodeJS.Timer = null;

const $buttonStart = document.querySelector('button#start') 
const $buttonStop = document.querySelector('button#stop')

$buttonStart.addEventListener('click', ()=> {
    timerId = setInterval(tick, deltaTime)
})

$buttonStop.addEventListener('click', ()=> {
    if (timerId) {
        clearInterval(timerId)
    }
    
})