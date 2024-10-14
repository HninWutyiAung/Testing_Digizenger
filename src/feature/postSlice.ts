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
  file: Media[]; // Use `file` to store media array
}

interface UploadPostState {
  posts: Post[];
  currentPost: Post | null;
  isLoading: boolean;
}

const initialState: UploadPostState = {
  posts: [],
  currentPost: null,
  isLoading: false,
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
    updatePost: (state, action: PayloadAction<{ index: number; post: Post }>) => {
      state.posts[action.payload.index] = action.payload.post;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    removePost: (state, action: PayloadAction<number>) => {
      state.posts.splice(action.payload, 1);
    },
    setCurrentPost: (state, action: PayloadAction<Post | null>) => {
      state.currentPost = action.payload; // Set the current post
    },
    resetCurrentUpload: (state) => {
      state.currentPost = null; // Reset current post to null
    },
  }
});

export const { setPosts, addPost, updatePost, removePost, setLoading, setCurrentPost,resetCurrentUpload } = uploadPostSlice.actions;

export default uploadPostSlice.reducer;

export const selectPosts = (state: RootState) => state.uploadPost.posts;
export const selectCurrentPost = (state: RootState) => state.uploadPost.currentPost; // Selector for currentPost
export const selectIsLoading = (state: RootState) => state.uploadPost.isLoading;
