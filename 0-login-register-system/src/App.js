import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import React, { useEffect, useState } from "react";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authUser } from "./redux/authReducer/selectors";

const App = () => {
  const [currentAuthUser, setCurrentAuthUser] = useState(useSelector(authUser));
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setCurrentAuthUser(JSON.parse(localStorage.getItem("user")));
    }
    // eslint-disable-next-line
  }, [dispatch, localStorage.getItem("user")]);

  if (currentAuthUser && location.pathname === "/signin") {
    return (
      <>
        <Navigate to={"/home"} replace />
      </>
    );
  }

  return (
    <>
        <Routes>
          <Route
            exact
            path="/"
            element={<Navigate replace to="/signin" />}
          ></Route>
          <Route
            path="/home"
            element={
              <div className="home">
                {currentAuthUser ? (
                  <div> Welcome back {currentAuthUser.name}!</div>
                ) : (
                  <Navigate to={"/signin"} replace />
                )}
              </div>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <div className="signup">
                {<SignUp />}
              </div>
            }
          ></Route>
          <Route
            path="/Signin"
            element={
              <div className="Signin">
                {<SignIn />}
              </div>
            }
          ></Route>
        </Routes>
    </>
  );
};

export default App;
