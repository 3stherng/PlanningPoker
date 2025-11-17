import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

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
            href="/"
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
              <Nav.Link href="/story">Story Management</Nav.Link>
              <Nav.Link href="/grooming">Grooming</Nav.Link>
              <Nav.Link href="/configuration">Configuration</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as{" "}
              <a href="/login" style={{ color: "#0d6efd", fontWeight: "500" }}>
                {user_name}
              </a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
