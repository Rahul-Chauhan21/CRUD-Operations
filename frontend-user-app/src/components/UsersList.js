import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import axios from "axios";

function UsersList() {
  const [users, setUsers] = useState();
  const [search, setSearch] = useState();
  const [options] = useState(["Name", "Phone", "Address"]);
  const [customFilter, setCustomFilter] = useState("Name");
  // Use effect
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((users) => setUsers(users.data))
      .catch((err) => console.error(err.message));
  }, []);

  const deleteUser = (id) => {
    axios
      .delete("http://localhost:5000/api/users/" + id)
      .then((res) => alert(`User named: ${res.data.name} deleted`));

    setUsers(users.filter((user) => user.id !== id));

    window.location = "/";
  };
  const elementStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem",
  };

  return (
    <div className="container">
      <div className="container-top" style={elementStyle}>
        <h3 style={{ flex: "1" }}>Users</h3>
        <input
          type="text"
          placeholder={`Search ${customFilter ? customFilter : " "}`}
          onChange={(e) => setSearch(e.target.value)}
        />
        <DropdownButton id="dropdown-basic-button" title="Select Filter">
          {options.map((option) => (
            <Dropdown.Item onClick={() => setCustomFilter(option)} key={option}>
              {option}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users ? (
            users
              .filter((user) => {
                if (search == null) return user;
                else if (
                  user[customFilter.toLowerCase()]
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                  return user;
              })
              .map((user) => (
                <User
                  name={user.name}
                  phone={user.phone}
                  address={user.address}
                  isPrem={user.isPremium}
                  key={user._id}
                  id={user._id}
                  deleteUser={deleteUser}
                />
              ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
}

function User({ name, phone, address, id, deleteUser }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{phone}</td>
      <td>{address}</td>
      <td>
        <button className="btn btn-secondary mr-1">
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to={"/edit-user/" + id}
          >
            Edit
          </Link>
        </button>
        <button className="btn btn-danger" onClick={() => deleteUser(id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default UsersList;
