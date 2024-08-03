// likedProjectsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LikedProjectsState {
  likedProjects: string[];
}

const initialState: LikedProjectsState = {
  likedProjects: [],
};

const likedProjectsSlice = createSlice({
  name: 'likedProjects',
  initialState,
  reducers: {
    likeProjectAction: (state, action: PayloadAction<string>) => {
      state.likedProjects.push(action.payload);
    },
  },
});

const likedProjectsReducer = likedProjectsSlice.reducer;

export const { likeProjectAction } = likedProjectsSlice.actions;
export default likedProjectsReducer;
