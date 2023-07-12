import {FC} from 'react'
import {Image} from 'react-native'

interface ImageGridItemProps {
  imageUrl: string
  size: number
}

export const ImageGridItem: FC<ImageGridItemProps> = ({imageUrl, size}) => {
  return (
    <Image
      source={{uri: imageUrl}}
      style={{
        height: size,
        width: size,
      }}
    />
  )
}
