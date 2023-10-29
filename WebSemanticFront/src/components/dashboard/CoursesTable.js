import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import user1 from "../../assets/images/bg/courses.jpg";



const CoursesTable = ({courses}) => {
    const navigate = useNavigate(); 
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Courses Table</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the Courses
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Avatar</th>
              <th>Name</th>
                <th>start Date</th>
                <th>End Date</th>
                <th>Chapter Number</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((tdata, index) => (
                <tr style={{cursor:"pointer"}}   key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                         src={user1}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                    </div>
                  </td>
                  {/* <td>{tdata.project}</td> */}
                  {/* <td>
                    {tdata.status === "pending" ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : tdata.status === "holt" ? (
                      <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                    </td> */}
                    
                  <td>{tdata.name.value}</td>
                  <td>{tdata.start_date.value}</td>
                  <td>{tdata.end_date.value}</td>
                  <td>{tdata.Nomber_of_chapter.value}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default CoursesTable;
