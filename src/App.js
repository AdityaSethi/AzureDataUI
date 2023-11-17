import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Table from "./Table";
import axios from "axios";

function App() {
  const [headers, setHeaders] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (tableData.length > 0) {
      setHeaders(Object.keys(tableData[0]));
    }
  }, [tableData]);

  function loadData() {
    axios.get("http://localhost:8080/api/spark/read/taxidata").then((data) => {
      setTableData(data.data);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>Azure Data UI</div>
      </header>

      <h1>Display table data</h1>
      <button className="display-button" onClick={() => loadData()}>
        {" "}
        Display Data
      </button>
      <div className="table">
        <Table headers={headers} data={tableData}></Table>
      </div>
    </div>
  );
}

export default App;
