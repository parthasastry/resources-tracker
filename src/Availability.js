import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Form, Row, Col, InputGroup } from "react-bootstrap";
import MySpinner from "./MySpinner";

function getData(dates, resource, data) {
  const renderData = data.filter((d) => d["Resource"] === resource);
  const tableData = renderData.map((d, i) => {
    return (
      <tr key={i}>
        <td>{d["Type"]}</td>
        <td>{d["RR"]}</td>
        <td>{d["Skill"]}</td>
        <td>{d["Project"]}</td>
        {dates.map((h) => {
          return d[h] === 0 ? <td></td> : <td>{d[h]}</td>;
        })}
      </tr>
    );
  });

  return tableData;
}

const Availability = () => {
  const [result, setResult] = useState([]);
  const [baseData, setBaseData] = useState([]);

  useEffect(() => {
    const url =
      "https://mrsh6w0v48.execute-api.us-east-1.amazonaws.com/dev/availability";

    axios
      .get(url)
      .then((data) => {
        setBaseData(data.data);
        setResult(data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onChange = (e) => {
    e.preventDefault();
    const searchString = e.target.value;
    const newResult = baseData.filter((d) =>
      d["Resource"].toLowerCase().includes(searchString.toLowerCase())
    );
    setResult(newResult);
    console.log(newResult);
  };

  const searchForm = (
    <Container>
      <Form.Row>
        <Form.Group as={Col}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
              <i className="fas fa-search"></i>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control type="text" placeholder="Search for specific resource here.." onChange={onChange} />
          </InputGroup>
        </Form.Group>
      </Form.Row>
    </Container>
  );

  const resources =
    result.length > 0 ? [...new Set(result.map((d) => d["Resource"]))] : [];

  const headings = result.length > 0 ? Object.keys(result[0]) : [];
  const dates =
    result.length > 0 ? headings.filter((d) => d.includes("2021")) : [];

  const tableHead = (
    <thead>
      <tr>
        <th>Type</th>
        <th>RR</th>
        <th>Skill</th>
        <th>Project</th>
        {headings.map((h) => {
          const month_day = h.split("-");
          const month_day_display = month_day[1] + "/" + month_day[2];
          return h.includes("2021") ? <th key={h}>{month_day_display}</th> : "";
        })}
      </tr>
    </thead>
  );

  const renderData = resources.map((resource) => {
    const resourceData = getData(dates, resource, result);
    const renderResource = resource === "" ? "Not Assigned" : resource;
    return (
      <div className="m-1">
        <h3>{renderResource}</h3>
        <Table striped bordered hover size="sm">
          {tableHead}
          <tbody>{resourceData}</tbody>
        </Table>
      </div>
    );
  });

  return (
    <div>
      {searchForm}

      {result.length > 0 ? renderData : <MySpinner />}
    </div>
  );
};

export default Availability;
