import React, { Component } from 'react';
// import SearchAppBar from './components/AppBars/SearchAppBar'
import './App.css';
import JudgeHome from './components/JudgeHome';
// import ScrollableTabsButtton from './components/ScrollableTabsButtton';
// import { Button } from '@material-ui/core';

class App extends Component {
  
  constructor(){
    super();
    this.state = {
      judges: []
    };
    this.update = this.update.bind(this)
  }

  update = () => {
    this.forceUpdate()
  }

  render() {
    return (
      <div id="root">
        {/* <SearchAppBar /> */}
        <div id="routes">
          {this.props.children}
        </div>
        <div>
          <JudgeHome team_list={[1,2]}/>
        </div>
        {/* <div>
          <ScrollableTabsButtton />
          <Button variant="flat" color="primary" onClick={this.update}>Refresh</Button>
        </div>  */}
      </div>
    );
  }
}

export default App;
