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
} from "reactstrap";
import React from 'react';

const DepartmentCard = (props) => {


  const [name, setName] = React.useState("");


  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  

  return (
    <>
    
    <Card>
      <CardImg alt="Card image cap" src={props.image} />
      <CardBody className="p-4 pt-3 text-center">
        <CardTitle tag="h5">{props.name}</CardTitle>
        <CardText className="mt-3">Status : <span className={`mt-3 ${props.status === "true" ? "text-success" : "text-danger"}`}>{props.status}</span></CardText>
      </CardBody>
    </Card>
    </>
  );
};

export default DepartmentCard;
