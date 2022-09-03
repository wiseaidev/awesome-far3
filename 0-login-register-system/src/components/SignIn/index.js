import { useState } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from '@mui/icons-material/Lock';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from "react-redux";
import { onSignIn } from "../../api/Axios";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [errorValues, setErrorValues] = useState({
    emailError: "",
    passwordError: "",
  });

  const dispatch = useDispatch();

  const handleChange = (prop) => (event) => { 
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleErrorChange = (prop) => (event) => {
    if (typeof event == "string") setErrorValues({ ...errorValues, [prop]: event });
    else setErrorValues({ ...errorValues, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onClick = () => {
    if (!values.email) {
      handleErrorChange("emailError")("Email is required!");
    } else if (!values.password) {
      handleErrorChange("passwordError")("Password is required!");
    } else {
      dispatch(onSignIn(values))
    }
  };
  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      noValidate
      autoComplete="off"
      onClick={onClick}
    >
      <Typography component="div" variant="h5" mb={3}>
        Login to your account
      </Typography>

      <Box>
        <TextField
          fullWidth
          variant="outlined"
          label="Email Address"
          value={values.email}
          onChange={(e) => {
            handleChange("email")(e);
            handleErrorChange("emailError")("");
          }}
          helperText={errorValues.emailError}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" variant="standard">
                <IconButton aria-label="Email" edge="end" disabled>
                  <MailIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box>
        <TextField
          fullWidth
          type={values.showPassword ? 'text' : 'password'}
          variant="outlined"
          label="Password"
          value={values.password}
          onChange={(e) => {
            handleChange("password")(e);
            handleErrorChange("passwordError")("");
          }}
          helperText={errorValues.passwordError}
          InputProps={{
            endAdornment:(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
          ),
            startAdornment: (
              <InputAdornment position="start" variant="standard">
                <IconButton aria-label="Email" edge="end" disabled>
                  <LockIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>

      <Box
        display="flex"
        alignItems="left"
        justifyContent="space-between"
        mt={3}
        mb={3}
      >
        <Button variant="contained" color="primary">
          {"Sign In"}
        </Button>
      </Box>
      <Box display="flex" alignItems="left" justifyContent="space-between">
        <Typography>Don't have an account? Sign Up</Typography>
      </Box>
    </Box>
  );
};

export default SignIn;