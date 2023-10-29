import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";

const tableData = [
  {
    avatar: user1,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Flexy React",
    status: "pending",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user2,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Lading pro React",
    status: "done",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user3,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Elite React",
    status: "holt",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user4,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Flexy React",
    status: "pending",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user5,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Ample React",
    status: "done",
    weeks: "35",
    budget: "95K",
  },
];

const TeacherTable = ({teachers}) => {
    const navigate = useNavigate(); 
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Teachers Table</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the Teachers
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Degree</th>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((tdata, index) => (
                <tr style={{cursor:"pointer"}} onClick={ () => navigate(`/teachers/${tdata.Email.value}`)}  key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                         src={tableData[1].avatar}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                         <h6 className="mb-0">{tdata.First_Name.value}</h6>
                        <span className="text-muted">{tdata.Email.value}</span> 
                      </div>
                    </div>
                  </td>
                  <td>{tdata.Degree.value}</td>
                  <td>{tdata.First_Name.value}</td>
                  <td>{tdata.Last_Name.value}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default TeacherTable;
