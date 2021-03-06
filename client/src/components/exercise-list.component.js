import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//functional react component
const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <button type="button" className="link-button" 
      onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</button>
    </td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(props) {   /* initialize the state with an empty exercises array */
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = {exercises: []};
  }

  //get the list of exercises from the database
  componentDidMount() {
    axios.get('https://mern-exe-tracker.herokuapp.com/exercises/')
     .then(response => {
       this.setState({ exercises: response.data });
     })
     .catch((error) => {
        console.log(error);
     })
  }

  //allow users to delete exercises
  deleteExercise(id) {
    axios.delete('https://mern-exe-tracker.herokuapp.com/exercises/'+id)
      .then(res => console.log(res.data));

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  //return the rows of the table
  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  render() {
    return (
      <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { this.exerciseList() }
        </tbody>
      </table>
    </div>
    )
  }
}
