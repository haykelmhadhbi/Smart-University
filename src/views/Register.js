import axios from "axios";
import React from "react";
import { Link, Navigate } from "react-router-dom";

import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

export default function Register() {
  const [credentilas, setCredentials] = React.useState({
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [role, setRole] = React.useState("ROLE_STUDENT");

  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };

  const handleChange = (e) => {
    setCredentials({ ...credentilas, [e.target.name]: e.target.value });
  };
  const handleChangeUserName = (e) => {
    setCredentials({
      ...credentilas,
      userName: e.target.value,
      email: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:8051/api/user/save?role=${role}`,
        { ...credentilas },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        console.log(response.data);
        Navigate("/login");
      });
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Login Form
          </CardTitle>
          <CardBody>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <FormGroup>
                <Label for="exampleEmail">firstname</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="firstName"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastname">lastname</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="lastNamer"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  placeholder="email"
                  name="email"
                  onChange={handleChangeUserName}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  onChange={handleChange}
                  id="examplePassword"
                  name="password"
                  placeholder="password"
                  type="password"
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">phone number</Label>
                <Input
                  onChange={handleChange}
                  id="phoneNumber"
                  name="phone"
                  placeholder="phone number "
                  type="number"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Select</Label>
                <Input
                  onChange={handleChangeRole}
                  type="select"
                  name="role"
                  id="exampleSelect"
                >
                  <option value={"ROLE_STUDENT"}>Student</option>
                  <option value={"ROLE_TEACHER"}>Teacher</option>
                  <option value={"ROLE_PARENT"}>Parent</option>
                </Input>
              </FormGroup>
              <Button>Register</Button>
              <Button
                style={{ marginLeft: "20px" }}
                className="btn"
                color="success"
              >
                <Link to="/login">Login</Link>
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
