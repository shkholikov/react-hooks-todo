import React, { useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import Divider from "@mui/material/Divider";

interface State {
  pageLoaded: boolean;
  selectedDate: Date | null;
  titleText: string;
  noteText: string;
  tasks: { taskId: number; title: string; note: string; date: Date | null }[];
}
function MainPage() {
  const [state, setState] = useState<State>({
    pageLoaded: false,
    selectedDate: null,
    titleText: "",
    noteText: "",
    tasks: [
      {
        taskId: Math.floor(Math.random() * 100),
        title: "Buy ticket",
        note: "Buy ticket for the Train to Rome",
        date: new Date()
      },
      {
        taskId: Math.floor(Math.random() * 100),
        title: "Call to the Hospital",
        note: "Ask about the appointment",
        date: new Date()
      },
      {
        taskId: Math.floor(Math.random() * 100),
        title: "Haircut",
        note: "Make an appointment for the haircut",
        date: new Date()
      },
      {
        taskId: Math.floor(Math.random() * 100),
        title: "Workout",
        note: "Make a plan for weekly workout",
        date: new Date()
      },
      {
        taskId: Math.floor(Math.random() * 100),
        title: "Finish the ToDo App",
        note: "Share opinions about the app with firends",
        date: new Date()
      }
    ]
  });

  function addNewTask(): void {
    let taskState = state.tasks;
    taskState.push({
      taskId: Math.floor(Math.random() * 100),
      title: state.titleText,
      note: state.noteText,
      date: state.selectedDate
    });
    setState({ ...state, tasks: taskState, titleText: "", noteText: "", selectedDate: null });
  }

  function deleteTask(taskId: number) {
    let filteredData = state.tasks.filter((task) => task.taskId === taskId);
    let taskIndex = state.tasks.findIndex((itm) => itm.taskId === filteredData[0].taskId);
    state.tasks.splice(taskIndex, 1);
    let newTaskState = state.tasks;
    setState({ ...state, tasks: newTaskState });
  }

  function handleNote(e: any) {
    setState({ ...state, noteText: e.target.value });
  }

  function handleTitle(e: any) {
    setState({ ...state, titleText: e.target.value });
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Box
          sx={{
            mx: "auto",
            width: "75%",
            height: "100%",
            p: 1,
            m: 1,
            bgcolor: "#e3f2fd",
            borderRadius: 3,
            boxShadow: 3,
            textAlign: "center",
            fontFamily: "monospace"
          }}
        >
          <Typography variant="h4" fontFamily={"monospace"}>
            📋 TODO APP
          </Typography>
          <Box sx={{ my: 3 }}>
            <Typography variant="h5" fontFamily={"monospace"}>
              ✍️ Create a new task here
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              my: 3
            }}
          >
            <TextField
              variant="outlined"
              label="Title"
              multiline
              maxRows={2}
              rows={2}
              value={state.titleText}
              onChange={handleTitle}
            ></TextField>
            <TextField
              variant="outlined"
              multiline
              maxRows={4}
              rows={4}
              label="Notes"
              value={state.noteText}
              onChange={handleNote}
            ></TextField>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                renderInput={(props) => <TextField {...props} />}
                label="Due date"
                clearable={true}
                minDate={new Date()}
                value={state.selectedDate}
                onChange={(value: any) => setState({ ...state, selectedDate: value })}
              />
            </LocalizationProvider>
          </Box>
          <Box sx={{ textAlign: "right", pr: 4, my: 2 }}>
            <Button
              variant="outlined"
              onClick={addNewTask}
              disabled={!state.titleText || !state.noteText || !state.selectedDate}
            >
              Add Task
              <AddIcon />
            </Button>
          </Box>
          <Divider />
          <Box sx={{ p: 4 }}>
            <Typography variant="h5" fontFamily={"monospace"}>
              📝 Your Tasks
            </Typography>
            {state.tasks.length === 0 ? (
              <Typography variant="h5" fontFamily={"monospace"} sx={{ p: 2, textAlign: "left" }}>
                🙅‍♂️ There are no tasks
              </Typography>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <FormatListNumberedIcon />
                    </TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Note</TableCell>
                    <TableCell>Due date</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.tasks.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.taskId}</TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.note}</TableCell>
                      <TableCell>{!!item.date ? item.date.toLocaleDateString() : ""}</TableCell>
                      <TableCell onClick={() => deleteTask(item.taskId)} sx={{ cursor: "pointer" }}>
                        <DeleteIcon color={"warning"} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default MainPage;
