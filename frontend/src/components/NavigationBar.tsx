import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export function NavigationBar(props: any) {
  let user_name: string = !props.user ? "" : props.user;

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
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/story">
                Story Management
              </Nav.Link>
              <Nav.Link as={Link} to="/grooming">
                Grooming
              </Nav.Link>
              <Nav.Link as={Link} to="/configuration">
                Configuration
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
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
                <Link
                  to="/profile"
                  style={{
                    color: "#0d6efd",
                    fontWeight: "500",
                    textDecoration: "none",
                  }}
                >
                  {user_name}
                </Link>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
