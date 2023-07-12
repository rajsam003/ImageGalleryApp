import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import {Dimensions, FlatList, Pressable} from 'react-native'
import {useCallback, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {AppNavigationScreens} from '@src/AppNavigator'
import {Image, ImagesState, selectImage} from '@src/redux/reducers/imageReducer'
import {ImageView} from '@src/components'
import {Button} from '@src/ui'
import {styled} from 'styled-components/native'

type ImageCarouselRoute = RouteProp<AppNavigationScreens, 'ImageCarousel'>

const ImageCarousel = () => {
  const navigation = useNavigation<NavigationProp<AppNavigationScreens>>()
  const windowWidth = Dimensions.get('window').width
  const {selectedImageIndex} = useRoute<ImageCarouselRoute>().params
  const dispatch = useDispatch()
  const [isCommentButtonEnabled, setCommentButtonEnabled] = useState(false)
  const images = useSelector(
    (state: {image: ImagesState}) => state.image.images,
  )

  const toggleCommentButton = () => {
    setCommentButtonEnabled(prev => !prev)
  }

  const renderItem = ({item}: {item: Image}) => {
    return (
      <Pressable onPress={toggleCommentButton}>
        <ImageView imageUrl={item.url} />
        {isCommentButtonEnabled && (
          <ButtonView>
            <Button
              onPress={() => {
                navigation.navigate('Comments')
                dispatch(selectImage(item))
              }}>
              Comments
            </Button>
          </ButtonView>
        )}
      </Pressable>
    )
  }

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    getItemLayout: useCallback(
      (_: any, index: number) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      [],
    ),
  }

  return (
    <FlatList
      data={images}
      style={{flex: 1, backgroundColor: 'black'}}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      initialScrollIndex={selectedImageIndex}
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      {...flatListOptimizationProps}
    />
  )
}

const ButtonView = styled.View`
  position: absolute;
  bottom: 20px;
  border-radius: 5px;
  background-color: white;
  align-self: center;
`

export default ImageCarousel
