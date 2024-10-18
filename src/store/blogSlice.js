import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blog',
  initialState: { blog: null },

  reducers: {
    addBlog: (state, action) => {
      state.blog = { ...state.blog, ...action.payload }
    },

    removeBlog: state => {
      state.blog = null
    },
  },
})

export const { addBlog, removeBlog } = blogSlice.actions
export const blogReducer = blogSlice.reducer