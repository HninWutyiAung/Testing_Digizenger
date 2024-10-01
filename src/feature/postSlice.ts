import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

enum PostType {
  Everyone = "EVERYONE",
  Neighbor = "NEIGHBOR",
  Follower = "FOLLOWER",
}

interface Media {
  mediaUrl: string;
  mediaType: 'IMAGE' | 'VIDEO';
}

interface Post {
  description: string;
  postType: PostType;
  file: Media[];
}

interface UploadPostState {
  posts: Post[];
}

const initialState: UploadPostState = {
  posts: [],
};

const uploadPostSlice = createSlice({
  name: 'uploadPost',
  initialState,
  reducers: {

    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },

    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },

    updatePost: (state, action: PayloadAction<{ index: number, post: Post }>) => {
      state.posts[action.payload.index] = action.payload.post;
    },

 
    removePost: (state, action: PayloadAction<number>) => {
      state.posts.splice(action.payload, 1);
    }
  }
});

export const { setPosts, addPost, updatePost, removePost } = uploadPostSlice.actions;

export default uploadPostSlice.reducer;
export const selectPosts = (state: RootState) => state.uploadPost.posts;

