import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

//we cannot call async function inside reducer hence we introduced thunks
// a thunk is a middleware that sits between the dispatching and the reducer itself. it will do something with dispatch action before updating the store.
// we will use createAsyncThunk(actionTypeName, async function body)
// createAsyncThunk will produce three additional action types one for the pending promise state, one for the fullfilled state and one for rejected state

export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in.
    // This data { position, address } will become Payload of the FULFILLED state
    return { position, address };
  }
);

const initialState = {
  userName: '',
  status: 'idle',
  position: {},
  address: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = 'idle';
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        state.error =
          'There was a problem getting your address. Make sure to fill this field!';
      }),
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;



// import { createSlice } from "@reduxjs/toolkit"

// const initialState = {
//   userName : ''
// }

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     updateName(state,action){
//       state.userName = action.payload
//     }
//   }
// })

// export const {updateName} = userSlice.actions

// export default userSlice.reducer