import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';


const Project = props => (
    <tr>
        <td>{props.project.username}</td>
        <td>{props.project.description}</td>
        <td>
            <Link to={"/edit/"+props.project._id}>edit</Link> | <a href='#' onClick={() => {props.deleteProject(props.project._id)}}>delete</a>
        </td>
    </tr>
)


export default class ProjectList extends Component
{
    constructor(props){
        super(props);

        this.deleteProject = this.deleteProject.bind(this);

        this.state = {projects: []};
        
    }

    componentDidMount(){
        axios.get('http://localhost:5000/projects/')
        .then(response => {
            this.setState({projects: response.data})
        })
        .catch((error) => {
            console.log(error);
        })
        

    }

    deleteProject(id){
        axios.delete('http://localhost:5000/projects/'+id)
        .then(res => console.log(res.data));
        this.setState({
            projects: this.state.projects.filter(el => el._id !== id)
        })
    }

    projectList(){
        return this.state.projects.map(currentProject => {
            return <Project project = {currentProject} deleteProject={this.deleteProject} key = {currentProject._id}/>
        })
    }

    render(){
        return (
            <div>
                <h3>Projects</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.projectList()}
                    </tbody>
                </table>
            </div>
        );
    };
}