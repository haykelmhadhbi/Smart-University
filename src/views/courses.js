import { Col, Row } from "reactstrap";

import axios from "axios";

import { useEffect, useState } from "react";
import CoursesTable from "../components/dashboard/CoursesTable";


const Courses = () => {
  const [courses, setCourses] = useState([]);
  const getAllcourses=()=>{
    axios.get(`http://localhost:8030/ws/Courses/all`).then((res) => {
        setCourses(res.data);
    });
  }
  const searchCourses= (e) => {
    axios.get(`http://localhost:8030/ws/SearchCourses/${e.target.value}`).then((res) => {
        setCourses(res.data);
      });
  }
  useEffect(() => {
    getAllcourses()
  }, []);

  const handleChange=(e)=>{
    if(e.target.value===""){
      getAllcourses();
    }else {
      searchCourses(e);
    }
  }

  return (
    <div>
       <div>
        <h1>Courses</h1>
        <hr/>
      </div>
      <Row>
        <div className="input-group rounded">
         
          <input
            type="search"
            onChange={handleChange}
            className="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            fullwidth
            aria-describedby="search-addon"
          />
          <span className="input-group-text border-0" id="search-addon">
            <i className="fas fa-search"></i>
          </span>
        </div>
      </Row><br/>
      <Row>
        <Col lg="12">
          <CoursesTable courses={courses} />
        </Col>
      </Row>
    </div>
  );
};

export default Courses;
