const initialState = {
  currentArtist: null,
  status: "loading",
  error: null,
};

export default function artistReducer(state = initialState, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
