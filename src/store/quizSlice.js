import { createSlice } from '@reduxjs/toolkit';

import { getRandomList } from '../utils/getRandomList';
import { QUIZ, QUIZ_LENGTH, SCORES } from '../constants/quiz';

const name = QUIZ;
const initialState = {
  questions: [],
  currentQuestion: null,
  isImageLoaded: false,
  isOverBreaking: false,
  userInput: '',
  message: '',
  score: 0,
};

const quizSlice = createSlice({
  name,
  initialState,
  reducers: {
    saveQuizData(state, action) {
      const allQuestions = Object.values(action.payload);
      const randomQuestions = getRandomList(allQuestions);

      state.questions = randomQuestions.slice(0, QUIZ_LENGTH);
      state.currentQuestion = state.questions.pop();
      state.currentQuestion.level = 1;
    },
    activateSubmit(state) {
      state.isImageLoaded = true;
    },
    activateForm(state) {
      state.isOverBreaking = true;
    },
    showMessage(state, action) {
      state.message = action.payload;
    },
    showAnswerBoxByInput(state, action) {
      state.userInput = action.payload;
    },
    passNextLevel(state) {
      const currentLevel = state.currentQuestion.level;
      const nextQuestion = state.questions.pop();
      nextQuestion.level = currentLevel + 1;
      state.currentQuestion = nextQuestion;

      state.score += SCORES[`lv${currentLevel}`];
    },
  },
});

export const {
  saveQuizData,
  activateSubmit,
  activateForm,
  showMessage,
  showAnswerBoxByInput,
  passNextLevel,
} = quizSlice.actions;

export default quizSlice.reducer;
