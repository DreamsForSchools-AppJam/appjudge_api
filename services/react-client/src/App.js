import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  
  constructor(){
    super();
    this.getJudges();
  }

  getJudges(){
    axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/judges`)
    .then((res) => { console.log(res); })
    .catch((err) => { console.log(err); });
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-one-third">
              <br/>
                <h1 className="title is-1">All Judges</h1>
              <hr/><br/>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
