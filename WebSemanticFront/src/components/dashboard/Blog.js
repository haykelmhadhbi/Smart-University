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
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import React from 'react';

const Blog = (props) => {

  const deleteCourse = () => {
    //const id = "6355a85b2599f273351c738b";
    console.log(props.id)
    axios.delete(`http://localhost:8051/courses/${props.id}`)
    .then(res => {console.log(res);window.location.reload()});
    toggle2();
  }

  const [modal, setModal] = React.useState(false);
  const [modal2, setModal2] = React.useState(false);
  const [modal3, setModal3] = React.useState(false);
  const toggle = () => {
    setModal(!modal);
  }
  const toggle2 = () => {
    setModal2(!modal2);
  }
  const toggle3 = () => {
    setModal3(!modal3);
  }
  const [formData, setData] = React.useState({ name: "", description: "",category: "" });
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  // const handleChangeName = (e) => {
  //   setName(e.target.value);
  // };

  const handleChangeName = (e) => {
    setName(e.target.value);
    setData({ ...formData, name: e.target.value });
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
    setData({ ...formData, description: e.target.value });
  };
  const handleChangeCategory = (e) => {
    if(e.target.value){
      setCategory(e.target.value);
      setData({ ...formData, category: e.target.value });
    }
    else
      setCategory(props.category);
      setData({ ...formData, category: props.category });  
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setFormErrors(validate(formData));
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    const coursee = { name, description, category };
    const idd = {
      id : props.id
    }
    const course = {...coursee, ...idd};
    console.log(course)
    const customConfig = {
      headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*'
      }
  };
  
    axios.put(`http://localhost:8051/courses`, 
    course, customConfig)
    .then(response => {console.log(response);
      window.location.reload()});
  }
  else{
    console.log(formErrors)
    console.log("Error!")
  }
}

  const [formErrors, setFormErrors] = React.useState({});
  const [isSubmit, setIsSubmit] = React.useState(false);

  const validate = (values) => {
    const errors = {};
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
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
  

  return (
    <>
    
    <Modal isOpen={modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>Details</ModalHeader>
          <ModalBody>
          <CardImg alt="Card image cap" src={props.image} />
              <FormGroup>
                <Label className="mt-3" for="name">{props.name}</Label>
                <p className="mt-3">
                  {props.description}
                </p>
                </FormGroup>
              {/* <Button>Submit</Button> */}
              <ModalFooter>
                <Button color="danger" onClick={toggle}>Exit</Button>
              </ModalFooter>
          </ModalBody>
        </Modal>

        <Modal isOpen={modal2} toggle={toggle2} >
          <ModalHeader toggle={toggle2}>Do you really want to delete this Course ?</ModalHeader>
          <ModalBody>
          <CardImg alt="Card image cap" src={props.image} />

              <ModalFooter>
                <Button color="danger" onClick={deleteCourse}>Yes</Button>
                <Button color="primary" onClick={toggle2}>No</Button>
              </ModalFooter>
          </ModalBody>
        </Modal>

        <Modal isOpen={modal3} toggle={toggle3} >
          <ModalHeader toggle={toggle3}>Update Course</ModalHeader>
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
                  placeholder={props.name}
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
                  placeholder={props.description}
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
                  placeholder={props.category}
                  type="text"
                  value={category}
                  onChange={handleChangeCategory}
                />
              </FormGroup>
              {formErrors.category && <Alert color="danger">{formErrors.category}</Alert>}
             
              {/* <Button>Submit</Button> */}
              <ModalFooter>
                <Button color="primary" type="submit" >Submit</Button>
                <Button color="danger" onClick={toggle3}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </Modal>
    
    <Card>
      <CardImg alt="Card image cap" src={props.image} />
      <Button style={{"padding" : "5px 6px"}} color={props.color} onClick={toggle3}>Update</Button>
      <CardBody className="p-4 pt-3">
        <CardTitle tag="h5">{props.name}</CardTitle>
        {/* <CardSubtitle className="mt-2 ">{props.subtitle}</CardSubtitle> */}
        <CardText className="mt-3">Category : {props.category}</CardText>
        <div className="d-flex justify-content-between">
        <Button color={props.color} onClick={toggle}>Subscribe</Button>
          <div>
          <Button style={{"padding" : "5px 6px", "marginRight" :"8px"}} color={props.color} onClick={toggle}><i class="bi bi-info-circle-fill"></i></Button>
          <Button style={{"padding" : "5px 6px"}} color="danger" onClick={toggle2}><i class="bi bi-trash-fill"></i></Button>
          </div>
        </div>
      </CardBody>
    </Card>
    </>
  );
};

export default Blog;
