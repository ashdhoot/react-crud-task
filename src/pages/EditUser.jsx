import axios from "axios";
import React, { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import { useHistory, useParams } from "react-router-dom";
import { message } from "antd";

const EditUser = () => {
  const history = useHistory();
  let { id } = useParams();

  const [fstName, setFstName] = useState("");
  const [lstName, setLstName] = useState("");
  const [date, setDate] = useState("");

  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");

  const editUser = (e) => {
    e.preventDefault();

    let user = {
      fstName,
      lstName,
      date,
      image,
      status,
    };

    axios
      .put(`http://localhost:8000/users/${id}`, user)
      .then((res) => {
        console.log(res.data);
        history.push("/");
        message.success("User Updated Successfully..!!");
      })
      .catch((err) => console.log(err));
  };

  const getUser = () => {
    axios
      .get(`http://localhost:8000/users/${id}`)
      .then((res) => {
        console.log(res.data);
        setFstName(res.data.fstName);
        setLstName(res.data.lstName);
        setDate(res.data.date);
        setStatus(res.data.status);
        setImage(res.data.image);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUser();
  }, [id]);

  return (
    <div className="container">
      <h3 className="text-center mt-3 mb-5">Update User</h3>
      <div className="row justify-content-center">
        <div className="col-xs-12 col-sm-10 col-md-8 col-lg-5">
          <div className="card p-4">
            <form action="" onSubmit={editUser}>
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

              <button className="btn btn-success form-control">
                Update User
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
