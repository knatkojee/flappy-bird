import { render, screen } from '@testing-library/react'
import Home from './Home'

jest.mock('./ActionsBlock/ActionsBlock', () => ({
  default: () => <div data-testid="actions-block" />,
}))

jest.mock('@/components/common/Icon/Icon', () => ({
  InfoHeart: () => <div data-testid="icon-heart" />,
  InfoTrophy: () => <div data-testid="icon-trophy" />,
  InfoUsers: () => <div data-testid="icon-users" />,
  InfoZap: () => <div data-testid="icon-zap" />,
}))

jest.mock('@/hooks/useYandexAuth', () => ({
  useYandexAuth: jest.fn(),
}))

describe('Home page', () => {
  beforeEach(() => {
    render(<Home />)
  })

  test('рендерится главный заголовок', () => {
    expect(screen.getByText(/Добро пожаловать в/i)).toBeInTheDocument()
  })

  test('ActionsBlock два раза', () => {
    expect(screen.getAllByTestId('actions-block')).toHaveLength(2)
  })

  test('блок преимуществ присутствует', () => {
    expect(screen.getByText('Увлекательно')).toBeInTheDocument()
    expect(screen.getByText('Сообщество')).toBeInTheDocument()
    expect(screen.getByText('Бесконечное веселье')).toBeInTheDocument()
  })

  test('иконки отрисованы', () => {
    expect(screen.getByTestId('icon-zap')).toBeInTheDocument()
    expect(screen.getByTestId('icon-trophy')).toBeInTheDocument()
    expect(screen.getByTestId('icon-users')).toBeInTheDocument()
    expect(screen.getByTestId('icon-heart')).toBeInTheDocument()
  })

  test('секция "Как играть?" есть', () => {
    expect(screen.getByText('Как играть?')).toBeInTheDocument()
  })
})
