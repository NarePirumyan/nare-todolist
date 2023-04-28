import { memo } from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

function ConfirmDialog(props) {
    return (
        <Modal
            size="sm"
            show={true}
            onHide={props.onCancel}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Are you sure to delete {props.tasksSize !== 0 ? props.tasksSize : null} {props.tasksSize > 1 ? "tasks" : "task"}?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div className="d-flex justify-content-evenly">
                    <Button
                        variant='danger'
                        onClick={props.onSubmit}
                    >Delete</Button>
                    <Button
                        variant='success'
                        onClick={props.onCancel}
                    >Cancel</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

ConfirmDialog.propTypes = {
    tasksSize: PropTypes.number.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default memo(ConfirmDialog);