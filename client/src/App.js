import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar.js';
const API_URL = process.env.REACT_APP_API;

const Question = props => (
  <div>
      <div className="card">
          <div className="card-header">Question by {props.question.username}</div>
              <div className="card-body">
                  <h5 className="card-title">{props.question.title}</h5>
                  <p className="card-text">{props.question.question}</p>
          </div>
      </div>
      <br/>
  </div> 
)

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
      <AppNavbar/>
      <h1>Questions</h1>
      <br/>
      {data.map(currentQuestion => {
        return <Question question = {currentQuestion} key={currentQuestion._id}/>;
      })}
    </>
  );
}

export default App;