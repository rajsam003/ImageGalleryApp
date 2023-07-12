import {Flex} from '@src/ui'
import React from 'react'
import {Dimensions, Image} from 'react-native'

const {width: windowWidth, height: windowHeight} = Dimensions.get('window')

const ImageView = React.memo(({imageUrl}: {imageUrl: string}) => {
  return (
    <Flex
      height={windowHeight}
      width={windowWidth}
      justifyContent="center"
      alignItems="center">
      <Image
        source={{uri: imageUrl}}
        style={{width: '100%', height: '100%', resizeMode: 'contain'}}
      />
    </Flex>
  )
})

export default ImageView
