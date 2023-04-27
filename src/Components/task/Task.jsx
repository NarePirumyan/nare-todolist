import { memo } from "react";
import { Col, Card, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPenToSquare, faCheck, faHistory } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from "../../utils/helpers";
import styles from "./task.module.css";

function Task(props) {
    const task = props.data;

    return (
        <Col xs={12} sm={6} md={4} xl={3}>
            <Card className={`${styles.card} ${styles.taskBg}`}>
                <Card.Body>
                    <Form.Check
                        className={styles.selectTask}
                        onChange={() => props.onEachTaskSelect(task._id)}
                        checked={props.checked}
                    />
                    <Card.Title className={styles.truncateText}>{task.title}</Card.Title>
                    <Card.Text className={styles.truncateText}>{task.description}</Card.Text>
                    <Card.Text>Status: {task.status}</Card.Text>
                    <Card.Text>Created At: {formatDate(task.created_at)}</Card.Text>
                    <Card.Text>Deadline: {formatDate(task.date)}</Card.Text>

                    <div className={styles.actionBtns}>
                        {
                            task.status === "active" ?
                                <Button
                                    title="Mark as done"
                                    variant="success"
                                    onClick={() => props.onStatusChange({ status: 'done', _id: task._id })}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </Button> :
                                <Button
                                    title="Mark as active"
                                    variant="info"
                                    onClick={() => props.onStatusChange({ status: 'active', _id: task._id })}>
                                    <FontAwesomeIcon icon={faHistory} />
                                </Button>
                        }
                        <Button
                            title="Edit"
                            variant="warning" 
                            className={styles.editBtn}
                            onClick={() => props.onTaskEdit(task)}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>
                        <Button
                            title="Delete"
                            variant="danger"
                            onClick={() => props.onEachTaskDelete(task._id)}
                        >
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}


Task.propTypes = {
    data: PropTypes.object.isRequired,
    onEachTaskDelete: PropTypes.func.isRequired,
    onEachTaskSelect: PropTypes.func.isRequired,
    onTaskEdit: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired

};

export default memo(Task);