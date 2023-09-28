import React from "react";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <AppBar position="static">
      <Toolbar className="justify-between">
        <Link to="/" className="text-white text-xl font-bold">
          Finance System
        </Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Button component={Link} to="/budget" color="inherit">
                Budget
              </Button>
              <Button component={Link} to="/debt" color="inherit">
                Debt
              </Button>
              <Button component={Link} to="/goal" color="inherit">
                Goal
              </Button>
              <span className="text-white">{user.email}</span>
              <Button onClick={handleClick} color="inherit">
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
              <Button component={Link} to="/signup" color="inherit">
                Sign Up
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
