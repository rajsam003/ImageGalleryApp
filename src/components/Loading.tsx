import {ActivityIndicator} from 'react-native'
import styled from 'styled-components/native'

const Loading = () => {
  return (
    <Container testID="loading">
      <ActivityIndicator />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
`

export default Loading
