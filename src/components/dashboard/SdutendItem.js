import axios from "axios";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";

import React from "react";

const StudentItem = ({student}) => {
  return (
  
    <Card>
      <CardBody className="p-4 pt-3">
        <CardTitle tag="h5">{student.First_Name.value}</CardTitle>
        <CardTitle tag="h5">{student.Last_Name.value}</CardTitle>
        <CardTitle tag="h5">{student.Email.value}</CardTitle>
        <CardTitle tag="h5">{student.Age.value}</CardTitle>
      
        {/* <CardSubtitle className="mt-2 ">{props.subtitle}</CardSubtitle> */}
      
        <div className="d-flex justify-content-between"></div>
      </CardBody>
    </Card>
  );
};

export default StudentItem;
