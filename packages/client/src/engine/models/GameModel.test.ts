import { GameModel } from '../models/GameModel'
import type { GameConfig, Size } from '../types'

describe('GameModel', () => {
  let model: GameModel
  let config: GameConfig
  let canvasSize: Size

  beforeEach(() => {
    canvasSize = { width: 800, height: 600 }

    config = {
      bird: {
        gravity: 1,
        jumpPower: 10,
        color: '#fff',
        size: { width: 40, height: 30 },
      },
      pipe: {
        speed: 2,
        gap: 150,
        width: 60,
        frequency: 5,
        color: '#0f0',
      },
      render: {
        backgroundColor: '#000',
        groundColor: '#654321',
        groundHeight: 80,
      },
    }

    model = new GameModel(canvasSize, config)
  })

  test('инициализация происходит с правильным состоянием', () => {
    const state = model.getState()

    expect(state.isRunning).toBe(false)
    expect(state.isGameOver).toBe(false)
    expect(state.score).toBe(0)
    expect(state.frameCount).toBe(0)

    expect(state.bird.position.x).toBe(canvasSize.width / 4)
    expect(state.bird.position.y).toBe(canvasSize.height / 2)
    expect(state.bird.isAlive).toBe(true)
  })

  test('start() запускает игру', () => {
    model.start()
    expect(model.getState().isRunning).toBe(true)
  })

  test('jump() задаёт птице скорость прыжка', () => {
    model.start()
    model.jump()

    const state = model.getState()
    expect(state.bird.velocity).toBe(config.bird.jumpPower)
  })

  test('update() не работает если игра не запущена', () => {
    model.update()
    expect(model.getState().frameCount).toBe(0)
  })

  test('update() увеличивает frameCount при запущенной игре', () => {
    model.start()
    model.update()
    expect(model.getState().frameCount).toBe(1)
  })

  test('updateBird() применяет гравитацию', () => {
    model.start()
    const before = model.getState().bird.position.y

    model.update()

    const after = model.getState().bird.position.y
    expect(after).toBe(before + 1)
  })

  test('addPipe() создаёт новую трубу по частоте кадров', () => {
    model.start()

    for (let i = 0; i < 5; i++) {
      model.update()
    }

    const state = model.getState()
    expect(state.pipes.length).toBe(1)
  })

  test('трубы двигаются влево', () => {
    model.start()

    for (let i = 0; i < 5; i++) model.update()

    const beforeX = model.getState().pipes[0].position.x

    model.update()

    const afterX = model.getState().pipes[0].position.x
    expect(afterX).toBe(beforeX - config.pipe.speed)
  })

  test('начисляется очко при прохождении трубы', () => {
    model.start()

    for (let i = 0; i < 5; i++) model.update()

    let state = model.getState()
    const pipe = state.pipes[0]

    pipe.position.x = state.bird.position.x - pipe.width - 1

    model.update()

    state = model.getState()
    expect(state.score).toBe(1)
  })

  test('столкновение с землёй завершает игру', () => {
    model.start()

    const state = model.getState()
    state.bird.position.y = canvasSize.height - config.render.groundHeight

    model.update()

    const newState = model.getState()
    expect(newState.isGameOver).toBe(true)
    expect(newState.isRunning).toBe(false)
    expect(newState.bird.isAlive).toBe(false)
  })

  test('столкновение с потолком завершает игру', () => {
    model.start()

    const state = model.getState()
    state.bird.position.y = -10

    model.update()

    const newState = model.getState()
    expect(newState.isGameOver).toBe(true)
  })

  test('reset() возвращает игру в начальное состояние', () => {
    model.start()
    model.jump()
    model.update()

    model.reset()

    const state = model.getState()
    expect(state.frameCount).toBe(0)
    expect(state.score).toBe(0)
    expect(state.pipes.length).toBe(0)
    expect(state.isRunning).toBe(false)
  })

  test('resize() корректно масштабирует координаты', () => {
    model.start()
    model.update()

    const stateBefore = model.getState()
    const beforeX = stateBefore.bird.position.x
    const beforeY = stateBefore.bird.position.y

    model.resize({ width: 1600, height: 1200 })

    const stateAfter = model.getState()

    expect(stateAfter.bird.position.x).toBe(beforeX * 2)
    expect(stateAfter.bird.position.y).toBe(beforeY * 2)
  })
})
