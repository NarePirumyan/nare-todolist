import {memo} from "react";
import { Col, Card, Button, FormCheck } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import styles from "./task.module.css";


function Task(props) {
    const task = props.data;

    return (
        <Col xs={12} sm={6} md={4} xl={2}>
            <Card className={styles.card}>
                <Card.Body>
                    <FormCheck 
                        className={styles.formCheckbox} 
                        onClick={() => {
                            props.onEachTaskSelect(task.id);
                        }}
                    >
                    </FormCheck>
                    <Card.Title>
                        {task.title}
                    </Card.Title>
                    <Card.Text>
                        Some task
                    </Card.Text>
                    <div className={styles.actionBtns}>
                        <Button variant="warning">
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>
                        <Button 
                            variant="danger" 
                            className={styles.deleteBtn} 
                            onClick={() => {
                               props.onEachTaskDelete(task.id);
                            }} 
                        >
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default memo(Task);