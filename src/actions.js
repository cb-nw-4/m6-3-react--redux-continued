export const requestAccessToken = () => ({
    type: "REQUEST_ACCESS_TOKEN",
  });
  
  export const receiveAccessToken = (token) => ({
    type: "RECEIVE_ACCESS_TOKEN",
    token,
  });
  
  export const receiveAccessTokenError = () => ({
    type: "RECEIVE_ACCESS_TOKEN_ERROR",
  });

  export const initialDataFetch = () => ({
    type: "INITIAL_DATA_FETCH",
  });

  export const succesfulDataResponse = (data) => ({
    type: "SUCCESFUL_DATA_RESPONSE",
    data,
  });

  export const errorDataResponse = () => ({
    type: "ERROR_DATA_RESPONSE",
  });