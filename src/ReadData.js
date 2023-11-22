import logo from "./logo.svg";
import "./App.css";
import { useContext, useEffect, useState } from "react";
import Table from "./Table";
import axios from "axios";
import { Context } from "./Context";

function ReadData() {
  const [uuid, setUUID] = useContext(Context);
  const [inputParams, setInputParams] = useState({
    azureStorageAccountName: "pltaxidatalake1",
    azureContainerName: "taxidata",
    azureFilePath: "Output",
    azureFileName: "YellowTaxisNew.delta",
    azureConditionId: "VendorId=5",
    sparkSessionUUID: uuid,
  });
  const [headers, setHeaders] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (tableData.length > 0) {
      setHeaders(Object.keys(tableData[0]));
    }
  }, [tableData]);

  function loadData(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8080/api/spark/read/taxidata", inputParams)
      .then((data) => {
        let arr = [];
        data.data.forEach((element) => {
          arr.push(JSON.parse(element));
        });
        setTableData(arr);
      });
    console.log(inputParams);
  }

  return (
    <div className="App">
      <h1>Form</h1>
      <form onSubmit={(event) => loadData(event)}>
        <div className="form-element">
          <label>Storage Account Name</label>
          <input
            value={inputParams.azureStorageAccountName}
            onChange={(event) =>
              setInputParams({
                ...inputParams,
                azureStorageAccountName: event.target.value,
              })
            }
          ></input>
        </div>

        <div className="form-element">
          <label>Container Name</label>
          <input
            value={inputParams.azureContainerName}
            onChange={(event) =>
              setInputParams({
                ...inputParams,
                azureContainerName: event.target.value,
              })
            }
            x
          ></input>
        </div>
        <div className="form-element">
          <label>File Path</label>
          <input
            value={inputParams.azureFilePath}
            onChange={(event) =>
              setInputParams({
                ...inputParams,
                azureFilePath: event.target.value,
              })
            }
          ></input>
        </div>
        <div className="form-element">
          <label>File Name</label>
          <input
            value={inputParams.azureFileName}
            onChange={(event) =>
              setInputParams({
                ...inputParams,
                azureFileName: event.target.value,
              })
            }
          ></input>
        </div>
        <div className="form-element">
          <label>Condition</label>
          <input
            value={inputParams.azureConditionId}
            onChange={(event) =>
              setInputParams({
                ...inputParams,
                azureConditionId: event.target.value,
              })
            }
          ></input>
        </div>
        <div className="form-element js-center">
          <input
            className="display-button"
            type="submit"
            value="Display Data"
          ></input>
        </div>
      </form>

      <h1>Display table data</h1>
      <div className="table">
        <Table headers={headers} data={tableData}></Table>
      </div>
    </div>
  );
}

export default ReadData;
