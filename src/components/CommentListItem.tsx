import {FC} from 'react'
import {Text} from 'react-native'
import {Button, Flex} from '@src/ui'
import styled from 'styled-components/native'

interface CommentListItemProps {
  text: string
  onEditPress?: () => void
  onDeletePress?: () => void
}

const CommentListItem: FC<CommentListItemProps> = ({
  text,
  onEditPress,
  onDeletePress,
}) => {
  return (
    <Container>
      <Flex flex={1} flexDirection="row" justifyContent="flex-end">
        <Button onPress={onEditPress}>Edit</Button>
        <Button onPress={onDeletePress}>Delete</Button>
      </Flex>
      <Text>{text}</Text>
    </Container>
  )
}

const Container = styled.View`
  padding-top: 10px;
  padding-bottom: 10px;
  border-top-width: 1px;
  border-top-color: grey;
`

export default CommentListItem
