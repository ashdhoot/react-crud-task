import axios from "axios";
import React, { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import { useHistory, useParams } from "react-router-dom";
import { message } from "antd";

const AddUser = () => {
  const history = useHistory();

  const [fstName, setFstName] = useState("");
  const [lstName, setLstName] = useState("");
  const [date, setDate] = useState("");

  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");

  const addUser = (e) => {
    e.preventDefault();
    if (
      fstName === "" ||
      lstName === "" ||
      date === "" ||
      image === "" ||
      status === ""
    ) {
      message.error("All fields are mandatory..!");
    } else {
      let user = {
        fstName,
        lstName,
        date,
        image,
        status,
        id: Math.floor(Math.random() * 100),
      };

      axios
        .post("http://localhost:8000/users", user)
        .then((res) => {
          console.log(res.data);
          history.push("/");
          message.success("User Added successfully..!!");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container">
      <h3 className="text-center mt-3 mb-5">Add User</h3>
      <div className="row justify-content-center">
        <div className="col-xs-12 col-sm-10 col-md-8 col-lg-5">
          <div className="card p-4">
            <form action="" onSubmit={addUser}>
              <div className="mb-3">
                <label htmlFor="">First Name :</label>
                <input
                  type="text"
                  className="form-control"
                  value={fstName}
                  onChange={(e) => setFstName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="">Last Name :</label>
                <input
                  type="text"
                  className="form-control"
                  value={lstName}
                  onChange={(e) => setLstName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="">Date of Birth :</label>
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="me-2">
                  Add Image :{" "}
                </label>

                <FileBase64
                  multiple={false}
                  name="image"
                  onDone={({ base64 }) => setImage(base64)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="me-2">
                  Marital Status :
                </label>
                <input
                  type="radio"
                  value="Married"
                  name="marital status"
                  onChange={(e) => setStatus(e.target.value)}
                  className="me-2"
                />
                <span className="me-2">Married</span>
                <input
                  type="radio"
                  value="Unmarried"
                  name="marital status"
                  onChange={(e) => setStatus(e.target.value)}
                  className="me-2 ms-3"
                />
                <span className="me-2">Unmarried</span>
              </div>

              <button className="btn btn-success form-control">Add User</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
