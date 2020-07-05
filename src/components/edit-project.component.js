
import React, {Component} from 'react';
import axios from 'axios';

export default class EditProject extends Component
{
    constructor(props){
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username : '',
            description : '',
            users : [] 
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/projects/'+this.props.match.params.id)
        .then(response => {
            this.setState({
                username: response.data.username,
                description: response.data.description
            })
        })
        .catch(function(error){
            console.log(error);
        })

        axios.get('http://localhost:5000/users/')
        .then(response => {
            if(response.data.length > 0){
                this.setState({
                    users: response.data.map(user => user.username),
                    username: response.data[0].username
                })
            }
        })
    }

    onChangeUserName(e){
        this.setState({
            username : e.target.value
        })
    }

    onChangeDescription(e){
        this.setState({
            description : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const project = {
            username : this.state.username,
            description : this.state.description
        } 
        console.log(project);
        
        axios.post('http://localhost:5000/projects/update/'+this.props.match.params.id, project)
        .then(res => console.log(res.data));

        window.location = '/';
    }

    render(){
        return (
            <div>
                <h3>Edit Project</h3>
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <label>username</label> 
                        <select ref="userInput"
                        required
                        className = "form-control"
                        value = {this.state.username}
                        onChange={this.onChangeUserName}>
                            {
                                this.state.users.map(function(user){
                                    return <option
                                    key={user}
                                    value ={user} > {user}
                                </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className = "form-group">
                        <label>description</label> 
                        <input type="text"
                        required
                        className = "form-control"
                        value = {this.state.description}
                        onChange={this.onChangeDescription}/>
    
                    </div>
                    <div className = "form-group">
                        <input type = "submit" value = "Edit New project" className = "btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    };
}