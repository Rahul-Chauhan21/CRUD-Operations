import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// form to create a user
function EditUser() {
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [prem, setPrem] = useState();
  const params = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/" + params.id)
      .then((user) => {
        setUser(user.data);
        setPrem(user.data.isPremium);
        setPhone(user.data.phone);
        setAddress(user.data.address);
        setName(user.data.name);
      })
      .catch((err) => console.error(err.message));
  }, [params.id]);

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:5000/api/users/" + params.id, {
        name: name,
        phone: phone,
        address: address,
        isPremium: prem,
      })
      .then((res) => alert(`User named: ${res.data.name} updated in DB`))
      .catch((err) => console.error(err.message));

    window.location = "/";
  };
  return (
    <div className="container">
      {user ? <h3>Edit User: {name}</h3> : <h1>Edit</h1>}
      <form onSubmit={onSubmit}>
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
            checked={prem}
            onClick={() => setPrem(!prem)}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Edit User" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

export default EditUser;
