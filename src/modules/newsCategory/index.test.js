import newsCategory, { setCategory } from './index';

const SET_CATEGORY = 'newsCategory/SET_CATEGORY';

let payload;
beforeAll(() => {
  payload = { title: 'test1', category: 'test-category' };
});

describe('category action test', () => {
  it('should send selected category', () => {
    const expected = { type: SET_CATEGORY, payload };
    const action = setCategory(payload);
    expect(action).toEqual(expected);
  });
});

describe('category reducer test', () => {
  it('should return new selected category', () => {
    const expected = { ...payload };
    const state = newsCategory(undefined, setCategory(payload));
    expect(state).toEqual(expected);
  });

  it('should return original state because the action send selected category(original)', () => {
    const initialState = { ...payload };
    const newState = newsCategory(initialState, setCategory(initialState));

    expect(newState).toBe(initialState);
  });
});
