import React, { useState, useEffect } from "react";
import { Form, Button, Container, ListGroup, ListGroupItem } from "reactstrap";
import TaskForm from "./TaskForm";
import DataPusher from "./DataPusher";
import userData from "../userData.json"; // Import userData.json
import "./styles.css";

// TaskManager component; contains a form and a list of tasks.
// Contains TaskForm and DataPusher components.
export default function TaskManager() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch tasks from userData.json and set them to state
      setTasks(userData.tasks || []);
    };

    fetchData();
  }, []);

  const handleTaskSubmit = (newTask) => {
    setTasks([...tasks, { ...newTask, id: tasks.length, completed: false }]);
  };

  const handleTaskComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task,
    );
    setTasks(updatedTasks);
  };

  const handleTaskRemove = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
  };

  return (
    <Form className="Task">
      <h1 id="task_title">Tasks</h1>
      <Container className="TaskFormContainer">
        <TaskForm onTaskSubmit={handleTaskSubmit} />
        <ListGroup>
          {/* Display tasks from userData.json along with existing tasks */}
          {tasks.map((task) => (
            <ListGroupItem
              key={task.id}
              className={task.completed ? "completedTask" : ""}
            >
              <div>
                <strong>Project Name: </strong>
                {task.projectName}, <strong>Due Date: </strong>
                {task.dateDue}
              </div>
              <div>
                <Button
                  color="success"
                  onClick={() => handleTaskComplete(task.id)}
                >
                  {task.completed ? "Unmark Completed" : "Mark Completed"}
                </Button>{" "}
                <Button
                  color="danger"
                  onClick={() => handleTaskRemove(task.id)}
                >
                  Remove
                </Button>
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Container>
    </Form>
  );
}
