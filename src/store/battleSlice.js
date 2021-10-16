import { createSlice } from '@reduxjs/toolkit';

const name = 'battle';
const initialState = {
  rooms: null,
  roomId: '',
  breakers: null,
  name: '',
  id: '',
  opponentId: '',
  opponentLevel: 1,
};

const battleSlice = createSlice({
  name,
  initialState,
  reducers: {
    saveRoomData(state, action) {
      state.rooms = action.payload;
    },
    saveRoomId(state, action) {
      state.roomId = action.payload;
    },
    saveBattle(state, action) {
      state.breakers = action.payload;
    },
    saveName(state, action) {
      state.name = action.payload;
    },
    saveId(state, action) {
      const { id, opponentId } = action.payload;
      state.opponentId = opponentId;
      state.id = id;
    },
    saveOpponentLevel(state, action) {
      state.opponentLevel += 1;
    },
  },
});

export const {
  saveRoomData,
  saveRoomId,
  saveBattle,
  saveName,
  saveId,
  saveOpponentLevel,
} = battleSlice.actions;

export default battleSlice.reducer;
