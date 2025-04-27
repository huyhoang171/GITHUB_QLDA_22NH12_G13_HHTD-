// redux/reducers/lessonReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MarkedLessonsState {
  [key: number]: boolean;
}

interface LessonState {
  markedLessons: MarkedLessonsState;
  message: string | null;
  error: string | null;
}

interface MarkLessonPayload {
  lessonId: number;
  isMarked: boolean;
}

const initialState: LessonState = {
  markedLessons: {},
  message: null,
  error: null,
};

const lessonSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    markLesson: (state, action: PayloadAction<MarkLessonPayload>) => {
      const { lessonId, isMarked } = action.payload;
      state.markedLessons = {
        ...state.markedLessons,
        [lessonId]: isMarked
      };
      state.message = isMarked ? 'Lesson marked as completed!' : 'Lesson mark removed';
    },
    clearMessage: (state) => {
      state.message = null;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    }
  }
});

export const { markLesson, clearMessage, setError } = lessonSlice.actions;
export default lessonSlice.reducer;