import { useState } from "react";
import "./App.Css";
import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

function App() {
  let [items, setItems] = useState([
    { id: 1, label: "Html & CSS" },
    { id: 2, label: "Javascript" },
    { id: 3, label: "React Js" },
  ]);
  const [newItems, setNewItems] = useState("");

  const [isEdit, setIsEdit] = useState(true);

  let [currentEleID, setCurrentEleID] = useState(null);

  function handleaddsaveitems() {
    if (isEdit) {
      setItems([...items, { id: items.length + 1, label: newItems }]);
      setNewItems("");
    } else {
      let editItem = items.map((item) => {
        return item.id === currentEleID ? { ...item, label: newItems } : item;
      });
      setItems(editItem);
      setNewItems("");
      setCurrentEleID(null);
      setIsEdit(true);
    }
  }

  function handleUpdate(id) {
    let finditem = items.find((item) => item.id === id);
    setNewItems(finditem.label);
    setIsEdit(false);
    setCurrentEleID(id);
  }

  function handledelete(id) {
    let deleteItem = items
      .filter((item) => item.id !== id)
      .map((item, index) => {
        return { ...item, id: index + 1 };
      });
    setItems(deleteItem);
  }

  return (
    <>
      <Box className="bg" sx={{ height: { md: "200px" } }}>
        <Typography sx={{ fontSize: { xs: "20px", md: "80px" } }}>
          Todo-App{" "}
        </Typography>
        <Paper
          className="paper"
          sx={{
            marginX: "auto",
            width: { md: "40%" },
            marginTop: { md: "200px" },
            height: { md: "100px" },
          }}
          square={false}
          elevation={12}
        >
          <Typography
            align="left"
            marginLeft="10px"
            sx={{ fontSize: { xs: "10px", sm: "15px" } }}
          >
            <b>Add Items:</b>
          </Typography>

          <TextField
            value={newItems}
            sx={{
              marginY: "auto",
              width: { md: "70%" },
              marginLeft: { md: "10px" },
            }}
            onChange={(e) => {
              setNewItems(e.target.value);
            }}
            id="outlined-basic"
            label="Add items"
            variant="outlined"
          />

          <Button
            sx={{ marginX: "10px" }}
            onClick={handleaddsaveitems}
            variant="contained"
            color={isEdit ? "primary" : "success"}
          >
            {" "}
            {isEdit ? "Add" : "edit"}
          </Button>
        </Paper>

        <Paper
          className="paper2"
          sx={{
            marginX: "auto",
            width: { md: "40%" },
            marginTop: { md: "50%" },
          }}
          square={false}
          elevation={14}
        >
          {items.map((item) => {
            return (
              <Typography
                sx={{ fontSize: { sm: "10px", md: "35px" } }}
                align="left"
                marginLeft="10px"
              >
                {item.id}
                {"."}
                {item.label}
                <FaEdit
                  sx={{ fontSize: { sm: "15px", md: "25px" } }}
                  id="edit"
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    handleUpdate(item.id);
                  }}
                />

                <RiDeleteBin5Line
                  sx={{ fontSize: { sm: "15px", md: "25px" } }}
                  id="delete"
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    handledelete(item.id);
                  }}
                />
              </Typography>
            );
          })}
        </Paper>
      </Box>
    </>
  );
}

export default App;
