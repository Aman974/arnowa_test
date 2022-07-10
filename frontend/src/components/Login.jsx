import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as moment from "moment";
import "./Login.css";
export default function HomeScreen() {
  const [data, setData] = useState({
    name: "",
    mobile: "",
    email: "",
    loginTime: moment().format("YYYY-MM-DD HH:mm:ss"),
  });
  const loginForm = () => {
    console.log("data", data);
    submitAPI(data);
  };

  const submitAPI = (data) => {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        console.log(response);
        if (response.isAdmin == true) {
        } else if (response.expired == true) {
          console.log("Time is over, please submit other reponse");
        } else {
          console.log({ data });
          sessionStorage.setItem("loginTime", data.loginTime);
          sessionStorage.setItem("userEmail", data.email);
          sessionStorage.setItem("userName", data.name);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    let updatedValue = {};
    updatedValue = { [e.target.name]: e.target.value };
    setData((data) => ({
      ...data,
      ...updatedValue,
    }));
  };
  return (
    <>
      <Row className="justify-content-md-center mt-5">
        <Col className="col-6">
          <div>
            <h1>Register Here</h1>
          </div>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Name</Form.Label>
            <Form.Control
              className="mb-3"
              type="text"
              name="name"
              placeholder="Enter name"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>

            <Form.Control
              className="mb-3"
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              className="mb-3"
              type="number"
              name="mobile"
              placeholder="Enter mobile"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={loginForm}>
            Submit
          </Button>
        </Col>
      </Row>
    </>
  );
}
