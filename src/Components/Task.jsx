import { Col, Card, Button } from "react-bootstrap";


export function Task() {

    return (
        <Col xs={12} sm={6} md={4} xl={2}>
            <Card style={{ width: '200px' }}>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    My task.
                </Card.Text>
                <Button variant="danger">Delete</Button>
            </Card>
        </Col>
    );
}