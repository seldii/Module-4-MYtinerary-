import axios from "axios";
import {
  GET_ITINERARIES,
  GET_ITINERARY,
  CREATE_ITINERARY,
  DELETE_ITINERARY,
  UPDATE_ITINERARY,
  GET_ITINERARIES_BY_CITYNAME,
  GET_ITINERARIES_BY_USER
} from "./types";
import { setError } from "./errorActions";
import { tokenConfig } from "./authActions";

export const getItineraries = () => async dispatch => {
  const res = await axios.get("/itineraries");
  dispatch({
    type: GET_ITINERARIES,
    payload: res.data
  });
};

export const getItinerary = id => async dispatch => {
  try {
    const res = await axios.get(`/itineraries/${id}`);
    dispatch({
      type: GET_ITINERARY,
      payload: res.data
    });
  } catch (err) {
    console.log(err.response.data);
  }
};

export const getItinerariesByCity = cityName => async dispatch => {
  try {
    const res = await axios.get(`/itineraries/itineraries/${cityName}`);
    dispatch({
      type: GET_ITINERARIES_BY_CITYNAME,
      payload: res.data
    });
  } catch (err) {
    console.log(err.response.data);
  }
};

//GET ITINERARIES BY USER

export const getItinerariesByUser = userName => async dispatch => {
  try {
    const res = await axios.get(`/itineraries/profile/${userName}`);
    dispatch({
      type: GET_ITINERARIES_BY_USER,
      payload: res.data
    });
  } catch (err) {
    console.log(err.response.data);
  }
};

export const updateItinerary = (id, itinerary) => async (
  dispatch,
  getState
) => {
  try {
    const res = await axios.patch(
      `/itineraries/${id}`,
      itinerary,
      tokenConfig(getState)
    );
    dispatch({
      type: UPDATE_ITINERARY,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setError(error.msg)));
    }
  }
};
export const createItinerary = newItinerary => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      "/itineraries",
      newItinerary,
      tokenConfig(getState)
    );
    dispatch({
      type: CREATE_ITINERARY,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setError(error.msg)));
    }
  }
};

export const deleteItinerary = id => async (dispatch, getState) => {
  try {
    await axios.delete(`/itineraries/${id}`, tokenConfig(getState));
    dispatch({
      type: DELETE_ITINERARY,
      payload: id
    });
  } catch (err) {
    console.log(err.response.data);
  }
};

export const unlike = (id, user) => async getState => {
  try {
    await axios.delete(`/itineraries/${id}${user}`, tokenConfig(getState));
  } catch (err) {
    console.log(err.response.data);
  }
};
