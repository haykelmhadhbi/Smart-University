import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
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
} from "reactstrap";

const ReclamationsTable = (props) => {
  const { reclamations, increment } = props;
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState({});
  const toogle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleGetEvent = (id) => {
    axios
      .get(`http://localhost:8051/reclamations/reclamationevent/${id}`)
      .then((res) => {
        setEvent(res.data);
      });
  };
  const handleDeleteReclamation = (id) => {
    axios
      .delete(`http://localhost:8051/reclamations/delete/${id}`)
      .then((res) => {
        increment();
      });
  };


  return (
    <>
      <div>
        <Card>
          <CardBody>
            <CardTitle tag="h5">Reclamations Listing</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              Overview of the reclamations
            </CardSubtitle>

            <Table className="no-wrap mt-3 align-middle" responsive borderless>
              <thead>
                <tr>
                  <th>Title </th>
                  <th>Content</th>
                  <th>Status</th>
                  <th>Event</th>
                  <th>Reclamation Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reclamations.map((tdata, index) => (
                  <tr key={index} className="border-top">
                    <td>
                      <div className="d-flex align-items-center p-2">
                        <img
                          src={
                            "https://th.bing.com/th/id/OIP.LRHeuQYucogSGIUPNIrMvwHaD4?pid=ImgDet&rs=1"
                          }
                          className="rounded-circle"
                          alt="avatar"
                          width="45"
                          height="45"
                        />
                        <div className="ms-3">
                          <h6 className="mb-0">{tdata.title}</h6>
                          <span className="text-muted">{tdata.ownerId}</span>
                        </div>
                      </div>
                    </td>
                    <td>{tdata.content}</td>
                    <td>
                      {tdata.status === false ? (
                        <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                      ) : (
                        <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                      )}
                    </td>
                    <td>
                      <Button
                        className="btn"
                        onClick={() => {
                          handleGetEvent(tdata.id);
                          toogle();
                        }}
                        outline
                        color="info"
                      >
                        Show Event
                      </Button>
                    </td>
                    <td>{tdata.date.substring(0, 10)}</td>
                    <td>
                      <div className="d-flex justify-content-evenly">
                        <Link to={`/updateReclamation/${tdata.id}`}>
                          <Button className="btn" outline color="info">
                            {" "}
                            <i className="bi bi-pencil-fill"></i>
                          </Button>
                        </Link>
                        <Button
                          className="btn"
                          onClick={() => {
                            handleDeleteReclamation(tdata.id);
                          }}
                          outline
                          color="danger"
                        >
                          {" "}
                          <i className="bi bi-trash"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
      <div>
        <Modal isOpen={open}>
          <ModalHeader>{event.title}</ModalHeader>
          <Card
            style={{
              width: "18rem",
            }}
          >
            <CardBody>
              <CardTitle tag="h5">{event.type}</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {event.eventDate?.substring(0, 10)}
              </CardSubtitle>
              <CardText>{event.description}</CardText>
            </CardBody>
          </Card>
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

export default ReclamationsTable;
