import {FC} from 'react'
import {Text} from 'react-native'
import styled from 'styled-components/native'

interface ErrorStateProps {
  error: {
    message?: string
  }
}

const ErrorState: FC<ErrorStateProps> = ({error}) => {
  return (
    <Container>
      <Text>{error.message || 'Something went wrong'}</Text>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export default ErrorState
