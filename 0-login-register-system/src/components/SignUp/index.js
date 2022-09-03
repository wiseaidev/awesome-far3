import { useState } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from "react-redux";
import { onRegister } from "../../api/Axios";

const SignUp = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    showPassword: false,
  });

  const [errorValues, setErrorValues] = useState({
    firstNameError: "",
    lastNameError: "",
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
    if (!values.firstName) {
      handleErrorChange("firstNameError")("First Name is required!");
    } else if (!values.lastName) {
      handleErrorChange("lastNameError")("Last Name is required!");
    } else if (!values.email) {
      handleErrorChange("emailError")("Email is required!");
    } else if (!values.password) {
      handleErrorChange("passwordError")("Password is required!");
    } else {
      dispatch(onRegister(values))
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
      <Typography component="div" variant="h4" mb={3}>
        Create an account
      </Typography>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        width="40ch"
        alignItems="center"
      >
        <TextField
          fullWidth
          variant="outlined"
          label="First Name"
          value={values.firstName}
          onChange={(e) => {
            handleChange("firstName")(e);
            handleErrorChange("firstNameError")("");
          }}
          helperText={errorValues.firstNameError}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" variant="standard">
                <IconButton aria-label="First Name" edge="end" disabled>
                  <PermIdentityIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Last Name"
          value={values.lastName}
          onChange={(e) => {
            handleChange("lastName")(e);
            handleErrorChange("lastNameError")("");
          }}
          helperText={errorValues.lastNameError}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" variant="standard">
                <IconButton aria-label="Last Name" edge="end" disabled>
                  <PersonIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

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
          {"Sign Up"}
        </Button>
      </Box>
      <Box display="flex" alignItems="left" justifyContent="space-between">
        <Typography>Have an account? Sign In</Typography>
      </Box>
    </Box>
  );
};

export default SignUp;