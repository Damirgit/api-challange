import React, { useEffect, useState } from "react";
import "./App.css";
import SpaceMission from "./graphql";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
function App() {
  const [data, setData] = useState([]);
  const loadSpaceMission = async () => {
    const spaceMissions = await SpaceMission.getSpaceMission(10);
    setData(spaceMissions);
  };

  useEffect(() => {
    loadSpaceMission();
  }, []);

  console.log("data", data);
  return (
    <MDBContainer className="py-32 max-width"
      // style={{
      //   margin: "auto",
      //   padding: "15px",
      //   maxWidth: "720px",
      //   alignContent: "center",
      // }}
    >
      <MDBRow>
        <h2>SpaceX GraphQL API in REACT</h2>
        {data.map((item, index) => (
          <>
            <MDBCard
              key={index}
              style={{ maxWidth: "22rem", maxHeight: "24rem" }}
            >
              <MDBCardImage
                src={
                  item && item.ships[0] && item.ships[0].image
                    ? item.ships[0].image
                    : "https://i.imgur.com/MtEgYbY.jpg"
                }
                position="top"
                alt={item.mission_name}
              />
              <MDBCardBody>
                <MDBCardTitle>{item.mission_name}</MDBCardTitle>
                <MDBCardText>{item.launch_site.site_name_long}</MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </>
        ))}
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
