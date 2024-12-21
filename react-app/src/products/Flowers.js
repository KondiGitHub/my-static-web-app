import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'; // If you're using axios

function Flowers() {
    const [bouquets, setBouquets] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchBouquets = async () => {
                axios.get('https://samplenode-dxa9fdevhecvcbez.eastus2-01.azurewebsites.net/api/flowers')
                .then(response => {
                  setBouquets(response.data);
                })
                .catch(err => {
                  setErrorMessage(err.message); // Set error message in case of failure
                });
            
        };

        fetchBouquets();
    }, []);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    return (
        <div
        style={{
          position: "relative",
          paddingTop: "70px",
          background: "#fefbd8", // Add beautiful background color to body
          minHeight: "100vh",
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
        <header
          style={{
            position: "fixed",
            top: 0,
            width: "100%",
            backgroundColor: "#add8e6",
            borderBottom: "1px solid #ddd",
            zIndex: 1000,
            textAlign: "center",
            padding: "10px 0",
            boxSizing: "border-box",
          }}
        >
          <h1 style={{ margin: 0 }}>Stock Cloth Flowers for Sale</h1>
        </header>
        <p style={{ margin: "20px 0", padding: "10px", fontSize: "18px" }}>
          Choose from a wide variety of beautiful cloth flower bouquets!
        </p>
        {errorMessage ? (
          <p style={{ color: "red" }}>{errorMessage}</p>
        ) : (
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              justifyContent: "center", // Center align images
              marginTop: "20px",
              overflowY: "auto",
              maxHeight: "calc(100vh - 90px)",
              padding: "10px 20px",
              boxSizing: "border-box",
            }}
          >
            {bouquets.map((bouquet) => (
              <div
                key={bouquet._id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "5px",
                  textAlign: "center",
                  backgroundColor: "#fff",
                }}
              >
                <img
                  src={bouquet.src}
                  alt={bouquet.title}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => handleImageClick(bouquet.src)}
                />
                <h3>{bouquet.title}</h3>
                <p>{bouquet.price}</p>
              </div>
            ))}
          </div>
        )}
  
        {selectedImage && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 2000,
            }}
            onClick={closeImageModal}
          >
            <img
              src={selectedImage}
              alt="Selected"
              style={{ maxWidth: "90%", maxHeight: "90%" }}
            />
          </div>
        )}
  
        <div style={{ marginTop: "20px" }}>
          <Link to="/login" style={{ marginRight: "10px" }}>
            Login
          </Link>
          <Link to="/payment">Go to Payment</Link>
        </div>
      </div>
    );
}

export default Flowers;