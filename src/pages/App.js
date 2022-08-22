import React from "react";
import "./App.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";

function App({ data, onItemClick }) {
  return (
    <MDBContainer className="py-32 max-width"   >
      <MDBRow>
        <h2>SpaceX GraphQL API in REACT</h2>
        {data.map((item, index) => (
          <MDBCard
            key={index}
            className='card'
            style={{ maxWidth: "22rem", maxHeight: "24rem" }}
            onClick={() => {
              onItemClick(item)
            }}
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
        ))}
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
