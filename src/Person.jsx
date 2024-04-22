import "./styles.css";
import Timer from "./Timer";
import data from "../userData.json";
import React, { useEffect, useState } from "react";

const getUserDataFromLocalStorage = () => {
  // Use JSON file and store in localStorage
  localStorage.setItem("userData", JSON.stringify(data));

  try {
    // Retrieve JSON data from localStorage
    const jsonData = localStorage.getItem("userData");

    if (jsonData) {
      // Parse JSON data
      const taskData = JSON.parse(jsonData);
      return taskData;
    } else {
      return null; // Return null if no data is found
    }
  } catch (error) {
    console.error("Error retrieving data:", error.message);
    return null;
  }
};

// Person component; contains basic information about the person.
// Contains a Timer component.
function Person() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      const data = getUserDataFromLocalStorage();
      setUserData(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <img src="https://www.copahost.com/blog/wp-content/uploads/2019/07/imgsize2.png" />
      {userData ? (
        <p>
          <h2>{userData.name}</h2>
          <p>
            <strong>Role: </strong>
            {userData.role}
          </p>
          <p>
            <strong>Age: </strong>
            {userData.age}
          </p>
          <p>
            <strong>Pronouns: </strong>
            {userData.pronouns}
          </p>
        </p>
      ) : (
        <p>No user information available.</p>
      )}

      <Timer />
    </div>
  );
}

export default Person;
