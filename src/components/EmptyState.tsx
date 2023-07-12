import {Text} from 'react-native'
import styled from 'styled-components/native'

const EmptyState = ({text}: {text?: string}) => {
  return (
    <Container>
      <Text>{text || 'No photos available'}</Text>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export default EmptyState
