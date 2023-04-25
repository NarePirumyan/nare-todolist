import { useState } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types"
import ConfirmDialog from "../ConfirmDialog";
import styles from "./deleteSelected.module.css";


export default function DeleteSelected(props) {
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

    const toggleConfirmDialog = () => {
        setIsConfirmDialogOpen(!isConfirmDialogOpen);
    }

    return (
        <>
            <Button
                variant="danger"
                className={styles.deleteSelectedBtn}
                onClick={toggleConfirmDialog} //deleteSelectedTasks
                disabled={props.disabled}
            >Delete selected
            </Button>
            {isConfirmDialogOpen && (
                <ConfirmDialog
                    tasksSize={props.tasksSize}
                    onCancel={toggleConfirmDialog}
                    onSubmit={() => {
                        toggleConfirmDialog();
                        props.onSubmit();
                    }}
                />)
            }
        </>
    );
}

DeleteSelected.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};