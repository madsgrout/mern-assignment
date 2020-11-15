import React, {Component} from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API;

export default class CreateQuestion extends Component {
    constructor(props){
        super();

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeQuestion = this.onChangeQuestion.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: '',
            question: '',
            username: ''
        }
    }

    onChangeTitle(e){
        this.setState({
            title: e.target.value
        });
    }

    onChangeQuestion(e){
        this.setState({
            question: e.target.value
        });
    }
    
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const question = {
            title: this.state.title,
            question: this.state.question,
            username: this.state.username,
        };

        console.log(question);

        axios.post(`${API_URL}/questions/add`, question)
            .then(res => console.log(res.data))
            .catch(error => console.log(error));

        window.location = '/';
    }

    render() {
        return(
            <div>
                <h3>Create New Question</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                    <label>Title: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.title}
                        onChange={this.onChangeTitle}
                        />
                    </div>
                    <div className="form-group"> 
                    <label>Question: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.question}
                        onChange={this.onChangeQuestion}
                        />
                    </div>
                    <div className="form-group">
                    <label>Username: </label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                    <input type="submit" value="Create Question" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}