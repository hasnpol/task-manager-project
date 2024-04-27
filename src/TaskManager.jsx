import React, { useState, useEffect } from "react";
import { Form, Button, Container, ListGroup, ListGroupItem } from "reactstrap";
import TaskForm from "./TaskForm";
import DataPusher from "./DataPusher";
import data from "../TaskData.json"; // Import userData.json
import "./styles.css";

// TaskManager component; contains a form and a list of tasks.
// Contains TaskForm and DataPusher components.
export default function TaskManager() {
  const [tasks, setTasks] = useState([]);

  const setInitialTasks = () => {
    localStorage.setItem("TaskData", JSON.stringify(data));
    try {
      // Retrieve JSON data from localStorage
      const jsonData = localStorage.getItem("TaskData");

      if (jsonData) {
        // Parse JSON data
        const taskData = JSON.parse(jsonData);
        return taskData;
      } else {
        return null; // Return null if no data is found
      }
    } catch (error) {
      console.error("Error retrieving data:", error.message);
      return null;
    }
  };

  const handleTaskSubmit = (newTask) => {
    setTasks([...tasks, { ...newTask, id: tasks.length, completed: false }]);
  };

  const handleTaskComplete = (taskId) => {
    const completedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task,
    );
    setTasks(completedTasks);
  };

  const handleTaskRemove = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
  };

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      const data = setInitialTasks();
      handleTaskSubmit(data);
    };

    fetchData();
  }, []);

  return (
    <Form className="Task">
      <h1 id="task_title">Tasks</h1>
      <Container className="TaskFormContainer">
        <TaskForm onTaskSubmit={handleTaskSubmit} />
        <ListGroup>
          {tasks.map((task) => (
            <ListGroupItem
              key={task.id}
              className={task.completed ? "completedTask" : ""}
            >
              <DataPusher />
              <div>
                |
                <Button
                  color="success"
                  onClick={() => handleTaskComplete(task.id)}
                >
                  {task.completed ? "Unmark Completed" : "Mark Completed"}
                </Button>{" "}
                |
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

