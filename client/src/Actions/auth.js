import * as api from "../Api";
import { setCurrentUser } from "./currentUser";

export const signup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/");
  } catch (error) {
    console.log(error);
    alert("user email id already existed");
  }
};

export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/");
  } catch (error) {
    console.log(error.message);

    switch (error.message) {
      case error.message:
        alert("Invalid email Id");
        break;
      default:
        return "no error";
    }
  }
};

export const sendotp = (authData, navigate) => async (dispatch) => {
  try {
    console.log(authData);
    const { data } = await api.sendOTP(authData);
    // alert("sent mail");
  } catch (error) {
    console.log(error);
    alert("can't send email");
  }
};
