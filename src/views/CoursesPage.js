import React from "react";
import {
  Col,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";

import Blog from "../components/dashboard/Blog";
import bg1 from "../assets/images/bg/courses.jpg";
import axios from "axios";



const CoursePage = () => {

  const baseUlr = "http://localhost:8030/ws/Courses/all"

  const [courses, setCourses] = React.useState([]);

  const [modal, setModal] = React.useState(false);

  const [formData, setData] = React.useState({
    name: "",
    description: "",
    category: "",
  });
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");

  const [options, setoptions] = React.useState(['All','Advanced', 'Beginner']);

  const getCourses = () => {
    fetch(baseUlr)
    .then((response) => response.json())
    .then((response) => {
        setCourses(response)
        console.log(response)
      }
    )
    .catch((err) => console.error(err));
  }

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    getCourses();
   }, []);

  const toggle = () => {
    setModal(!modal);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
    setData({ ...formData, name: e.target.value });
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
    setData({ ...formData, description: e.target.value });
  };
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
    setData({ ...formData, category: e.target.value });
  };

  const [categoryf, setCategoryf] = React.useState("");
  const handleFilterCategory = (e) => {
    setCategoryf(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setFormErrors(validate(formData));
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    const course = { name, description, category };

    const customConfig = {
      headers: {
      'Content-Type': 'application/json',
      }
  };
    axios.post('http://localhost:8051/courses', 
    course, customConfig)
    .then(response => {console.log("new course added");
    window.location.reload()});
  }
  else{
    console.log(formErrors)
    console.log("Error!")
  }
  }

  const [search, setSearch] = React.useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);

    if (e.target.value) {
      setCourses(
        courses.filter((course) =>
          course.name.toLowerCase().startsWith(e.target.value.toLowerCase())
        )
      );
    } else getCourses();
  };

  const [formErrors, setFormErrors] = React.useState({});
  const [isSubmit, setIsSubmit] = React.useState(false);

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required!";
    }

    if (!values.description) {
      errors.description = "Description is required!";
    }else if (values.description.length < 10) {
      errors.description = "Description must be more than 10 characters";
    } else if (values.description.length > 200) {
      errors.description = "Description cannot exceed more than 200 characters";
    }
    if (!values.category) {
      errors.category = "Category is required!";
    }
   
    return errors;
  };

  React.useEffect(() => {
    axios
      .get(`http://localhost:8051/courses/category/${categoryf}`)
      .then((res) => {
        if (res.data) {
          setCourses(res.data);
        }
        if(categoryf === 'All'){
          getCourses();
        }
      });
  }, [categoryf]);
  


  return (
    <div>
      {/***Top Cards***/}
     

     <div className="mt-2 mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <Button color="primary" onClick={toggle} >Add Course</Button>

          <FormGroup className="">
              <Label>Category :</Label>
              <Input
                size={"small"}
                id="category"
                name="category"
                type="select"
                onChange={handleFilterCategory}
              >
                {options.map((option, key) => (
                  <option key={key} value={option}>
                    {option}
                  </option>
                ))}
              </Input>
            </FormGroup>

          <div>
            <h3 style={{"fontWeight":"600", "textDecoration":"underline"}}>COURSES</h3>
          </div>
          <div className="search__input d-flex">
                  <Input
                    type="text"
                    placeholder="Search Course..."
                    value={search}
                    onChange={handleSearch}
                  />
                   <span className="mt-1" style={{"transform" : "translateX(-30px)"}}>
                    <svg
                      width="15"
                      height="16"
                      viewBox="0 0 15 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.6767 14.5454L11.0909 11.9597M13.0779 7.4935C13.0779 10.8287 10.3742 13.5324 7.03894 13.5324C3.70373 13.5324 1 10.8287 1 7.4935C1 4.15828 3.70373 1.45456 7.03894 1.45456C10.3742 1.45456 13.0779 4.15828 13.0779 7.4935Z"
                        stroke="#4FD1C5"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>
        </div>
        {/* <Button color="primary" onClick={deleteCourse} >Delete Course</Button> */}
        <Modal isOpen={modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>Add Course</ModalHeader>
          <ModalBody>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Course name"
                  type="text"
                  value={name}
                  onChange={handleChangeName}
                />
              </FormGroup>
              {formErrors.name && <Alert color="danger">{formErrors.name}</Alert>}
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Description"
                  type="textarea"
                  value={description}
                  onChange={handleChangeDescription}
                />
              </FormGroup>
              {formErrors.description && <Alert color="danger">{formErrors.description}</Alert>}
              <FormGroup>
                <Label for="name">Category</Label>
                <Input
                  id="category"
                  name="category"
                  placeholder="Category"
                  type="text"
                  value={category}
                  onChange={handleChangeCategory}
                />
              </FormGroup>
              {formErrors.category && <Alert color="danger">{formErrors.category}</Alert>}

              {/* <Button>Submit</Button> */}
              <ModalFooter>
                <Button color="primary" type="submit">
                  Submit
                </Button>
                <Button color="danger" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </Modal>
      </div>

      {/***Blog Cards***/}
      <Row>
        {/* {BlogData.map((blg, index) => ( */}
        {courses &&
          courses.map((course, index) => (
            <Col sm="6" lg="6" xl="3" key={index}>
              {/* {courses && courses.map((course,index) => {
              
            })} */}
            <Blog
              image={bg1}
              name={course.name}
              description={course.description}
              category={course.category}
              color={"primary"}
              id={course.id}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CoursePage;
