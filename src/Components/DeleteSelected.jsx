import { useState, memo } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types"
import ConfirmDialog from "./ConfirmDialog";

function DeleteSelected(props) {
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

    const toggleConfirmDialog = () => {
        setIsConfirmDialogOpen(!isConfirmDialogOpen);
    }

    return (
        <>
            <Button
                variant="danger"
                onClick={toggleConfirmDialog}
                disabled={props.disabled}
            > Delete selected
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
    tasksSize: PropTypes.number.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default memo(DeleteSelected);