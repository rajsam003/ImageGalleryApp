import {FC} from 'react'
import {styled} from 'styled-components/native'

interface IInput {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  numberOfLines?: number
  multiline?: boolean
}

const Input: FC<IInput> = ({
  value,
  onChangeText,
  placeholder,
  numberOfLines,
  multiline,
}) => {
  return (
    <StyledTextInput
      placeholder={placeholder}
      editable
      multiline={multiline ? true : false}
      numberOfLines={numberOfLines}
      onChangeText={onChangeText}
      value={value}
    />
  )
}

const StyledTextInput = styled.TextInput`
  border-bottom-width: 1px;
  padding: 10px;
  padding-right: 45px;
`

export default Input
