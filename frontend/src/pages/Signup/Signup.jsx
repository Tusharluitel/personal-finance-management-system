import React, { useState } from "react";
import useSignup from "../../hooks/useSignup";
import { Container, Paper, TextField, Button, Typography } from "@mui/material";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(name, email, phoneNumber, password);
  };

  return (
    <Container maxWidth="xs" className="mt-8">
      <Paper elevation={3} className="p-6">
        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Phone Number"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            className="mt-4"
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </Button>
          {error && (
            <Typography variant="body2" color="error" className="mt-2">
              {error}
            </Typography>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
