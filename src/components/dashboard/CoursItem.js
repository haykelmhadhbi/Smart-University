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

const CoursItem = ({cours}) => {
  return (
  
    <Card>
      <CardBody className="p-4 pt-3">
      Date debut :  <CardTitle tag="h5">{cours.end_date.value}</CardTitle>
      Date fin :  <CardTitle tag="h5">{cours.start_date.value}</CardTitle>
      nb heures:  <CardTitle tag="h5">{cours.nb.value}</CardTitle>
      
      
        {/* <CardSubtitle className="mt-2 ">{props.subtitle}</CardSubtitle> */}
      
        <div className="d-flex justify-content-between"></div>
      </CardBody>
    </Card>
  );
};

export default CoursItem;
