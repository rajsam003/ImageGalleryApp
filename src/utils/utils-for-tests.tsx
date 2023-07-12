import {NavigationContainer} from '@react-navigation/native'
import store from '@src/redux/store'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactElement} from 'react'
import {render} from '@testing-library/react-native'
import {Provider} from 'react-redux'

const queryClient = new QueryClient()

export const renderWithWrapper = (component: ReactElement) => {
  const jsx = (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NavigationContainer>{component}</NavigationContainer>
      </Provider>
    </QueryClientProvider>
  )

  return render(jsx)
}
