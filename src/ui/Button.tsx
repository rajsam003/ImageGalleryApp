import {FC} from 'react'
import {StyleProp, Text, ViewStyle} from 'react-native'
import {styled} from 'styled-components/native'

interface IButton {
  children: string
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

const Button: FC<IButton> = ({children, onPress, style}) => {
  return (
    <StyledButton onPress={onPress} style={style}>
      <Text>{children}</Text>
    </StyledButton>
  )
}

const StyledButton = styled.Pressable`
  background-color: lightgrey;
  border-radius: 5px;
  padding: 4px;
  margin-left: 5px;
  justify-content: center;
  align-items: center;
`

export default Button
