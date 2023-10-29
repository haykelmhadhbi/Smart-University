import { CardBody, CardSubtitle, CardTitle, Col, Row } from "reactstrap";

import axios from "axios";

import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import TeacherTable from "../components/dashboard/TeacherTable";
import { useEffect, useState } from "react";
import Blog from "../components/dashboard/Blog";
import { useParams } from "react-router-dom";
import ClassePage from "./ClassePage";
import StudentItem from "../components/dashboard/SdutendItem";
import CoursItem from "../components/dashboard/CoursItem";

const BlogData = [
  {
    image: bg1,
    title: "This is simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "Lets be simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg3,
    title: "Don't Lamp blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg4,
    title: "Simple is beautiful",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
];

const TeacherDetail = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const getTeacherByID = () => {
    axios.get(`http://localhost:8030/ws/teacher/name/${id}`).then((res) => {
      setTeacher(res.data);
    });
  };

  const getStudentsByTeacherr = () => {
    axios.get(`http://localhost:8030/ws/teacher/email/${id}`).then((res) => {
      
        setStudents(res.data);
    });
  };
  
  const getCoursByTeacher = () => {
    axios.get(`http://localhost:8030/ws/cours/teacher/${id}`).then((res) => {
          setCourses(res.data);
    });
  }


  useEffect(() => {
    getTeacherByID();
    getStudentsByTeacherr()
    getCoursByTeacher();
  }, []);

  return (
    <div>
      {/***Top Cards***/}

      {/***Sales & Feed***/}

      {/***Table ***/}
      <Row>
        <div className="input-group rounded">
          <input
            //     onChange={handleChange}
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
      </Row>

      <CardBody>
      
        {teacher[0] && (
          <>
            <CardTitle tag="h5"> Full Name: {teacher[0].First_Name.value}  {teacher[0].Last_Name.value} </CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              Email : {teacher[0].Email.value}
              <br />
            </CardSubtitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              Degree : {teacher[0].Degree.value}
            </CardSubtitle>
          </>
        )}
      </CardBody>
      <Row>
      <h1>Students</h1>
        {students.map((item, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <StudentItem
             student={item}
            />
          </Col>
        ))}
      </Row>
      <Row>
      <h1>Course</h1>
        {courses.map((item, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <CoursItem
             cours={item}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TeacherDetail;
