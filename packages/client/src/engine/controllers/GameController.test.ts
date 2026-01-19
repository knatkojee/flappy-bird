import { GameModel } from '../models/GameModel'
import { GameView } from '../views/GameView'
import { GameController } from './GameController'
import type { GameConfig, GameState } from '../types'

jest.mock('../models/GameModel')
jest.mock('../views/GameView')

describe('gameController', () => {
  let canvas: HTMLCanvasElement
  let controller: GameController
  let mockModel: jest.Mocked<GameModel>
  let mockView: jest.Mocked<GameView>

  const config: GameConfig = {
    bird: {
      gravity: 0.5,
      jumpPower: 8,
      color: '#fff',
      size: { width: 40, height: 30 },
    },
    pipe: {
      speed: 2,
      gap: 150,
      width: 60,
      frequency: 90,
      color: '#0f0',
    },
    render: {
      backgroundColor: '#000',
      groundColor: '#654321',
      groundHeight: 80,
    },
  }

  const baseState: GameState = {
    bird: {
      position: { x: 100, y: 200 },
      velocity: 0,
      isAlive: true,
    },
    pipes: [],
    score: 0,
    isRunning: false,
    isGameOver: false,
    frameCount: 0,
  }

  let modelInstance: jest.Mocked<GameModel>
  let viewInstance: jest.Mocked<GameView>

  beforeEach(() => {
    canvas = document.createElement('canvas')
    canvas.width = 800
    canvas.height = 600

    modelInstance = {
      start: jest.fn(),
      stop: jest.fn(),
      reset: jest.fn(),
      update: jest.fn(),
      jump: jest.fn(),
      resize: jest.fn(),
      getState: jest.fn(() => ({ ...baseState })),
      getConfig: jest.fn(() => config),
    } as unknown as jest.Mocked<GameModel>

    viewInstance = {
      render: jest.fn(),
      resize: jest.fn(),
    } as unknown as jest.Mocked<GameView>
    ;(GameModel as jest.Mock).mockImplementation(() => modelInstance)
    ;(GameView as jest.Mock).mockImplementation(() => viewInstance)

    controller = new GameController(canvas, config)

    mockModel = modelInstance
    mockView = viewInstance
  })

  test('метод start запускает игру', () => {
    controller.start()
    expect(mockModel.start).toHaveBeenCalled()
  })

  test('stop() вызывает model.stop()', () => {
    controller.stop()
    expect(mockModel.stop).toHaveBeenCalled()
  })

  test('метод jump вызывает прыжок', () => {
    controller.jump()

    expect(mockModel.jump).toHaveBeenCalled()
  })

  test('метод reset перезапускает игру', () => {
    const stopSpy = jest.spyOn(controller, 'stop')
    const startSpy = jest.spyOn(controller, 'start')

    controller.reset()

    expect(stopSpy).toHaveBeenCalled()
    expect(mockModel.reset).toHaveBeenCalled()
    expect(startSpy).toHaveBeenCalled()
  })

  test('метод resize меняет размер экрана', () => {
    controller.resize({ width: 800, height: 600 })

    expect(mockModel.resize).toHaveBeenCalledWith({ width: 800, height: 600 })
    expect(mockView.resize).toHaveBeenCalledWith(800, 600)
  })

  test('метод destroy останавливает игру', () => {
    const stopSpy = jest.spyOn(controller, 'stop')
    controller.destroy()

    expect(stopSpy).toHaveBeenCalled()
  })
})
