import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BlobServiceClient } from "@azure/storage-blob";

function Flowers() {
    const [bouquets, setBouquets] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
   
   useEffect(() => {
      const fetchBouquets = async () => {
        try {
             const STORAGE_ACCOUNT='https://mailaramstorage.blob.core.windows.net'
            const SAS_TOKEN='sv=2022-11-02&ss=bfqt&srt=sco&sp=rwlacupiytfx&se=2024-12-29T12%3A16%3A10Z&st=2024-12-19T04%3A16%3A10Z&spr=https&sig=6aawNzPF9eJlBsAKABgeiy6Du8PitzYmHwWIvbPoemI%3D'
           const endpoint = `${STORAGE_ACCOUNT}/?${SAS_TOKEN}`;
           const STORAGE_CONTAINER_NAME = "ammuluarts"
          const blobServiceClient = new BlobServiceClient(endpoint);
          const containerClient = blobServiceClient.getContainerClient(STORAGE_CONTAINER_NAME);
          const blobs = [];

          const url = `${containerClient.url}`;
          console.log(url)
  

          // Parse the response and populate bouquets (response processing depends on actual Azure response format)
      for await (const blob of containerClient.listBlobsFlat()) {
        console.log(SAS_TOKEN)
        let sas = SAS_TOKEN.replace(/:/g, "%3A")
        console.log(sas)
        const blobUrl = `${STORAGE_ACCOUNT}/${STORAGE_CONTAINER_NAME}/${blob.name}?${sas}`;
        console.log(blobUrl)
       
        blobs.push({
          id: blob.name,
          name: blob.name.replace(/\.[^/.]+$/, ""), // Remove file extension for display
          price: "$30", // Placeholder price
          image: blobUrl,
        });
      }
  
          setBouquets(blobs);
        } catch (error) {
            setErrorMessage("Failed to fetch data. Please check your CORS settings or network connection.");
        console.error("Error fetching bouquets:", error);
          console.error("Error fetching bouquets:", error);
        }
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
        <div>
        <h1>Stock Cloth Flowers for Sale</h1>
        <p>Choose from a wide variety of beautiful cloth flower bouquets!</p>
        {errorMessage ? (
          <p style={{ color: "red" }}>{errorMessage}</p>
        ) : (
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {bouquets.map((bouquet) => (
              <div
                key={bouquet.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "5px",
                  textAlign: "center",
                }}
              >
                <img
                  src={bouquet.image}
                  alt={bouquet.name}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => handleImageClick(bouquet.image)}
                />
                <h3>{bouquet.name}</h3>
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