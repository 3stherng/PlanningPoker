import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

export function NavigationBar(props: any) {
  let user_name: string = !props.user ? "" : props.user;
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <Navbar
        expand="lg"
        style={{
          backgroundColor: "#1c1c1c", // charcoal dark background
        }}
        variant="dark"
        className="shadow-sm"
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            style={{
              color: "#0d6efd",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            Planning Poker
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* if not login, show warning to login and not link */}
              {user_name === "" ? (
                <Nav.Link disabled style={{ color: "#6c757d" }}>
                  Stories
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/story" style={{ color: "#0d6efd" }}>
                  Stories
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {/* if user_name is empty then show login button */}
              {user_name === "" ? (
                <Link
                  to="/"
                  style={{
                    color: "#0d6efd",
                    fontWeight: "500",
                    textDecoration: "none",
                  }}
                >
                  Login
                </Link>
              ) : (
                <NavDropdown
                  title={user_name}
                  id="basic-nav-dropdown"
                  align="end"
                  style={{
                    color: "#0d6efd",
                    fontWeight: "500",
                  }}
                >
                  <NavDropdown.Item
                    onClick={handleLogout}
                    style={{ color: "#000000" }}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
