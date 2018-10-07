import React, { Component } from 'react';
import './App.css'; //WebPack to this magic
import Person from './Person/Person';

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

    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1x solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if(this.state.showPersons) {
        persons = (
          <div>
          {this.state.persons.map((person, index) => { //Use map to iterate
            return <Person 
                      click={this.deletePersonHandler}
                      name={person.name} 
                      age={person.age}
                      key={person.id}
                      changed={(event) => this.nameChangedHandler(event, person.id)}/>
          })}
        </div>
        );

        style.backgroundColor = 'red';
    }

    //Join elems into one string, separated by ' '
    //const classes = ['red', 'bold'].join(' ');
    const classes = [];
    if(this.state.persons.length <= 2) {
      classes.push('red');
    }
    if(this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React app</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        <button 
          style={style}
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