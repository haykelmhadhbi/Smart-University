import axios from "axios";
import { useState } from "react";
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
  Input,
} from "reactstrap";

const StudentTable = ({ students }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <Card>
          <CardBody>
            <CardTitle tag="h5">Students Table</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              Overview of the Students
            </CardSubtitle>

            <Table className="no-wrap mt-3 align-middle" responsive borderless>
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>First Name </th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Adress</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                {students.map((tdata, index) => (
                  <tr key={index} className="border-top">
                    <td><img
                          src={require("../../assets/images/bg/student.png")
                           
                          }
                          className="rounded-circle"
                          alt="avatar"
                          width="45"
                          height="45"
                        /></td>
                    <td>{tdata.First_Name.value}</td>
                    <td>{tdata.Last_Name.value}</td>
                    <td>{tdata.Email.value}</td>

                    <td>{tdata.Adress.value}</td>
                    <td>{tdata.Age.value} years old</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default StudentTable;
