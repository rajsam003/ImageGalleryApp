import {
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native'
import {NavigationProp, useNavigation} from '@react-navigation/native'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Image, ImagesState, selectImage} from '@src/redux/reducers/imageReducer'
import {EmptyState, ErrorState, Loading} from '@src/components'
import {useImagesQueryAPI} from '@src/services/useImagesQueryAPI'
import {AppNavigationScreens} from '@src/AppNavigator'
import {Flex} from '@src/ui'
import {ImageGridItem} from '@src/components/ImageGridItem'

const NUM_COLUMNS = 3

const Home = () => {
  const navigation = useNavigation<NavigationProp<AppNavigationScreens>>()
  const initialScreenWidth = Dimensions.get('window').width
  const [screenWidth, setScreenWidth] = useState(initialScreenWidth)
  const dispatch = useDispatch()
  const images = useSelector(
    (state: {image: ImagesState}) => state.image.images,
  )
  const {isLoading, error} = useImagesQueryAPI()

  useEffect(() => {
    const updateOrientation = () => {
      setScreenWidth(Dimensions.get('window').width)
    }

    const dimensionsHandler = Dimensions.addEventListener(
      'change',
      updateOrientation,
    )

    return () => {
      dimensionsHandler.remove()
    }
  }, [])

  if (isLoading) return <Loading />

  if (error) return <ErrorState error={error} />

  if (!images) return <EmptyState />

  const renderImages = ({item, index}: {item: Image; index: number}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ImageCarousel', {selectedImageIndex: index})
        dispatch(selectImage(item))
      }}>
      <Flex flex={1} alignItems="center">
        <ImageGridItem imageUrl={item.url} size={screenWidth / NUM_COLUMNS} />
      </Flex>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView>
      <FlatList
        data={images}
        showsVerticalScrollIndicator={false}
        initialNumToRender={20}
        renderItem={renderImages}
        keyExtractor={item => item.id.toString()}
        numColumns={NUM_COLUMNS}
      />
    </SafeAreaView>
  )
}

export default Home
