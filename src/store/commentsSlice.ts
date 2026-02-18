import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {api } from '../api'
import type { Comment } from '../types/Comment'

interface CommentsState {
  comments: Comment[]
  loading: boolean
  error: string | null
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null
}

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async () => {
    const response = await api.getComments()
    return response
  }
)

export const addComment = createAsyncThunk(
  'comments/add',
  async (comment: Omit<Comment, 'id'>) => {
    return api.createComment(comment)
  }
)

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (id: number) => {
    await api.deleteComment(id)
    return id
  }
)

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => { state.loading = true })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        state.loading = false
        state.comments = action.payload
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error'
      })
      .addCase(addComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        state.comments.push(action.payload)
      })
      .addCase(deleteComment.fulfilled, (state, action: PayloadAction<number>) => {
        state.comments = state.comments.filter(c => c.id !== action.payload)
      })
  }
})

export default commentsSlice.reducer
