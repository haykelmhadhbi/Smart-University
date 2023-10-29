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

import bg1 from "../assets/images/bg/departement.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import axios from "axios";
import DepartmentCard from "../components/dashboard/DepartmentsCard";

const BlogData = [
    {
      image: bg1,
      title: "This is simple blog",
      subtitle: "2 comments, 1 Like",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
      btnbg: "primary",
    },
]

const DepartmentPage = () => {

  const baseUlr = "http://localhost:8030/ws/getalldepartment"

  const [departments, setDepartments] = React.useState([]);

  const [name, setName] = React.useState("");

  const getDepartments = () => {
    axios.get(baseUlr)
    .then((response) => {
        console.log(response)
        setDepartments(response.data.filter(department => 
            department.name.value === 'Genie civil' || 
            department.name.value === 'Informatique' || 
            department.name.value === 'Business'))
        console.log(departments)
      }
    )
    .catch((err) => console.error(err));
  }

  React.useEffect(() => {
    getDepartments();
  }, []);
const searchDepartments= (e) => {
    axios.get(`http://localhost:8030/ws/departmentByName/${e.target.value}`).then((res) => {
        console.log(res.data)
        setDepartments(res.data);
        
      });
  }
  React.useEffect(() => {
    getDepartments()
  }, []);

  const handleChange=(e)=>{
    if(e.target.value===""){
      getDepartments();
    }else {
      searchDepartments(e);
    }
  }

  const searchDepartments2= (e) => {
    axios.get(`http://localhost:8030/ws/departmentByBloc/${e.target.value}`).then((res) => {
        console.log(res.data)
        setDepartments(res.data);
        
      });
  }
  React.useEffect(() => {
    getDepartments()
  }, []);

  return (
    <div>
 <div>
        <h1>Departments</h1>
        <hr/>
      </div>

       <div className="input-group rounded mb-5">
         
         <input
           onChange={handleChange}
           type="search"
           className="form-control rounded"
           placeholder="Search By Name"
           aria-label="Search"
           aria-describedby="search-addon"
         />
         <span className="input-group-text border-0" id="search-addon">
           <i className="fas fa-search"></i>
         </span>
       </div>
      <Row>
        {departments &&
          departments.map((department, index) => (
            <Col sm="6" lg="6" xl="3" key={index}>
            <DepartmentCard
              image={bg1}
              id={department.ID.value}
              name={department.name.value}
              status={department.status.value}
              color={"primary"}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DepartmentPage;
