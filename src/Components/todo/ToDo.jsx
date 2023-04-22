import { Component } from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import Task from "../task/Task";
import { idGenerator } from "../../utils/helpers";
import ConfirmDialog from "../ConfirmDialog";
import styles from "./todo.module.css";


export class ToDo extends Component {
    state = {
        tasks: [],
        inputVal: "",
        selectedTasks: new Set()
    };

    handleInputChange = (event) => {
        this.setState({
            inputVal: event.target.value
        });

    }

    createNewTask = () => {
        const trimedTitle = this.state.inputVal.trim();
        if (!trimedTitle) {
            return;
        }

        const newTask = {
            id: idGenerator(),
            title: trimedTitle
        }

        const tasksCopy = [...this.state.tasks];
        tasksCopy.push(newTask);

        this.setState({
            tasks: tasksCopy,
            inputVal: ""
        });
    }

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.createNewTask();
        }
    }

    onEachTaskDelete = (taskId) => {
        const {tasks, selectedTasks} = this.state;
        const filteredTasks = tasks.filter((task) => task.id !== taskId);
        const newState = {
            tasks: filteredTasks
        };

        if(selectedTasks.has(taskId)) {
            const newSelectedTasks = new Set(selectedTasks);

            newSelectedTasks.delete(taskId);
            newState.selectedTasks = newSelectedTasks;
        }

        this.setState(newState);
    }

    onEachTaskSelect = (taskId) => {
        const newSelectedTasks = new Set(this.state.selectedTasks);

        if(newSelectedTasks.has(taskId)) {
            newSelectedTasks.delete(taskId);
        }
        else {
            newSelectedTasks.add(taskId);
        }

        this.setState ({
            selectedTasks: newSelectedTasks
        });
    }

    deleteSelectedTasks = () => {
        const newTasks = [];
        const {tasks, selectedTasks} = this.state;

        tasks.forEach((task) => {
            if(!selectedTasks.has(task.id)) {
                newTasks.push(task);
            }
        })
        
        this.setState({
            tasks: newTasks,
            selectedTasks: new Set()
        })
    }

    render() {
        const isAddBtnDisabled = !this.state.inputVal.trim();

        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xs={10} md={6}>
                        <InputGroup className="mt-4 mb-3">
                            <Form.Control
                                placeholder="Task name"
                                value={this.state.inputVal}
                                onChange={this.handleInputChange}
                                onKeyDown={this.handleKeyDown}
                            />
                            <Button
                                variant="success"
                                onClick={this.createNewTask}
                                disabled={isAddBtnDisabled}
                            >Add
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    {
                        this.state.tasks.map((task) => {
                            return (
                                <Task
                                    key={task.id}
                                    data={task}
                                    onEachTaskDelete={this.onEachTaskDelete} 
                                    onEachTaskSelect={this.onEachTaskSelect}
                                />
                            );
                        })
                    }
                </Row>
                <Row>
                    <Col>
                        <Button
                            variant="danger"
                            className={styles.deleteSelectedBtn} 
                            onClick={this.deleteSelectedTasks}
                            disabled={!this.state.selectedTasks.size}
                        >Delete delected
                        </Button>
                    </Col>

                </Row>
                <ConfirmDialog />
            </Container>
        );
    }
}