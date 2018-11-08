import React, { Component } from 'react';
import JudgesList from './components/JudgesList'
import SearchAppBar from './components/SearchAppBar'
import SimpleTable from './components/SimpleTable'
import SimpleExpansionPanel from './components/SimpleExpansionPanel'
import './App.css';
import axios from 'axios';
import ScrollableTabsButtton from './components/ScrollableTabsButtton';

class App extends Component {
  
  constructor(){
    super();
    this.state = {
      judges: []
    };
  }

  componentDidMount(){
    this.getJudges();
  };

  getJudges(){
    axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/judges`)
    .then((res) => { this.setState({ judges: res.data.data.judges }); })
    .catch((err) => { console.log(err); });
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
          {/* <JudgesList judges={this.state.judges}/> */}
          <ScrollableTabsButtton />
        </div> 
      </div>
    );
  }
}

export default App;
