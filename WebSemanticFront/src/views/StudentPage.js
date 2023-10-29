import React from "react";
import {
  Col,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Alert,
} from "reactstrap";

import Blog from "../components/dashboard/Blog";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import axios from "axios";
import StudentTable from "../components/dashboard/StudentTable";

const StudentPage = () => {
  const [students, setstudents] = React.useState([]);

  const getAll = () => {
    axios
      .get(`http://localhost:8030/ws/students/all`)
      .then((res) => {
        console.log(res.data);
        setstudents(res.data);
      })
      .catch(console.log("no connection established"));
  };
  const handleFilter = (adress) => {
    if (adress === "") {
      getAll();
    } else {
      axios
        .get(`http://localhost:8030/ws/students/studentbyadress/${adress}`)
        .then((res) => {
          console.log(res.data);
          setstudents(res.data);
        });
    }
  };

  React.useEffect(() => {
    getAll();
  }, []);

  return (
    <div>
      <Input
        type="text"
        placeholder="search by address..."
        onChange={(e) => handleFilter(e.target.value)}
      ></Input><br/>
      {/***Blog Cards***/}
      <Row>
        <Col lg="12">
          <StudentTable students={students} />
        </Col>
      </Row>
    </div>
  );
};

export default StudentPage;
