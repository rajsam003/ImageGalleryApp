import axios from 'axios'
import {useQuery} from '@tanstack/react-query'
import {useDispatch} from 'react-redux'
import {setImages} from '@src/redux/reducers/imageReducer'

const BASE_URL = 'http://localhost:3000/api'

const getImages = async () => {
  const response = await axios.get(`${BASE_URL}/images`)
  return response.data.images
}

export const useImagesQueryAPI = () => {
  const dispatch = useDispatch()
  const results = useQuery(['Images'], getImages, {
    onSuccess: response => {
      dispatch(setImages(response))
    },
  })
  return results
}
