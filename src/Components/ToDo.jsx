import { Component } from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import { Task } from "./task/Task";
import { idGenerator } from "../utils/helpers";


export class ToDo extends Component {
    state = {
        tasks: [],
        inputVal: ""
    };

    handleInputChange = (event) => {
            this.setState({
                inputVal: event.target.value
            });
        
    }

    createNewTask = () => {
        const trimedTitle = this.state.inputVal.trim();
        if(!trimedTitle) {
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
        if(event.key === "Enter") {
            this.createNewTask();
        }
    }

    onEachTaskDelete = (taskId) => {
        const filteredTasks = this.state.tasks.filter((task) => task.id !== taskId);

        this.setState({
            tasks: filteredTasks,
            inputVal: ""
        });
        // alert(taskId);
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
                                onKeyDown = {this.handleKeyDown}
                            />
                            <Button 
                            variant="success"
                            onClick = {this.createNewTask}
                            disabled = {isAddBtnDisabled}
                            >Add</Button>
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
                            />
                        );
                    })
                    }
                </Row>
            </Container>
        );
    }
}