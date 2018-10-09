import React, { Component } from 'react';
import classes from './App.css'; //WebPack to this magic
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {
  
  state = {
    persons: [
      { id: 'asda1', name: 'Max', age: 28 },
      { id: 'qeqew', name: 'Manu', age: 29 },
      { id: '12312312', name: 'Stephanie', age: 26 }
    ],
    otherState : 'bla',
    showPersons: false
  }

  switchNameHandler = (newName) => {
    console.log('Was clicked!');
    //X this.state.persons[0].name = "Pepe";
    this.setState({persons : [
      { name: newName, age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 27 }
    ]})
  }

  nameChangedHandler = (event, id) => {
    
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    })
    
    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons : persons})
  }

  togglePersonsHandler = () => {
    this.setState(
      {showPersons: !this.state.showPersons}
    )
  }

  deletePersonHandler = (personIndex) => {
      //const persons = this.state.persons.slice(); //copies the full array
      const persons = [...this.state.persons]; //Another option to create persons copy
      persons.splice(personIndex, 1);
      this.setState({persons: persons});
  }

  
  render() {

    let persons = null;
    let btnClass = null;

    if(this.state.showPersons) {
        persons = (
          <div>
          {this.state.persons.map((person, index) => { //Use map to iterate
            return <ErrorBoundary key={person.id}>
                    <Person 
                      click={this.deletePersonHandler}
                      name={person.name} 
                      age={person.age}
                      changed={(event) => this.nameChangedHandler(event, person.id)}/>
                      </ErrorBoundary>
          })}
        </div>
        );

        btnClass = classes.Red;
    }

    //Join elems into one string, separated by ' '
    //const classes = ['red', 'bold'].join(' ');
    const assignedClasses = [];
    if(this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if(this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React app</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button 
          className={btnClass}
          //onClick={() => this.switchNameHandler('Maximilian!!')}>
          onClick={this.togglePersonsHandler}>
          Toggle Persons
        </button>
       {persons} 
      </div>
    );
  }
}

export default App;