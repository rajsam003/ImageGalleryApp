import {FlatList} from 'react-native'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import uuid from 'react-native-uuid'

import {
  Comment,
  ImagesState,
  addComment,
  deleteComment,
  editComment,
} from '@src/redux/reducers/imageReducer'
import {Button, Flex, Input} from '@src/ui'
import {EmptyState, CommentListItem} from '@src/components'
import {styled} from 'styled-components/native'

const Comments = () => {
  const [text, setText] = useState('')
  const [commentToEdit, setCommentToEdit] = useState<Comment | null>(null)
  const [allComments, setAllComments] = useState<Comment[]>([])

  const dispatch = useDispatch()
  const selectedImage = useSelector(
    (state: {image: ImagesState}) => state.image.selectedImage,
  )
  const comments = selectedImage?.comments || []

  useEffect(() => {
    // Update allComments when comments change
    setAllComments(comments)
  }, [comments])

  const handleAddComment = () => {
    if (!!text) {
      if (!!commentToEdit) {
        // Editing an existing comment
        const commentIndex = allComments.findIndex(
          cmt => cmt.id === commentToEdit?.id,
        )
        if (commentIndex !== -1) {
          dispatch(
            editComment({
              imageId: selectedImage!.id,
              id: commentToEdit.id,
              updatedText: text,
            }),
          )
          setAllComments(prevComments => {
            const updatedComments = [...prevComments]
            updatedComments[commentIndex].text = text
            return updatedComments
          })
        }
      } else {
        // Adding a new comment
        const newComment = {
          id: uuid.v4().toString(),
          text,
        }
        dispatch(addComment({imageId: selectedImage?.id!, ...newComment}))
        setAllComments([...allComments, newComment])
      }

      setText('')
      setCommentToEdit(null)
    }
  }

  const handleEditComment = (comment: Comment) => {
    setText(comment.text)
    setCommentToEdit(comment)
  }

  const handleDeleteComment = (commentId: string) => {
    setAllComments(allComments.filter(cmt => cmt.id !== commentId))
    dispatch(deleteComment({imageId: selectedImage?.id!, commentId}))
  }

  return (
    <Flex flex={1} padding={10}>
      <Flex flex={1}>
        <FlatList
          data={allComments}
          contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end'}}
          ListEmptyComponent={<EmptyState text="No comments yet" />}
          renderItem={({item}) => {
            return (
              <CommentListItem
                text={item.text}
                onEditPress={() => handleEditComment(item)}
                onDeletePress={() => handleDeleteComment(item.id)}
              />
            )
          }}
        />
      </Flex>
      <Flex>
        <Input
          placeholder="Add comments..."
          multiline
          numberOfLines={4}
          onChangeText={text => setText(text)}
          value={text}
        />
        <ButtonView>
          <Button onPress={handleAddComment}>
            {!!commentToEdit ? 'Update' : 'Add'}
          </Button>
        </ButtonView>
      </Flex>
    </Flex>
  )
}

const ButtonView = styled.View`
  position: absolute;
  right: 0px;
  bottom: 10px;
`

export default Comments
