import React, { Component } from 'react';
import SearchAppBar from './AppBars/SearchAppBar'
import ScrollableTabsButtton from './ScrollableTabsButtton';


class AdminHome extends Component {
  
    constructor(props){
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <div>
                    <SearchAppBar text="AppJudge++  Admin Portal"/>
                </div>
                <div>
                    <ScrollableTabsButtton />
                </div>
            </div>
        );
    }
}

export default AdminHome;