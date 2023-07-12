import {screen} from '@testing-library/react-native'
import Home from './Home'
import {renderWithWrapper} from '@src/utils/utils-for-tests'

// Mocking useImagesQueryAPI hook
jest.mock('@src/services/useImagesQueryAPI', () => ({
  __esModule: true,
  useImagesQueryAPI: jest.fn(),
}))

// Mocking useSelector hook
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}))

const mockUseImagesQueryAPI = jest.requireMock(
  '@src/services/useImagesQueryAPI',
)

test('renders loading state initially', async () => {
  // Mocking loading state
  mockUseImagesQueryAPI.useImagesQueryAPI.mockReturnValue({
    isLoading: true,
  })

  renderWithWrapper(<Home />)

  const loadingElement = screen.getByTestId('loading')
  expect(loadingElement).toBeDefined()
})

test('renders error state', async () => {
  // Mocking error state
  mockUseImagesQueryAPI.useImagesQueryAPI.mockReturnValue({
    isLoading: false,
    error: {
      message: 'Failed to fetch images',
    },
  })

  renderWithWrapper(<Home />)

  const errorElement = screen.getByText('Failed to fetch images')
  expect(errorElement).toBeDefined()
})

test('renders empty state', async () => {
  mockUseImagesQueryAPI.useImagesQueryAPI.mockReturnValue({
    isLoading: false,
    error: null,
  })

  renderWithWrapper(<Home />)

  const emptyElement = screen.getByText('No photos available')
  expect(emptyElement).toBeDefined()
})
