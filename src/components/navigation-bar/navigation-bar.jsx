import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut, moviesSearch, setMoviesSearch }) => {
  
  
  return (
    <Navbar className="sticky-navbar" fixed="top" bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Movies App
        </Navbar.Brand> 
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to ="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link >
                <Nav.Link as={Link} to={`/users/${user.Username}`}>
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )} 
            <Form className="d-flex justify-content-end"> 
              <Form.Control
                  className="me-4"
                  type="search"
                  value={moviesSearch}
                  placeholder="Search for movie"
                  onChange={(e) => setMoviesSearch(e.target.value)}
              />
          </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
