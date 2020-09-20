import { createAction, handleActions } from 'redux-actions';

const SET_CATEGORY = 'newsCategory/SET_CATEGORY';

export const setCategory = createAction(SET_CATEGORY);

const initialState = {
  title: '전체',
  category: 'all',
};

const newsCategory = handleActions(
  {
    [SET_CATEGORY]: (state, { payload }) => {
      const { title: stateTitle, category: stateCategory } = state;
      const { title, category } = payload;

      if (stateTitle === title && stateCategory === category) {
        return state;
      }

      return { title, category };
    },
  },
  initialState
);

export default newsCategory;
