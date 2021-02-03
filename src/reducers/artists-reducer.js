const initialState = {
  currentArtist: null,
  status: 'loading',
  error: null
};

const artistsReducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default artistsReducer;
