import { Col, Row } from "reactstrap";

import axios from "axios";

import { useEffect, useState } from "react";
import CoursesTable from "../components/dashboard/CoursesTable";


const Courses = () => {
  const [courses, setCourses] = useState([]);
  const getAllTeachers=()=>{
    axios.get(`http://localhost:8030/ws/Courses/all`).then((res) => {
        setCourses(res.data);
    });
  }
//   const searchTeachers= (e) => {
//     axios.get(`http://localhost:8030/ws/tours/all/search/${e.target.value}`).then((res) => {
//         setTeachers(res.data);
//       });
//   }
  useEffect(() => {
    getAllTeachers()
  }, []);

//   const handleChange=(e)=>{
//     if(e.target.value===""){
//       getAllTeachers();
//     }else {
//       searchTeachers(e);
//     }
//   }

  return (
    <div>
      {/* <Row>
        <div className="input-group rounded">
         
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
          />
          <span className="input-group-text border-0" id="search-addon">
            <i className="fas fa-search"></i>
          </span>
        </div>
      </Row> */}
      <Row>
        <Col lg="12">
          <CoursesTable courses={courses} />
        </Col>
      </Row>
    </div>
  );
};

export default Courses;
