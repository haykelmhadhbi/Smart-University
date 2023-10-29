import { Col, Row } from "reactstrap";

import axios from "axios";

import TeacherTable from "../components/dashboard/TeacherTable";
import { useEffect, useState } from "react";


const Teacher = () => {
  const [teachers, setTeachers] = useState([]);
  const getAllTeachers=()=>{
    axios.get(`http://localhost:8030/ws/teacher/all`).then((res) => {
      setTeachers(res.data);
    });
  }
  const searchTeachers= (e) => {
    axios.get(`http://localhost:8030/ws/tours/all/search/${e.target.value}`).then((res) => {
        setTeachers(res.data);
      });
  }
  useEffect(() => {
    getAllTeachers()
  }, []);

  const handleChange=(e)=>{
    if(e.target.value===""){
      getAllTeachers();
    }else {
      searchTeachers(e);
    }
  }

  return (
    <div>
      <div>
        <h1>Teachers</h1>
        <hr/>
      </div>
      <Row>
        <div className="input-group rounded">
         
          <input
            onChange={handleChange}
            type="search"
            className="form-control rounded"
            placeholder="Search by email ..."
            aria-label="Search"
            aria-describedby="search-addon"
          />
          <span className="input-group-text border-0" id="search-addon">
            <i className="fas fa-search"></i>
          </span>
        </div>
      </Row>
      <br/>
      <Row>
        <Col lg="12">
          <TeacherTable teachers={teachers} />
        </Col>
      </Row>
    </div>
  );
};

export default Teacher;
