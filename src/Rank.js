import React from 'react';

class Rank extends React {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data
    }
  }

  render() {
    return (
      <RankGroup data={this.state.group}/>
    )
  }
}

export default Rank