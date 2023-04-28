import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import Task from "../task/Task";
import ConfirmDialog from "../ConfirmDialog";
import DeleteSelected from "../DeleteSelected";
import TaskModal from "../taskModal/TaskModal";
import TaskApi from "../../api/taskApi";
import Filters from "../filters/Filters";
import NavBar from "../../navBar/NavBar";
import styles from "./toDo.module.css";

const taskApi = new TaskApi();

export default function ToDo() {
    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState(new Set());
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [editableTask, setEditableTask] = useState(null);

    const getTasks = (filters) => {
        taskApi.getAll(filters)
            .then((tasks) => {
                setTasks(tasks);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    useEffect(() => {
        getTasks();
    }, []);

    const onCreateNewTask = (newTask) => {
        taskApi.add(newTask)
            .then((task) => {
                const tasksCopy = [...tasks];
                tasksCopy.push(task);

                setTasks(tasksCopy);
                setIsAddTaskModalOpen(false);
                toast.success("The task has been added successfully!");
            })
            .catch((err) => {
                toast.error(err.message);
            });
    }

    const onEachTaskDelete = (taskId) => {
        taskApi.delete(taskId)
            .then(() => {
                const filteredTasks = tasks.filter((task) => task._id !== taskId);
                setTasks(filteredTasks);

                if (selectedTasks.has(taskId)) {
                    const newSelectedTasks = new Set(selectedTasks);

                    newSelectedTasks.delete(taskId);
                    setSelectedTasks(newSelectedTasks);
                }

                toast.success('The task has been deleted successfully!');
            })
            .catch((err) => {
                toast.error(err.message);
            });
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
        taskApi.deleteMany([...selectedTasks])
            .then(() => {
                const newTasks = [];
                const deletedTasksCount = selectedTasks.size;

                tasks.forEach((task) => {
                    if (!selectedTasks.has(task._id)) {
                        newTasks.push(task);
                    }
                })
                setTasks(newTasks);
                setSelectedTasks(new Set());

                toast.success(`${deletedTasksCount} tasks have been deleted successfully!`);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    }

    const selectAllTasks = () => {
        const taskIds = tasks.map((task) => task._id);
        setSelectedTasks(new Set(taskIds));
    };

    const resetSelectedTasks = () => {
        setSelectedTasks(new Set());
    };

    const onEditTask = (editedTask) => {
        taskApi.update(editedTask)
            .then((task) => {
                const newTasks = [...tasks];
                const foundIndex = newTasks.findIndex((t) => t._id === task._id);
                newTasks[foundIndex] = task;
                toast.success("The task has been updated successfully!");
                setTasks(newTasks);
                setEditableTask(null);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    const onFilter = (filters) => {
        getTasks(filters);
    };

    return (
        <Container>
            <Row>
                <NavBar />
            </Row>
            <Row className={`${styles.mainBtns} justify-content-center`}>
                <Col xs={12} sm={4} md={2}>
                    <Button
                        variant="success"
                        onClick={() => setIsAddTaskModalOpen(true)}
                    >Add new task
                    </Button>
                </Col>
                <Col xs={12} sm={4} md={2}>
                    <Button variant="warning" onClick={selectAllTasks}>
                        Select all
                    </Button>
                </Col>
                <Col xs={12} sm={4} md={2}>
                    <Button variant="secondary" onClick={resetSelectedTasks}>
                        Reset selected
                    </Button>
                </Col>
                <Col xs={12} sm={4} md={2}>
                    <DeleteSelected
                        disabled={!selectedTasks.size}
                        tasksSize={selectedTasks.size}
                        onSubmit={deleteSelectedTasks}
                    />
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Filters onFilter={onFilter} />
            </Row>
            <Row className="justify-content-center">
                {
                    tasks.map((task) => {
                        return (
                            <Task
                                key={task._id}
                                data={task}
                                onEachTaskDelete={setTaskToDelete}
                                onEachTaskSelect={onEachTaskSelect}
                                checked={selectedTasks.has(task._id)}
                                onTaskEdit={setEditableTask}
                                onStatusChange={onEditTask}
                            />
                        );
                    })
                }
            </Row>
            {taskToDelete &&
                <ConfirmDialog
                    tasksSize={1}
                    onCancel={() => setTaskToDelete(null)}
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
            {editableTask && (
                <TaskModal
                    onCancel={() => setEditableTask(null)}
                    onSave={onEditTask}
                    data={editableTask}
                />
            )}
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