import "./App.css";
import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "./Context";

function CreateSession() {
  const [uuid, setUUID] = useContext(Context);

  const [inputParams, setInputParams] = useState({
    azureAppName: "PSDeltaLakeDemoRG",
    azureClientId: "b33ce05c-63e0-42cb-9d75-6efe5a0d86df",
    azureClientSecret: "n+NZtxvNMmEAzq8sgnGGFz0if/0ZXQPZrmwqHjj3UZE=",
    azureStorageAccountKey:
      "tt92YNKNv9SpcUnvjSHIsAdERGlS03wZnYJqZac2FklsT1vcUoG6T08+OSDC89YIWzTA/WNHLLo1+AStIj3KEQ==",
    azureTenantId: "6a310e33-5293-4125-87b1-0c69a570347f",
    azureStorageAccountName: "pltaxidatalake1",
  });

  function loadData(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8080/api/spark/create/sparksession", inputParams)
      .then((data) => {
        console.log(data.data.split(":")[1]);
        setUUID(data.data.split(":")[1]);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(inputParams);
  }

  return (
    <div className="App">
      <h1>Form</h1>
      <form onSubmit={(event) => loadData(event)}>
        <div className="form-element">
          <label>App Name</label>
          <input
            value={inputParams.azureAppName}
            onChange={(event) =>
              setInputParams({
                ...inputParams,
                azureAppName: event.target.value,
              })
            }
          ></input>
        </div>
        <div className="form-element">
          <label>Client ID</label>
          <input
            value={inputParams.azureClientId}
            onChange={(event) =>
              setInputParams({
                ...inputParams,
                azureClientId: event.target.value,
              })
            }
          ></input>
        </div>
        <div className="form-element">
          <label>Client Secret</label>
          <input
            value={inputParams.azureClientSecret}
            onChange={(event) =>
              setInputParams({
                ...inputParams,
                azureClientSecret: event.target.value,
              })
            }
          ></input>
        </div>
        <div className="form-element">
          <label>Storage Account Key</label>
          <input
            value={inputParams.azureStorageAccountKey}
            onChange={(event) =>
              setInputParams({
                ...inputParams,
                azureStorageAccountKey: event.target.value,
              })
            }
          ></input>
        </div>
        <div className="form-element">
          <label>Tenant Id</label>
          <input
            value={inputParams.azureTenantId}
            onChange={(event) =>
              setInputParams({
                ...inputParams,
                azureTenantId: event.target.value,
              })
            }
          ></input>
        </div>
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

        <div className="form-element js-center">
          <input
            className="display-button"
            type="submit"
            value="Create Session"
          ></input>
        </div>
      </form>
    </div>
  );
}

export default CreateSession;
