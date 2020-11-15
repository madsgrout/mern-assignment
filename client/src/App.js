import React, {useEffect, useState} from 'react';
const API_URL = process.env.REACT_APP_API;

function App() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    async function getData() {
      const url = `${API_URL}/questions`;
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    }
    getData();
  }, []); 

  return (
    <>
      <h1>Question App!</h1>
      <p>Data from server:</p> 
      {data.map(question => {
        return <p key={question._id}>{question.name} ({question._id})</p>;
      })}
    </>
  );
}

export default App;