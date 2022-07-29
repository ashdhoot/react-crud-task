import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { message } from "antd";

const Home = () => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    axios
      .get("http://localhost:8000/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };

  const deleteUser = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:8000/users/${id}`)
      .then((res) => {
        console.log(res.data);
        message.success("User Deleted Successfully..!!");
        getUsers();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="container mt-4">
        <div className="row mt-5">
          <div className="col">
            <table className="table table-bordered table-hover mt-4">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Date of Birth</th>
                  <th>Marital Status</th>
                  <th>Photo</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <>
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{user.fstName}</td>
                      <td>{user.lstName}</td>
                      <td>{user.date}</td>
                      <td>{user.status}</td>
                      <td>
                        <img
                          src={user.image}
                          alt=""
                          style={{ height: "50px", width: "50px" }}
                          className="rounded-circle"
                        />
                      </td>
                      <td>
                        <Link to={`/edit-user/${user.id}`}>
                          <button className="btn btn-primary">Edit</button>
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
