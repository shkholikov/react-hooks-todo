import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  TextField,
  Button
} from "@mui/material";
import React, { useState } from "react";

interface State {
  tasks: { taskId: number; task: string }[];
  createdDate: string;
  totalTasksNumber: number | undefined;
  text: any;
}

function ToDo() {
  const [state, setState] = useState<State>({
    tasks: [],
    createdDate: new Date().toString(),
    totalTasksNumber: undefined,
    text: ""
  });

  function addNewTask(task: any) {
    let taskState = state.tasks;
    taskState.push({ taskId: Math.floor(Math.random() * 100), task: task });
    setState({ ...state, tasks: taskState, text: "" });
  }

  function handleText(e: any) {
    setState({ ...state, text: e.target.value });
  }

  function deleteTask(taskId: number) {
    let filteredData = state.tasks.filter((task) => task.taskId === taskId);
    let taskIndex = state.tasks.findIndex((itm) => itm.taskId === filteredData[0].taskId);
    state.tasks.splice(taskIndex, 1);
    let newTaskState = state.tasks;
    setState({ ...state, tasks: newTaskState });
  }

  return (
    <div>
      <Box sx={{ displat: "grid", width: 500, gap: 1 }}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Number row</TableCell>
                <TableCell>Task ID</TableCell>
                <TableCell>Task</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.tasks.map((item, index) => {
                return (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.taskId}</TableCell>
                    <TableCell>{item.task}</TableCell>
                    <TableCell onClick={() => deleteTask(item.taskId)} sx={{ cursor: "pointer" }}>
                      DELETE
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <TextField
        label="Task body"
        maxRows={5}
        multiline
        value={state.text}
        onChange={handleText}
        size="medium"
      />
      <Button variant="contained" onClick={() => addNewTask(state.text)}>
        Add Task
      </Button>
    </div>
  );
}

export default ToDo;
