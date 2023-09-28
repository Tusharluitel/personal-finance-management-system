import React, { useState } from "react";
import useLogin from "../../hooks/useLogin";
import { Container, Paper, TextField, Button, Typography } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <Container maxWidth="xs" className="mt-8">
      <Paper elevation={3} className="p-6">
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
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
            {isLoading ? "Logging In..." : "Login"}
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

export default Login;
