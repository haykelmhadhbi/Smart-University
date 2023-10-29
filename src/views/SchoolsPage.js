import {
  Button,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import React, { useEffect, useState } from "react";
//import reclamationServices from "../services/Reclamation.services";
import axios from "axios";
import SchoolTable from "../components/dashboard/SchoolTable";

const SchoolsPage = () => {
  const [schools, setschools] = React.useState([]);
  const [filter, setfilter] = useState({});
    useEffect(() => {
      getall();
    }, []);
    const handleChangeFilter = (e) => {
      if(e.target.value){
        setfilter({ ...filter, [e.target.name]: e.target.value });
        searchByAdress(e.target.value);
      }
      else {
        getall();
      }
      
      };
      // useEffect(()=>{
      //   searchByAdress(filter?.Adress);
      // },[filter])
      console.log(filter)
      const searchByAdress=(adress)=>{
        axios
        .get(`http://localhost:8030/ws/school/getbyadress/${adress}`)
        .then((res) => {
            console.log(res.data);
          setschools(res.data);
        }); 
      }
  const getall = () => {
    axios.get(`http://localhost:8030/ws/school/getall`).then((res) => {
      setschools(res.data);
    });
  };

  const deleteFilter = () => {
      getall();
    };
  return (
    <div>
       <div>
        <h1>Schools</h1>
        <hr/>
      </div>
        <Container fluid="xl">
      
              <FormGroup>
                <Input
                placeholder="search by address"
                  size={"small"} 
                  id="Adress"
                  name="Adress"
                  type="text"
                  onChange={handleChangeFilter}
                />
              </FormGroup>
      
        </Container>
        
      <Row>
        <Col lg="12">
          <SchoolTable schools={schools} />
        </Col>
      </Row>
    </div>
  );
};

export default SchoolsPage;
