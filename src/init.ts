import { v4 as uuidv4 } from 'uuid'

import { Angle } from './Engine/Math/Angle'
import { Entity } from './Engine/Entity';
import { Component } from './Engine/Component';
import { Transform2D } from './Engine/Transform2D';
import Color from 'color'
import _ from 'lodash'
import { Cycle } from './Engine/Components/Cycle';
import { Renderer } from './Engine/Components/Renderer';
import { Vector2 } from './Engine/Math/Vector2';
import { Mover } from './App/Components/Mover';
import { Time } from './Engine/DeltaTime';
import { Rotator } from './App/Components/Rotator';
import { Ngon } from './Engine/Components/Ngon';

export function startAll() {

    const $body = document.body
    const $startBtn: HTMLButtonElement = document.createElement('button')
    const $stopBtn: HTMLButtonElement = document.createElement('button')
    const $canvas: HTMLCanvasElement = document.createElement('canvas')

    const canvasWidth = 800
    const canvasHeight = 500

    $startBtn.id = 'start'
    $startBtn.textContent = 'Start'
    $stopBtn.id = 'stop'
    $stopBtn.textContent = 'Stop'
    $canvas.id = 'canvas'
    $canvas.height = canvasHeight
    $canvas.width = canvasWidth

    $body.append($startBtn, $stopBtn, $canvas)

    // это работает по принципу проверил в сторе значение и взял оттуда, иначе начал с нуля
    Entity.init()

    // это работает по принципу игрового цикла, тоесть запускается вместе с игровым циклом и сотрудницает с ним
    Time.init()

    let context: CanvasRenderingContext2D;

    // наверное это тоже происходит на старте
    function initEntities(entities: Entity[]) {

        // это как нибудь заранее берется из окна
        context = $canvas.getContext('2d')

        // это дичь с настройками
        context.strokeStyle = '#ffffff'
        context.fillStyle = '#15122b'
        
        // этот список по идее должен настраиваться из какого нибудь окна, путем перетаскивания
        // и настройкой параметром тоже из окна
        entities.forEach (entity => {
            entity.AddComponent(new Transform2D ( new Vector2(_.random(0, 1000),_.random(0, 500)), new Angle(90)))

            const count = _.random(1, 1);

            for (let i = 0; i < count; i++) {
                entity.AddComponent(new Ngon(_.random(2, 6), _.random(3, 6)))    
            }

            entity.AddComponent(new Renderer(context)),
            entity.AddComponent(new Mover()),
            entity.AddComponent(new Rotator())
            
        })
    }

    const items: Entity[] = []

    for (let i = 0; i < 1000; i++) {
        items.push(new Entity())
    }

    initEntities(items)

    const FPS = 240

    const deltaTime = 1000 / FPS


    function tick() {
        Time.tickQuery()
        context.fillRect(0, 0, canvasWidth, canvasHeight)

        items.forEach(item => {
            const components = item.GetComponents(Object)

            for (const componentId in components) {
                components[componentId].update()
            }
        })

        items.forEach(item => {
            const components = item.GetComponents(Object)

            for (const componentId in components) {
                components[componentId].render()
            }
        })
    }

    let timerId: NodeJS.Timer = null;

    $startBtn.addEventListener('click', ()=> {
        items.forEach(item => {
            const components = item.GetComponents(Object)

            for (const componentId in components) {
                components[componentId].start()
            }
        })

        timerId = setInterval(tick, deltaTime)
    })

    $stopBtn.addEventListener('click', ()=> {
        if (timerId) {
            clearInterval(timerId)
        }
        
    })
}

