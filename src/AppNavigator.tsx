import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {Home} from './screens'
import {Comments, ImageCarousel} from './modal'

const Stack = createNativeStackNavigator()

export type AppNavigationScreens = {
  Home: undefined
  ImageCarousel: {selectedImageIndex: number}
  Comments: undefined
}

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="ImageCarousel"
        component={ImageCarousel}
        options={{gestureDirection: 'vertical'}}
      />
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  )
}

export default AppNavigator
