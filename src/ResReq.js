import React, { useState, useEffect } from "react";
import axios from "axios";
import MySpinner from "./MySpinner";
import { Table } from "react-bootstrap";

const ResReq = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url =
      "https://mrsh6w0v48.execute-api.us-east-1.amazonaws.com/dev/opportunities";

    axios
      .get(url)
      .then((data) => setData(data.data))
      .catch((err) => console.log(err));
  }, []);

  const tableHeader =
    data.length > 0 ? (
      <thead>
        <tr>
          <th>RR</th>
          <th>Skill</th>
          <th>Proposed</th>
          <th>Opportunity</th>
          {data.length > 0 ? (
            data[0]["dates"].map((d) => <th key={d}>{d.substring(5, 10)}</th>)
          ) : (
            <p>No data</p>
          )}
        </tr>
      </thead>
    ) : (
      <p></p>
    );

  const tableData =
    data.length > 0 ? (
      data.map((d) => (
        <tr>
          <td>{d.name}</td>
          <td>{d.skill}</td>
          {d.proposed.length > 0 ? (
            <td>{d.proposed}</td>
          ) : (
            <td className="blank"></td>
          )}
          <td>{d.opportunity}</td>
          {d.hours.map((d) => {
            const className = d > 0 ? "data" : "zero";
            return <td className={className}>{d}</td>;
          })}
        </tr>
      ))
    ) : (
      <p></p>
    );

  const T = (
    <Table striped bordered hover size="sm" className="text-center">
      {tableHeader}
      <tbody>{tableData}</tbody>
    </Table>
  );

  return <div>{data.length > 0 ? T : <MySpinner />}</div>;
};

export default ResReq;
