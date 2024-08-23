import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { toast } from "react-toastify";
import { LoginContext } from "../Context/Context";

const Header = () => {
  const navigate = useNavigate();
  const { users, setUsers } = useContext(LoginContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async (e) => {
    const res = await axios.get("http://localhost:5000/auth/Logout", {});
    console.log(res);
    if (res.status === 201) {
      toast.success("Logout Succesfully", {
        position: "top-center",
      });
      navigate("/Login");
      setUsers(false);
    } else {
      console.log("error");
    }
  };

  const GoDashboard = () => {
    navigate("/Dashboard");
  };

  const HandleLogin = () => {
    navigate("/Login");
  };

  const HandleRegister = () => {
    navigate("/Signup");
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand to="/" style={{ cursor: "pointer" }}>
            <Link
              to="/"
              className="text-decoration-none"
              style={{ fontSize: "28px", color: "black" }}
            >
              Goswami
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link
                  to="/"
                  className="text-decoration-none"
                  style={{ color: "black" }}
                >
                  Home
                </Link>
              </Nav.Link>
            </Nav>
            <div>
              {users ? (
                <>
                  <Avatar
                    style={{
                      background: "blue",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                    onClick={handleClick}
                  >
                    {users?.name[0]}
                  </Avatar>

                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        GoDashboard();
                      }}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        handleLogout();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Avatar
                    style={{
                      background: "Green",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                    onClick={handleClick}
                  >
                    G
                  </Avatar>

                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        HandleLogin();
                      }}
                    >
                      Login
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        HandleRegister();
                      }}
                    >
                      Register
                    </MenuItem>
                  </Menu>
                </>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
