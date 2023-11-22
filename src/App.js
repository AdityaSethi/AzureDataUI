import logo from "./logo.svg";
import "./App.css";
import { NavLink, Route, Routes } from "react-router-dom";
import CreateSession from "./CreateSession";
import ReadData from "./ReadData";
import { useState } from "react";
import { Context } from "./Context";

function App() {
  const [uuid, setUUID] = useState("");
  return (
    <Context.Provider value={[uuid, setUUID]}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>Azure Data UI</div>
        </header>
        <h1>Welcome to Azure Data UI</h1>
        <nav>
          <ul>
            <li>
              <NavLink activeclassname="active" to="/AzureDataUI">
                Create Session
              </NavLink>
            </li>
            <li>
              <NavLink activeclassname="active" to="/ReadData">
                Read Data
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/AzureDataUI" element={<CreateSession />} />
          <Route path="/ReadData" element={<ReadData />} />
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
