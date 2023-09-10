import React, { useState, useEffect } from 'react';
import axios from 'axios';


function TrainCard({ train }) {
  return (
    <div className="train-card">
      <h2>{train.trainName}</h2>
      <p>Train Number: {train.trainNumber}</p>
      <p>Departure Time: {train.departureTime.Hours}:{train.departureTime.Minutes}:{train.departureTime.Seconds}</p>
      <p>Seats Available - Sleeper: {train.seatsAvailable.sleeper}, AC: {train.seatsAvailable.AC}</p>
      <p>Price - Sleeper: {train.price.sleeper}, AC: {train.price.AC}</p>
      <p>Delayed By: {train.delayedBy} minutes</p>
    </div>
  );
}

function TrainList() {
  const [trainData, setTrainData] = useState([]);

  useEffect(() => {
    // Replace this URL with your actual API endpoint
    const apiUrl = 'https://your-api-endpoint.com/trains';

    axios.get(apiUrl)
      .then((response) => {
        setTrainData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching train data:', error);
      });
  }, []);

  return (
    <div className="train-list">
      <h1>Train List</h1>
      <div className="train-cards">
        {trainData.map((train) => (
          <TrainCard key={train._id} train={train} />
        ))}
      </div>
    </div>
  );
}

function getTrains() {
  return (
    <div className="App">
      <TrainList />
    </div>
  );
}

export default getTrains;
