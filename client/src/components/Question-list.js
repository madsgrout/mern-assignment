import React, {Component} from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API;

const QuestionCard = props => (
  <div>
      <div className="card">
          <div className="card-header">Question by {props.question.username}</div>
              <div className="card-body">
                  <h5 className="card-title">{props.question.title}</h5>
                  <p className="card-text">{props.question.question}</p>
                  <Button href={"/"+props.question._id} color="primary">View Question</Button>
          </div>
      </div>
      <br/>
  </div> 
)

export default class QuestionList extends Component {
    constructor(props){
        super();

        this.state = {questions: []};
    }

    componentDidMount(){
        axios.get(`${API_URL}/questions`)
            .then(response => {
                this.setState({questions: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    questionList() {
        return this.state.questions.map(currentquestion => {
          return <QuestionCard question={currentquestion} deleteExercise={this.deleteExercise} key={currentquestion._id}/>;
        })
    }

    render() {
        return(
            <div>
                <h3>Questions</h3>
                { this.questionList() }
            </div>
        );
    }
}