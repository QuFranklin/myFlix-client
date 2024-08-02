import { useState } from "react";
import {Container, Form, Button, Card, Row, Col} from "react-bootstrap";


export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = (event) => {
        event.preventDefault();

    const data = {
        Username: username,
        Password: password
    };
    fetch("https://moviesdb-6abb3284c2fb.herokuapp.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
        .then((data) => {
            console.log("Login response: ", data);
            if (data.user) {
              localStorage.setItem("user", JSON.stringify(data.user));
              localStorage.setItem("token", data.token);
              onLoggedIn(data.user, data.token);
            } else {
                alert("No such user");
            }
        })
        .catch((e) => {
          alert("Something went wrong");
        });
};

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Card className="login-card">
            <Card.Body>
              <Card.Title>Login</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                      <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="3" 
                      />
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="5"
                      />
                  </Form.Group>
                  <Button className="mt-4" variant="primary" type="submit">
                    Log In
                  </Button>
                </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};