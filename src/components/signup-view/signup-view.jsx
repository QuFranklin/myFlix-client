import{ useState } from "react";
import {Container, Form, Button, Card, Row, Col} from "react-bootstrap";


export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };
    
        fetch("https://moviesdb-6abb3284c2fb.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
              alert("Signup successful");
              window.location.reload();
            } else {
              alert("Signup failed");
            }
        });
    };
  
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Card className="login-card">
                <Card.Body>
                  <Card.Title>Sign Up</Card.Title>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="5"
                    />
                  </Form.Group>  
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                  </Form.Group>
                  <Form.Group controlId="formBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                    />
                  </Form.Group>  
                  <Button className="mt-4" variant="primary" type="submit">
                      Sign Up
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Form>     
      </Container>
        
    )
};