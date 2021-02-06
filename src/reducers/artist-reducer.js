const initialState = {
  currentArtist: null,
  status: "idle",
};

export default function artistReducer(state = initialState, action) {
  switch (action.type) {
    case "INITIAL_DATA_FETCH": {
      return {
        ...state,
        status: "loading",
      };
    }

    case "SUCCESFUL_DATA_RESPONSE": {
      return {
        status: "idle",
        currentArtist: {
          profile: {
            ...action.data,
            external_urls: {...action.data.external_urls},
            followers: {...action.data.followers},
            genres: {...action.data.genres},
            images: {...action.data.images},
          },
        },
      };
    }

    case "ERROR_DATA_RESPONSE": {
      return {
        ...state,
        status: "error",
      };
    }

    default: {
      return state;
    }
  }
}
