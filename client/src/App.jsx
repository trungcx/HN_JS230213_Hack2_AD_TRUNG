import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
function App() {
  // STATE
  const [tasks, setTasks] = useState([]);
  const [content, setContent] = useState("");
  const [duedate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [people, setPeople] = useState("");

  const [showLoading, setShowLoading] = useState(false);
  const [updateBtn, setUpdateBtn] = useState(false);
  const [updateId, setUpdateId] = useState(0);
  // Gọi api hiển thị danh sách feedback
  const loadData = async () => {
    setShowLoading(true);
    await axios
      .get("http://localhost:3000/api/v1/tasks")
      .then((res) => {
        // setNotes(res.data.data);
        console.log("data", res.data.data);
        setTasks(res.data.data);

        // setFeedbacks(res.data);
        // setTotalFeedback(res.data.data.length);
      })
      .catch((err) => console.log(err));
    setShowLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);
  // Update
  const handleUpdate = (id) => {
    setUpdateBtn(!updateBtn);
    setUpdateId(id);
    let task = tasks.find((e, index) => e.task_id === id);
    setContent(task.content);

    const dateObj = new Date(task.duedate);
    const formattedDate = dateObj.toISOString().split("T")[0];
    setDueDate(formattedDate);

    setStatus(task.task_status);
    setPeople(task.task_men);
    // console.log("update:", task);
  };
  // Add task
  const handleSubmit = () => {
    const newTask = { content, duedate, task_status: status, task_men: people };
    console.log("update data", newTask);
    updateBtn ? putApi(newTask) : postApi(newTask);
    setUpdateBtn(!updateBtn);
  };
  const putApi = async (newTask) => {
    console.log("put API");
    await axios
      .put(`http://localhost:3000/api/v1/tasks/${updateId}`, newTask)
      .then((res) => {
        // console.log(res.data.data);
        setContent("");
        setDueDate("");
        setStatus("");
        setPeople("");

        loadData();
      })
      .catch((err) => console.log(err));
  };
  const postApi = async (newTask) => {
    await axios
      .post("http://localhost:3000/api/v1/tasks", newTask)
      .then((res) => {
        // console.log(res.data.data);
        setContent("");
        setDueDate("");
        setStatus("");
        setPeople("");

        loadData();
      })
      .catch((err) => console.log(err));
  };
  // Delete task
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/v1/tasks/${id}`)
      .then((res) => {
        if (res.data.status) {
          loadData();
          setTimeout(() => {
            // setShowDialogSuccess(true);
          }, 200);
        }
      })
      .catch((err) => console.log(err));
  };
  // Convert date
  const convertDate = (date) => {
    const dateString = date;
    const dateObj = new Date(dateString);
    const formattedDate = dateObj.toLocaleDateString("en-GB"); // "dd/mm/yyyy"
    return formattedDate;
  };
  return (
    <div className="App">
      {/* Header */}
      <div className="header-container d-inline-flex justify-content-center gap-1 m-2">
        {/* Task content */}
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Task"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        {/* Date picker */}
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            type="date"
            id="due-date"
            value={duedate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        {/* Status */}

        <div className="dropdown" style={{ height: 37 }}>
          <select
            id="select1"
            style={{ height: 37 }}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value=""></option>
            <option value="Fulfill">Fulfill</option>
            <option value="Pending">Pending</option>
            <option value="Reject">Reject</option>
          </select>
        </div>
        {/* Task men */}
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="person incharge"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
          />
        </div>
        {/* Submit btn */}
        <button
          onClick={handleSubmit}
          type="button"
          class="btn btn-primary"
          style={{ height: 37 }}
        >
          {updateBtn ? "Update" : "Submit"}
        </button>
      </div>
      {/* Render content */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Content</th>
            <th scope="col">Due date</th>
            <th scope="col">Status</th>
            <th scope="col">Assigned to</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <>
              <tr key={index}>
                <th scope="row">{task.task_id}</th>
                <td>{task.content}</td>
                <td>{convertDate(task.duedate)}</td>
                <td>{task.task_status}</td>
                <td>{task.task_men}</td>
                <td>
                  <>
                    <button
                      disabled={updateBtn}
                      type="button"
                      className="btn btn-success m-1"
                      onClick={() => handleUpdate(task.task_id)}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(task.task_id)}
                    >
                      Delete
                    </button>
                  </>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>

      {/* <table className="table">
        //{" "}
        <thead>
          //{" "}
          <tr>
            // <th scope="col">#</th>
            // <th scope="col">Content</th>
            // <th scope="col">Due date</th>
            // <th scope="col">Status</th>
            // <th scope="col">Assigned to</th>
            // <th scope="col">Action</th>
            //{" "}
          </tr>
          //{" "}
        </thead>
        //{" "}
        <tbody>
          //{" "}
          <tr>
            // <th scope="row">1</th>
            // <td>Mark</td>
            // <td>Otto</td>
            // <td>@mdo</td>
            // <td>@mdo</td>
            //{" "}
            <td>
              //{" "}
              <>
                //{" "}
                <button type="button" className="btn btn-success m-1">
                  // Update //{" "}
                </button>
                //{" "}
                <button type="button" className="btn btn-danger">
                  // Delete //{" "}
                </button>
                //{" "}
              </>
              //{" "}
            </td>
            //{" "}
          </tr>
          //{" "}
        </tbody>
        //{" "}
      </table> */}
    </div>
  );
}

export default App;
