import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API;

const Answer = props => (
    <tr>
      <td>{props.answer.answer}</td>
      <td>{props.answer.username}</td>
      <td>{props.answer.votes}</td>
      <td><Link to={"/"} className="btn btn-success" onClick={() => { props.handleUpvote(props.answer._id) }}>Upvote</Link></td>
      <td><Link to={"/"} className="btn btn-danger" onClick={() => { props.handleDownvote(props.answer._id) }}>Downvote</Link></td>
    </tr>
)

export default class Question extends Component {
    constructor(props){
        super(props);

        this.onChangeAnswer = this.onChangeAnswer.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.handleUpvote = this.handleUpvote.bind(this);
        this.handleDownvote = this.handleDownvote.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: '',
            question: '',
            username: '',
            answers:[],
            answer: '',
            answerUsername: '',
        }

    }

    componentDidMount(){
        const { params } = this.props.match;
        axios.get(`${API_URL}/questions/${params.id}`)
            .then(response => {
                this.setState({title: response.data.title});
                this.setState({question: response.data.question});
                this.setState({username: response.data.username});
                this.setState({answers: response.data.answers});
            })
            .catch((error) => {
                console.log(error);
            })
    }

    answerList() {
        return this.state.answers.map(currentanswer => {
          return <Answer answer={currentanswer} handleUpvote={this.handleUpvote} handleDownvote={this.handleDownvote} key={currentanswer._id}/>;
        })
    }

    onChangeAnswer(e){
        this.setState({
            answer: e.target.value
        });
    }
    
    onChangeUsername(e){
        this.setState({
            answerUsername: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const answer = {
            answer: this.state.answer,
            username: this.state.answerUsername,
        };

        console.log(answer);
        const { params } = this.props.match;
        axios.post(`${API_URL}/questions/${params.id}/addanswer`, answer)
            .then(res => console.log(res.data));

        window.location = `/${params.id}`;
    }

    handleUpvote(id){
        const { params } = this.props.match;
        axios.get(`${API_URL}/questions/${params.id}/upvoteanswer/${id}`)
            .then(res => console.log(res.data));

        window.location = `/${params.id}`;
    }
    handleDownvote(id){
        const { params } = this.props.match;
        axios.get(`${API_URL}/questions/${params.id}/downvoteanswer/${id}`)
            .then(res => console.log(res.data));

        window.location = `/${params.id}`;
    }

    render() {
        //console.log(this.state.answers);
        return(
            
            <div>
                <br/>
                <div className="card">
                    <div className="card-header">Question by {this.state.username}</div>
                        <div className="card-body">
                            <h5 className="card-title">{this.state.title}</h5>
                            <p className="card-text">{this.state.question}</p>
                            
                        </div>
                </div>
                <br/>
                <h3>Answers</h3>
                <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>Answer</th>
                    <th>Username</th>
                    <th>Votes</th>
                    <th>Upvote</th>
                    <th>Downvote</th>
                    </tr>
                </thead>
                <tbody>
                    { this.answerList() }
                </tbody>
                </table>
                <br/>
                <div>
                    <h3>Submit Answer</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group"> 
                        <label>Answer: </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.answer}
                            onChange={this.onChangeAnswer}
                            />
                        </div>
                        <div className="form-group"> 
                        <label>Username: </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.answerUsername}
                            onChange={this.onChangeUsername}
                            />
                        </div>
                        <div className="form-group">
                        <input type="submit" value="Submit Answer" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        );

    }
}