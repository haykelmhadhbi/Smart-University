import { isDisabled } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { useFormik } from "formik";

import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  CardText,
  FormGroup,
  Label,
  Input,
  Form,
} from "reactstrap";

const ForumsTable = (props) => {
  const { forums, increment } = props;
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [idForum, setIdForum] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("user"));
    setUser(items.sub);
  }, []);

  const getForumPosts = (posts) => {
    setPosts(posts);
  };
  const toogle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleDeleteForum = (id) => {
    const config = {
      headers: {
        Authorization:
          `Bearer ` + window.localStorage.getItem("token").slice(1, -1),
      },
    };
    axios.delete(`http://localhost:8051/forums/${id}`, config).then((res) => {
      increment();
    });
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      date: "",
    },
    onSubmit: (values) => {
      const config = {
        headers: {
          Authorization:
            `Bearer ` + window.localStorage.getItem("token").slice(1, -1),
        },
      };

      axios
        .put(`http://localhost:8051/forums/forum/${idForum}`, values, config)
        .then((res) => {
          if (res.data) {
            setPosts(res.data.posts);
          }
        });
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <>
      <div>
        <Card>
          <CardBody>
            <CardTitle tag="h5">Forums</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              Overview of the Forums
            </CardSubtitle>

            <Table className="no-wrap mt-3 align-middle" responsive borderless>
              <thead>
                <tr>
                  <th>Title </th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Topic</th>
                  <th>created By</th>
                  <th>Posts</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {forums.map((tdata, index) => {
                  return (
                    <tr key={index} className="border-top">
                      <td>{tdata.title}</td>
                      <td> {tdata.type}</td>
                      <td>{tdata.date.substring(0, 10)}</td>
                      <td>{tdata.topic}</td>
                      <td>{tdata.createdBy.userName}</td>

                      <td>
                        <Button
                          className="btn"
                          onClick={() => {
                            getForumPosts(tdata.posts);
                            setIdForum(tdata.id);
                            toogle();
                          }}
                          outline
                          color="info"
                        >
                          Show Posts
                        </Button>
                      </td>
                      <td>
                        <div className="d-flex justify-content-evenly">
                          <Link
                            to={
                              user == tdata.createdBy.userName
                                ? `/updateForum/${tdata.id}`
                                : "/forums"
                            }
                          >
                         
                            <Button
                              disabled={user != tdata.createdBy.userName}
                              className="btn"
                              outline
                              color="info"
                            >
                              <i className="bi bi-pencil-fill"></i>
                            </Button>
                          </Link>
                          <Button
                            disabled={user != tdata.createdBy.userName}
                            className="btn"
                            onClick={() => {
                              handleDeleteForum(tdata.id);
                            }}
                            outline
                            color="danger"
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
      <div>
        <Modal isOpen={open}>
          <ModalHeader>Posts</ModalHeader>
          <Card>
            <CardBody>
              <Form onSubmit={formik.handleSubmit}>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.title}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="topic">Content</Label>

                  <Input
                    type="textarea"
                    id="content"
                    name="content"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.content}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="topic">date</Label>

                  <Input
                    type="date"
                    id="date"
                    name="date"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.date}
                  />
                </FormGroup>

                <Button className="btn" outline color="info" type="submit">
                  Add Post
                </Button>
              </Form>
            </CardBody>
          </Card>
          {posts.map((el, index) => {
            return (
              <Card key={index}>
                <CardBody>
                  <CardTitle tag="h5">{el.title}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {el.date?.substring(0, 10)}
                  </CardSubtitle>
                  <CardText>{el.content}</CardText>
                </CardBody>
              </Card>
            );
          })}

          <ModalFooter>
            <Button color="secondary" outline onClick={toogle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default ForumsTable;
