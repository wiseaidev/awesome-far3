import {
  fetchError,
  fetchStart,
  fetchSuccess,
} from "../redux/commonReducer/actions";
import {
  setAuthUser
} from "../redux/authReducer/actions";
import axios from "axios";

const axiosJson = () => {
  return axios.create({
    baseURL: `http://localhost:8000/api/v1/`,
    headers: { "Content-Type": "application/json" },
  });
};

const axiosJsonObject = axiosJson()

export const onRegister = (formData) => {
    return (dispatch) => {
      dispatch(fetchStart());
      axiosJsonObject
        .post(
          "auth/register",
          JSON.stringify({
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            password: formData.password,
          })
        )
        .then(({ data }) => {
          if (data.status_code === 201) {
            localStorage.setItem("token", data.token.value);
            axiosJsonObject.defaults.headers.common["Authorization"] =
              "Bearer " + data.token.value;
            dispatch(fetchSuccess(data.message));
          } else {
            dispatch(fetchError(data.message));
          }
        })
        .catch(function (error) {
          dispatch(fetchError(""));
        });
    };
}

const getAuthUser = (token, message) => {
  return (dispatch) => {
    if (!token) {
      const token = localStorage.getItem("token");
      axiosJson.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    dispatch(fetchStart());
    axiosJsonObject
      .get("user/profile")
      .then(({ data }) => {
        if (data.status_code === 200) {
          dispatch(fetchSuccess(message));
          dispatch(setAuthUser(data.user));
          // store the user in localStorage
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          dispatch(fetchError(data.message))
        }
      })
      .catch(function (error) {
        dispatch(fetchError(error));
      });
  };
}

export const onSignIn = (formData) => {
    return (dispatch) => {
      dispatch(fetchStart());
      axiosJsonObject
        .get(
          "auth/login",
          JSON.stringify({
            email: formData.email,
            password: formData.password,
          })
        )
        .then(({ data }) => {
          if (data.status_code === 201) {
            localStorage.setItem("token", data.token.value);
            axiosJsonObject.defaults.headers.common["Authorization"] =
              "Bearer " + data.token.value;
            dispatch(getAuthUser(data.token.value, data.message));            
          } else {
            dispatch(fetchError(data.message));
          }
        })
        .catch(function (error) {
          dispatch(fetchError(error));
        });
    };
}

