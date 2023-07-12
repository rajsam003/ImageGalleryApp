import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface Comment {
  id: string
  text: string
}

export interface Image {
  id: string
  url: string
  comments: Comment[]
}

export interface ImagesState {
  images: Image[]
  selectedImage: Image | null
}

const initialState: ImagesState = {
  images: [],
  selectedImage: null,
}

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<Image[]>) => {
      state.images = action.payload
    },
    selectImage: (state, action: PayloadAction<Image>) => {
      state.selectedImage = action.payload
    },
    clearSelectedImage: state => {
      state.selectedImage = null
    },
    addComment: (
      state,
      action: PayloadAction<{imageId: string; id: string; text: string}>,
    ) => {
      const {imageId, id, text} = action.payload
      const imageIndex = state.images.findIndex(img => img.id === imageId)
      if (imageIndex !== -1) {
        const updatedImages = [...state.images]
        const imageToUpdate = updatedImages[imageIndex]
        const newComment = {
          id,
          text,
        }
        imageToUpdate.comments.push(newComment)
        state.images = updatedImages
      }
    },
    editComment: (
      state,
      action: PayloadAction<{
        imageId: string
        id: string
        updatedText: string
      }>,
    ) => {
      const {imageId, id, updatedText} = action.payload
      console.log('IMAGE :: ', imageId)
      const image = state.images.find(img => img.id === imageId)
      if (image) {
        const comment = image.comments.find(cmt => cmt.id === id)
        if (comment) {
          comment.text = updatedText
        }
      }
    },
    deleteComment: (
      state,
      action: PayloadAction<{imageId: string; commentId: string}>,
    ) => {
      const {imageId, commentId} = action.payload
      const image = state.images.find(img => img.id === imageId)
      if (image) {
        const index = image.comments.findIndex(
          comment => comment.id === commentId,
        )
        if (index !== -1) {
          image.comments.splice(index, 1)
        }
      }
    },
  },
})

export const {
  setImages,
  selectImage,
  clearSelectedImage,
  addComment,
  editComment,
  deleteComment,
} = imageSlice.actions

export default imageSlice.reducer
