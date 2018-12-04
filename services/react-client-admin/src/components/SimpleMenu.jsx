import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// Pass in Event as value and Title as title
class SimpleMenu extends React.Component {
	constructor(props){
		super(props)
		this.state = {
        anchorEl: null,
        title: props.title
      };
	}

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleChange(id, name){
    this.setState({
      title: name
    });
    this.props.setter(id)
    this.handleClose()
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          variant="outlined"
        >
          {this.state.title}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
					{this.props.value.map(item => {
            return (
            <MenuItem key={item.id} onClick={() => this.handleChange(item.id, item.name)}>
            [{item.id}] {item.name}
            </MenuItem>
						);
					})}
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;
