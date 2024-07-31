import React from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";

import { UserInfo } from './user-info';
import { ProfileUpdate } from './profile-update';

export const ProfileView = ({user, updatedUser}) => {
    
    return (
        <Container>
            <Row className="justify-content-center">
                <Col>
                    <Card>
                        <Card.Header>
                            <UserInfo name={user.Username} email={user.Email}/>
                        </Card.Header>
                    </Card>
                </Col>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                        <ProfileUpdate
                            user={user}
                            updatedUser={updatedUser}
                        />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
};


