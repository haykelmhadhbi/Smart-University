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

import ClasseCard from "../components/dashboard/ClasseCard";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import axios from "axios";

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

const ClassePage = () => {

  const baseUlr = "http://localhost:8051/classes"

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const [classes, setclasses] = React.useState([]);

  const [modal, setModal] = React.useState(false);

  const [formData, setData] = React.useState({
    name: "",
    description: "",
    floor: "",
    type:"",
    number:""
  });
  const [name, setName] = React.useState("");
  const [floor, setFloor] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [type, setType] = React.useState("");
  const [description, setDescription] = React.useState("");

  const getClasses = () => {
    fetch(baseUlr)
    .then((response) => { 
        if(response.status!= 204) {
            response.json()
            .then((response) => 
            {
                console.log(response)
                setclasses(response)
            })
            .catch((err) => console.error(err));
        } else {
            console.log("204")
        }
    });
    } 
    
  

  React.useEffect(() => {
    getClasses();
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
  const handleChangeFloor = (e) => {
    setFloor(e.target.value);
    setData({ ...formData, floor: e.target.value });
  };
  const handleChangeNumber = (e) => {
    setNumber(e.target.value);
    setData({ ...formData, number: e.target.value });
  };
  const handleChangeType = (e) => {
    setType(e.target.value);
    setData({ ...formData, type: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setFormErrors(validate(formData));
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    const classe = { name, floor, number, type, description };

    const customConfig = {
      headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*'
      }
  };

    axios.post('http://localhost:8051/classes', 
    classe, customConfig)
    .then(response => {console.log("new classe added")
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
      setclasses(
        classes.filter((course) =>
          course.name.toLowerCase().startsWith(e.target.value.toLowerCase())
        )
      );
    } else getClasses();
  };

  const [formErrors, setFormErrors] = React.useState({});
  const [isSubmit, setIsSubmit] = React.useState(false);

  const validate = (values) => {
    const errors = {};
    const regex2 = new RegExp('^[0-9]+$');
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
    if (!values.floor) {
        errors.floor = "Floor is required!";
      }else if (!regex2.test(values.floor)) {
        errors.floor = "This is not a valid Floor!";
      }
    if (!values.type) {
      errors.type = "Type is required!";
    }
    if (!values.number) {
        errors.number = "number is required!";
      }else if (!regex2.test(values.number)) {
        errors.number = "This is not a valid number!";
      }
   
    return errors;
  };


  return (
    <div>
      {/***Top Cards***/}


     <div className="mt-2 mb-4">
        <div className="d-flex justify-content-between">
          <Button color="primary" onClick={toggle} >Add Classe</Button>
          <div>
            <h3 style={{"fontWeight":"600", "textDecoration":"underline"}}>CLASSES</h3>
          </div>
          <div className="search__input d-flex">
                  <Input
                    type="text"
                    placeholder="Search Classe..."
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
          <ModalHeader toggle={toggle}>Add Classe</ModalHeader>
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
                <Label for="description">Floor</Label>
                <Input
                  id="floor"
                  name="floor"
                  placeholder="Floor"
                  type="textarea"
                  value={floor}
                  onChange={handleChangeFloor}
                />
              </FormGroup>
              {formErrors.floor && <Alert color="danger">{formErrors.floor}</Alert>}
              <FormGroup>
                <Label for="name">Description</Label>
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
                <Label for="name">Number</Label>
                <Input
                  id="number"
                  name="number"
                  placeholder="Number"
                  type="textarea"
                  value={number}
                  onChange={handleChangeNumber}
                />
              </FormGroup>
              {formErrors.number && <Alert color="danger">{formErrors.number}</Alert>}
              <FormGroup>
                <Label for="name">Type</Label>
                <Input
                  id="type"
                  name="type"
                  placeholder="Type"
                  type="textarea"
                  value={type}
                  onChange={handleChangeType}
                />
              </FormGroup>
              {formErrors.type && <Alert color="danger">{formErrors.type}</Alert>}

              {/* <Button>Submit</Button> */}
              <ModalFooter>
                <Button color="primary" type="submit" >
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
        {classes &&
          classes.map((classe, index) => (
            <Col sm="6" lg="6" xl="3" key={index}>
              {/* {classes && classes.map((course,index) => {
              
            })} */}
            <ClasseCard
              image={bg3}
              name={classe.name}
              description={classe.description}
              floor={classe.floor}
              type={classe.type}
              number={classe.number}
              color={"primary"}
              id={classe._id}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ClassePage;
