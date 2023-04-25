import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import Task from "../task/Task";
import ConfirmDialog from "../ConfirmDialog";
import styles from "./todo.module.css";
import DeleteSelected from "../deleteSelected/DeleteSelected";
import TaskModal from "../taskModal/TaskModal";
import TaskApi from "../../api/taskApi";

const taskApi = new TaskApi();

export function ToDo() {
    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState(new Set());
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

    useEffect(() => {
        taskApi.getAll()
            .then((tasks) => {
                setTasks(tasks);
            });
    }, []);

    const onCreateNewTask = (newTask) => {
        taskApi.add(newTask)
            .then((task) => {
                const tasksCopy = [...tasks];
                tasksCopy.push(task);

                setTasks(tasksCopy);
                setIsAddTaskModalOpen(false);
                toast.success('The task has been added successfully!');
            })
            .catch((err) => {
                console.log("err", err);
                toast.error(err.message);
            });
    }

    const onEachTaskDelete = (taskId) => {
        const filteredTasks = tasks.filter((task) => task._id !== taskId);
        setTasks(filteredTasks);

        if (selectedTasks.has(taskId)) {
            const newSelectedTasks = new Set(selectedTasks);

            newSelectedTasks.delete(taskId);
            setSelectedTasks(newSelectedTasks);
        }
    }

    const onEachTaskSelect = (taskId) => {
        const selectedTasksCopy = new Set(selectedTasks);

        if (selectedTasksCopy.has(taskId)) {
            selectedTasksCopy.delete(taskId);
        }
        else {
            selectedTasksCopy.add(taskId);
        }

        setSelectedTasks(selectedTasksCopy);
    }

    const deleteSelectedTasks = () => {
        const newTasks = [];

        tasks.forEach((task) => {
            if (!selectedTasks.has(task._id)) {
                newTasks.push(task);
            }
        })
        setTasks(newTasks);
        setSelectedTasks(new Set());
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={10} md={6}>
                    <Button
                        variant="success"
                        onClick={() => setIsAddTaskModalOpen(true)}
                    >Add new task
                    </Button>
                </Col>
            </Row>
            <Row>
                {
                    tasks.map((task) => {
                        return (
                            <Task
                                key={task._id}
                                data={task}
                                onEachTaskDelete={setTaskToDelete}
                                onEachTaskSelect={onEachTaskSelect}
                            />
                        );
                    })
                }
            </Row>
            <DeleteSelected
                className={styles.deleteSelectedBtn}
                disabled={!selectedTasks.size}
                tasksSize={selectedTasks.size}
                onSubmit={deleteSelectedTasks}
            />
            {taskToDelete &&
                <ConfirmDialog
                    tasksSize={1}
                    onCancel={() => {
                        setTaskToDelete(null);
                    }}
                    onSubmit={() => {
                        onEachTaskDelete(taskToDelete);
                        setTaskToDelete(null);
                    }}
                />}
            {isAddTaskModalOpen &&
                <TaskModal
                    onCancel={() => {
                        setIsAddTaskModalOpen(false);
                    }}
                    onSave={onCreateNewTask}
                />}
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </Container>
    );
}