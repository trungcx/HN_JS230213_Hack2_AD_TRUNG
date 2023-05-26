const express = require("express");
const server = express();
const port = 3000;
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const validateData = require("./middleware/checkValidate");

// USE
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(express.static("public"));
server.use(cors());

const database = require("./utils/database");
server.get("/", (req, res) => {
  res.json({
    message: "Home page",
  });
});

server.get("/api/v1/tasks", (req, res) => {
  const queryString = "SELECT * FROM module3_hack.taskkeeper";
  database.query(queryString, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "read all OK",
        data: result,
      });
    }
  });
});
server.get("/api/v1/tasks/:id", (req, res) => {
  const { id } = req.params;
  //   const queryString = `INSERT INTO taskkeeper (content) VALUES ("just content")`;
  const queryString = `SELECT * FROM module3_hack.taskkeeper WHERE task_id=${id}`;
  database.query(queryString, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      //   let notes = JSON.parse(result);
      console.log("result", result);
      return res.status(200).json({
        status: "Read one OK",
        data: result,
      });
    }
  });
});
// insert row
server.post("/api/v1/tasks", validateData, (req, res) => {
  // Pending  ; Reject; Fulfill
  console.log("server-post:", req.body);
  const { content, duedate, task_status, task_men } = req.body;
  const newTask = [content, duedate, task_status, task_men];
  console.log("newTask", newTask);
  const queryString = `INSERT INTO taskkeeper (content, duedate, task_status, task_men) VALUES (?,?,?,?)`;
  database.query(queryString, newTask, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      //   console.log("result", result);
      return res.status(200).json({
        status: "add OK",
        data: result,
      });
    }
  });
});
//
server.put("/api/v1/tasks/:id", validateData, (req, res) => {
  // Pending  ; Reject; Fulfill
  console.log("server-put:", req.body);
  const { id } = req.params;
  const { content, duedate, task_status, task_men } = req.body;

  const queryString = `
  UPDATE taskkeeper
  SET content=?, duedate=?, task_status=?, task_men=?
  WHERE task_id=?;    
  `;
  const updateTask = [content, duedate, task_status, task_men, id];

  database.query(queryString, updateTask, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      //   console.log("result", result);
      return res.status(200).json({
        status: "update OK",
        data: result,
      });
    }
  });
});
// Delete row
server.delete("/api/v1/tasks/:id", (req, res) => {
  const { id } = req.params;
  const queryString = `DELETE FROM taskkeeper where task_id=${id}`;
  database.query(queryString, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      //   let notes = JSON.parse(result);
      console.log("result", result);
      return res.status(200).json({
        status: "delete one OK",
        data: result,
      });
    }
  });
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
