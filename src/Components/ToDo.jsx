import { Component } from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import { Task } from "./Task";
import { idGenerator } from "../utils/helpers";


export class ToDo extends Component {

    state = {
        tasks: [],
        inputVal: ""
    };


    handleInputChange = (event) => {
        this.setState({
            inputVal: event.target.value
        })
    }

    createNewTask = () => {
        const newTask = {
            id: idGenerator(),
            title: this.state.inputVal
        }
     
        const tasksCopy = [...this.state.tasks];
        tasksCopy.push(newTask);

        this.setState({
            tasks: tasksCopy
            })
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xs={10} md={6}>
                        <InputGroup className="mt-4 mb-3">
                            <Form.Control
                                placeholder="Task name"
                                onChange={this.handleInputChange}
                            />
                            <Button 
                            onClick={this.createNewTask}
                            >Add</Button>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>                    
                    {
                    this.state.tasks.map((task) => {
                        return (
                            <Task />
                        );
                    })
                    }
                </Row>
            </Container>
        );
    }
}