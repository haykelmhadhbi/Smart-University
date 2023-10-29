import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
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

export default function Login() {
  const [credentilas, setCredentials] = React.useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setCredentials({ ...credentilas, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("username", credentilas.username);
    params.append("password", credentilas.password);
    axios.post("http://localhost:8051/api/login", params).then((response) => {
      console.log(response.data.access_token);
      var decoded = jwt_decode(response.data.access_token);
      localStorage.setItem("user", JSON.stringify(decoded));
      localStorage.setItem("token", JSON.stringify(response.data.access_token));
    });
  };

  return (
    <Row>
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
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
                <Label for="exampleEmail">Email</Label>
                <Input
                  id="exampleEmail"
                  name="username"
                  placeholder="with a placeholder"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  onChange={handleChange}
                  id="examplePassword"
                  name="password"
                  placeholder="password placeholder"
                  type="password"
                />
              </FormGroup>
              <Button>Login</Button>
              <Button
                style={{ marginLeft: "20px" }}
                className="btn"
                color="success"
              >
                <Link to="/register">Register</Link>
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
