import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Button,
  Modal,
  ModalHeader,
  CardText,
  ModalFooter,
} from "reactstrap";

const SchoolTable = (props) => {
  const { schools,departments1 } = props;
  const [open, setOpen] = useState(false);
  const [openDepar, setOpendepar] = useState(false);
  const [school, setSchool] = useState({});
  const [departments, setdpartments] = useState([]);
  const handleGetSchool = (email) => {
    axios
      .get(`http://localhost:8030/ws/school/getbyemail/${email}`)
      .then((res) => {
        setSchool(res.data[0]);
      });
  };
  
  const handleGetDepartment = (name) => {
    axios
      .get(`http://localhost:8030/ws/school/getdepartmentbyschool/${name}`)
      .then((res) => {
        setdpartments(res.data);
      });
  };
  const toogleDepartment = () => {
    setOpendepar((prevOpen) => !prevOpen);
  };
  const toogle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      <div>
        <Card>
          <CardBody>
            <CardTitle tag="h5">Schools Listing</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              Overview of the schools
            </CardSubtitle>

            <Table className="no-wrap mt-3 align-middle" responsive borderless>
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Id </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Adress</th>
                </tr>
              </thead>
              <tbody>
                {schools.map((tdata, index) => (
                  <tr key={index} className="border-top">
                    {console.log(tdata)}
                    <td>  <img
                          src={require("../../assets/images/bg/university.png")}
                          className="rounded-circle"
                          alt="avatar"
                          width="45"
                          height="45"
                        /></td>
                    <td>{tdata?.ID?.value}</td>
                    <td>{tdata?.name?.value}</td>
                    <td>{tdata?.Email?.value}</td>
                    <td>{tdata?.Adress?.value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
      <div>
        <Modal isOpen={open}>
          <ModalHeader>{school?.name?.value}</ModalHeader>
          <Card
            style={{
              width: "18rem",
            }}
          >
            <CardBody>
              <CardTitle tag="h5">{school?.Adress?.value}</CardTitle>
              <CardText> {school?.Email?.value}</CardText>
            </CardBody>
          </Card>
          <ModalFooter>
            <Button color="secondary" outline onClick={toogle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <div>
        <Modal isOpen={openDepar}>
          <ModalHeader>Departments</ModalHeader>
          <Card
            style={{
              width: "18rem",
            }}
          >
            <CardBody>
              <Table striped>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {departments?.map((r, index) => (
                    <tr key={index}>
                      <td>{r?.ID?.value}</td>
                      <td>{r?.name?.value}</td>
                      <td>{r?.status?.value}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
          <ModalFooter>
            <Button color="secondary" outline onClick={toogleDepartment}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default SchoolTable;
