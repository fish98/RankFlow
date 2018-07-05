import React from "react";

class RankGroip extends React {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data
    }
  }

  render() {
    return (
      this.state.data.forEach((i,d)=>{
        <RankItems data={d}/>
      })
    )
  }
}

export default Rank