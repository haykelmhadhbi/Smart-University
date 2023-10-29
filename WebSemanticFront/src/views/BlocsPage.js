import React from "react";
import {
  Col,
  Row,
  Input,
} from "reactstrap";
import BlocsCard from "../components/dashboard/BlocsCard";
import bg1 from "../assets/images/bg/bloc.png";
import axios from "axios";

const BlocsPage = () => {

  const baseUlr = "http://localhost:8030/ws/blocs/all"

  const [blocs, setBlocs] = React.useState([]);

  const getBlocs = () => {
    axios.get(baseUlr)
      .then((response) => {
        console.log(response)
        setBlocs(response.data.filter(bloc => bloc.name.value === 'IJK' || bloc.name.value === 'FEG' || bloc.name.value === 'ABC'||bloc.name.value === 'bloc G'))
        console.log(blocs)
      }
      )
      .catch((err) => console.error(err));
  }

  React.useEffect(() => {
    getBlocs();
  }, []);

  const [search, setSearch] = React.useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);


    if (e.target.value) {
      setBlocs(
        blocs.filter((bloc) =>
          bloc.name.value.toLowerCase().startsWith(e.target.value.toLowerCase())
        )
      );
    } else getBlocs();
  };
  React.useEffect(() => {
    getBlocs()
  }, []);
  return (
    <div>
      <div className="search__input d-flex mb-4">
        <Input
          type="text"
          placeholder="Search By Name..."
          value={search}
          onChange={handleSearch}
        />
        <span className="mt-1" style={{ "transform": "translateX(-30px)" }}>
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
      <Row>
        {blocs &&
          blocs.map((bloc, index) => (
            <Col sm="6" lg="6" xl="3" key={index}>
              <BlocsCard
                image={bg1}
                id={bloc.ID.value}
                name={bloc.name.value}
                status={bloc.status.value}
                color={"primary"}
              />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default BlocsPage;
