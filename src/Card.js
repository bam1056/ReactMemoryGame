import React from 'react'

class Card extends React.Component {

  render () {
    const direction = this.props.up ? 'up' : 'down'
    switch (direction) {
      case 'down': return <img src={this.props.value.backgroundURL} onClick={this.handleClick} className={`card ${direction}`} />
      break
      case 'up': return <img src={this.props.value.cardImageURL} className={`card ${direction}`} />
      break
      default: return <img src={this.props.value.backgroundURL} onClick={this.handleClick} className={`card ${direction}`} />
    }
  }
}

export default Card
