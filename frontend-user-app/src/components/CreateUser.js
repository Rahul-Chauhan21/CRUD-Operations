import React, { useState } from "react";
import axios from "axios";

// form to create a user
function CreateUser() {
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [prem, setPrem] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      name: name,
      phone: phone,
      address: address,
      isPremium: prem,
    };

    axios
      .post("http://localhost:5000/api/users", userInfo)
      .then((res) => alert(`User named: ${res.data.name} registerd in DB`))
      .catch((err) => console.error(err.message));

    setAddress("");
    setName("");
    setPhone("");
    setPrem(false);

    window.location = "/";
  };
  return (
    <div className="container">
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name: </label>
          <input
            type="text"
            required
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>PhoneNo: </label>
          <input
            type="text"
            required
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Address: </label>
          <input
            type="text"
            required
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Premium Membership: </label>
          <input
            type="checkbox"
            className="form-control"
            value={prem}
            onClick={() => setPrem(!prem)}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
