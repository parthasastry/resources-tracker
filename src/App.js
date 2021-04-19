import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Heatmap from "./Heatmap";
import MySpinner from './MySpinner'
import ResReq from './ResReq'
import Availability from './Availability'

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url =
      "https://mrsh6w0v48.execute-api.us-east-1.amazonaws.com/dev/resources";
    axios
      .get(url)
      .then((data) => setData(data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <h1 className="text-center">Resource Allocation</h1>
          {data.length > 0 ? <Heatmap data={data} /> : <MySpinner />}
        </Route>
        
        <Route path="/rr" exact>
          <h1 className="text-center">Opportunities</h1>
          <ResReq />
        </Route>

        <Route path="/availability" exact>
          <h1 className="text-center">Resource Availability and Opportunities</h1>
          <Availability />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
