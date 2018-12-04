import React, { Component } from 'react';
// import SearchAppBar from './components/AppBars/SearchAppBar'
import './App.css';
// import JudgeLogin from './components/Login/JudgeLogin';
import { Redirect } from 'react-router-dom'


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
        <main>
          {this.props.children}
        </main>
        {/* <JudgeLogin></JudgeLogin> */}
        <Redirect to='/home'/>
        {/* <div>
          <JudgeHome team_list={[1,2,3]}/>
        </div> */}
        {/* <div>
          <ScrollableTabsButtton />
          <Button variant="flat" color="primary" onClick={this.update}>Refresh</Button>
        </div>  */}
      </div>
    );
  }
}

export default App;
