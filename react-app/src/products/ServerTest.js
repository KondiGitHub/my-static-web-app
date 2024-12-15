// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // If you're using axios

function ServerTest() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the Node.js service when the component mounts
    axios.get('https://samplenode-dxa9fdevhecvcbez.eastus2-01.azurewebsites.net/allMedia')
      .then(response => {
        setData(response.data);  // Store the data from the server
        setLoading(false);  // Set loading to false when data is received
      })
      .catch(err => {
        setError(err.message); // Set error message in case of failure
        setLoading(false);  // Set loading to false even if there is an error
      });
  }, []);  // Empty dependency array means this runs once after initial render

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
     <h1>Users List</h1>
      <ul>
        {/* Loop through the data array and display each item */}
        {data.map(user => (
          <li key={user.id}>
            <strong>{user.id}</strong> (year: {user.year})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ServerTest;
