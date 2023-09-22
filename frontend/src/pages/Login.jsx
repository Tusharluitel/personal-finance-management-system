import React, { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const containerStyle = "mt-8 flex flex-col items-center";
  const formStyle = "w-full mt-4";
  const submitButtonStyle = "mt-6";

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
  };

  return (
    <Container component="main" maxWidth="xs" className={containerStyle}>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <form className={formStyle} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={submitButtonStyle}
        >
          Sign In
        </Button>
      </form>
    </Container>
  );
};

export default Login;
