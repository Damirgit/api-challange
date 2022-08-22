import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./graphql";
import SingleMissions from "./pages/SingleMissions";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import SpaceMission from "./graphql";
import { useNavigate } from 'react-router-dom';

function Root() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [item, setItem] = useState(undefined)

  const loadSpaceMission = async () => {
    const spaceMissions = await SpaceMission.getSpaceMission(10);
    setData(spaceMissions);
  };

  const onItemClick = (item) => {
    setItem(item)
    navigate(`/details?missionName=${item.mission_name}`);
  }

  useEffect(() => {
    const missionName = decodeURIComponent(window.location.search.split('=')[1])
    setItem(data.find(item => item.mission_name === missionName))
  }, [data]);

  useEffect(() => {
    loadSpaceMission();
  }, []);

  return <div>
    <Routes>
      <Route path="/" element={<App data={data} onItemClick={onItemClick} />} />
      <Route path="/details" element={<SingleMissions item={item} />} />
    </Routes>
  </div>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
