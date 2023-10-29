import axios from "axios";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
  Alert,
  Row,
  Col,
} from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import React, { useEffect, useState } from 'react';

const Blog = (props) => {
  const [teachers, setTeachers] = useState("");
  const getAllcourses = () => {
    axios.get(`http://localhost:8030/ws/count`).then((res) => {
      setTeachers(res.data);
    });
  }
  const [schools, setSchools] = useState("");
  const getAllschools = () => {
    axios.get(`http://localhost:8030/ws/school/count`).then((res) => {
      setSchools(res.data);
    });
  }
  const [students, setStudents] = useState("");
  const getAllstudents = () => {
    axios.get(`http://localhost:8030/ws/students/count`).then((res) => {
      setStudents(res.data);
    });
  }
  const [departments, setDepartments] = useState("");
  const getAlldepartments = () => {
    axios.get(`http://localhost:8030/ws/departments/count`).then((res) => {
      setDepartments(res.data);
    });
  }
  const [blocs, setBlocs] = useState("");
  const getAllBlocs = () => {
    axios.get(`http://localhost:8030/ws/blocs/count`).then((res) => {
      setBlocs(res.data);
    });
  }
  useEffect(() => {
    getAllcourses()
    getAllschools()
    getAllstudents()
    getAlldepartments()
    getAllBlocs()
  }, [])

  return (
    <Row>
      <Col sm="6" lg="6" xl="3" >
        <Card>
          <CardImg alt="Card image cap" src={props.image} />
          <CardBody className="p-4 pt-3">
            <CardTitle tag="h5">{props.name}</CardTitle>
            <CardText className="mt-3">Teachers : {teachers}</CardText>
          </CardBody>
        </Card>
      </Col>
      <Col sm="6" lg="6" xl="3" >
        <Card>
          <CardImg alt="Card image cap" src={props.image} />
          <CardBody className="p-4 pt-3">
            <CardTitle tag="h5">{props.name}</CardTitle>
            <CardText className="mt-3">Students : {students}</CardText>
          </CardBody>
        </Card>
      </Col>
      <Col sm="6" lg="6" xl="3" >
        <Card>
          <CardImg alt="Card image cap" src={props.image} />
          <CardBody className="p-4 pt-3">
            <CardTitle tag="h5">{props.name}</CardTitle>
            <CardText className="mt-3">Schools : {schools}</CardText>
          </CardBody>
        </Card>
      </Col>
      <Col sm="6" lg="6" xl="3" >
        <Card>
          <CardImg alt="Card image cap" src={props.image} />
          <CardBody className="p-4 pt-3">
            <CardTitle tag="h5">{props.name}</CardTitle>
            <CardText className="mt-3">Courses : {teachers}</CardText>
          </CardBody>
        </Card>
      </Col>
      <Col sm="6" lg="6" xl="3" >
        <Card>
          <CardImg alt="Card image cap" src={props.image} />
          <CardBody className="p-4 pt-3">
            <CardTitle tag="h5">{props.name}</CardTitle>
            <CardText className="mt-3">Departments : {departments}</CardText>
          </CardBody>
        </Card>
      </Col>
      <Col sm="6" lg="6" xl="3" >
        <Card>
          <CardImg alt="Card image cap" src={props.image} />
          <CardBody className="p-4 pt-3">
            <CardTitle tag="h5">{props.name}</CardTitle>
            <CardText className="mt-3">Blocs : {blocs}</CardText>
          </CardBody>
        </Card>
      </Col>

    </Row>
  );
};

export default Blog;
