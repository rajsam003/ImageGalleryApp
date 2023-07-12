import {FC, ReactNode} from 'react'
import {FlexStyle, View, ViewStyle} from 'react-native'

interface IFlex extends FlexStyle, ViewStyle {
  children?: ReactNode
}

const Flex: FC<IFlex> = ({children, ...style}) => {
  return (
    <View
      style={{
        ...style,
      }}>
      {children}
    </View>
  )
}

export default Flex
