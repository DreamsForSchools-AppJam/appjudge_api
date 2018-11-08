import React, { Component } from 'react';
import SearchAppBar from './components/SearchAppBar'
import './App.css';
import ScrollableTabsButtton from './components/ScrollableTabsButtton';

class App extends Component {
  
  constructor(){
    super();
    this.state = {
      judges: []
    };
  }

  render() {
    return (
      // <section className="section">
      //   <div className="container">
      //     <div className="columns">
      //       <div className="column is-one-third">
      //         <br/>
      //           <h1 className="title is-1">All Judges</h1>
      //         <hr/><br/>
      //         <JudgesList judges={this.state.judges}/>
      //       </div>
      //     </div>
      //   </div>
      // </section>
      <div>
        <SearchAppBar />
        <div>
          <ScrollableTabsButtton />
        </div> 
      </div>
    );
  }
}

export default App;
