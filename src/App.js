import React, { Component }from 'react'
import './style.sass'
import Card from './Card'
import logo from './lotrlogo.svg'

const SHOW_CARD = 1500
const cardArray = [
  {
    "name": "card1",
    "backgroundURL": "http://orig09.deviantart.net/57d9/f/2012/043/0/4/the_lord_of_the_rings_golden_movie_logo_by_freeco-d4phvpy.jpg",
    "cardImageURL": "http://www.kevinhalloran.net/wp-content/uploads/2013/06/Obscure-Bible-Character-Lord-of-the-Rings-Character-Gollum-300x300.jpg",
    isMatched: false
  },
  {
    "name": "card2",
    "backgroundURL": "http://orig09.deviantart.net/57d9/f/2012/043/0/4/the_lord_of_the_rings_golden_movie_logo_by_freeco-d4phvpy.jpg",
    "cardImageURL": "https://img.buzzfeed.com/buzzfeed-static/static/2014-07/29/11/campaign_images/webdr08/19-things-the-lord-of-the-rings-characters-were-r-2-19264-1406647286-29_dblbig.jpg",
    isMatched: false
  },
  {
    "name": "card3",
    "backgroundURL": "http://orig09.deviantart.net/57d9/f/2012/043/0/4/the_lord_of_the_rings_golden_movie_logo_by_freeco-d4phvpy.jpg",
    "cardImageURL": "https://i.ytimg.com/vi/0-0D8LI1wPM/maxresdefault.jpg",
    isMatched: false
  },
  {
    "name": "card4",
    "backgroundURL": "http://orig09.deviantart.net/57d9/f/2012/043/0/4/the_lord_of_the_rings_golden_movie_logo_by_freeco-d4phvpy.jpg",
    "cardImageURL": "http://i.dailymail.co.uk/i/pix/2011/12/21/article-0-0F3DAA7100000578-519_634x417.jpg",
    isMatched: false
  },
  {
    "name": "card5",
    "backgroundURL": "http://orig09.deviantart.net/57d9/f/2012/043/0/4/the_lord_of_the_rings_golden_movie_logo_by_freeco-d4phvpy.jpg",
    "cardImageURL": "http://images4.fanpop.com/image/polls/589000/589210_1291151951607_full.jpg?v=1291151984",
    isMatched: false
  },
  {
    "name": "card6",
    "backgroundURL": "http://orig09.deviantart.net/57d9/f/2012/043/0/4/the_lord_of_the_rings_golden_movie_logo_by_freeco-d4phvpy.jpg",
    "cardImageURL": "http://www.rockmeon.com.br/wp-content/uploads/2015/10/Aragorn3.jpg",
    isMatched: false
  },
  {
    "name": "card7",
    "backgroundURL": "http://orig09.deviantart.net/57d9/f/2012/043/0/4/the_lord_of_the_rings_golden_movie_logo_by_freeco-d4phvpy.jpg",
    "cardImageURL": "http://www-images.theonering.org/torwp/wp-content/uploads/2013/05/samwise-gamgee-300x184.jpg",
    isMatched: false
  },
  {
    "name": "card8",
    "backgroundURL": "http://orig09.deviantart.net/57d9/f/2012/043/0/4/the_lord_of_the_rings_golden_movie_logo_by_freeco-d4phvpy.jpg",
    "cardImageURL": "http://www.top5bin.com/wp-content/uploads/2013/02/Galadriel_-_LOTR-300x205.png",
    isMatched: false
  },
  {
    "name": "card9",
    "backgroundURL": "http://orig09.deviantart.net/57d9/f/2012/043/0/4/the_lord_of_the_rings_golden_movie_logo_by_freeco-d4phvpy.jpg",
    "cardImageURL": "http://images6.fanpop.com/image/polls/1119000/1119320_1348015724581_full.jpg?v=1348016186",
    isMatched: false
  }
]

class App extends Component {
  constructor () {
    super()
    this.state = {
      cards: [],
      matched: [],
      turned: [],
      win: false
    }
  }

  // let myCoolFunction1 = function () {
  //   return 'I am a cool function';
  // }
  // 
  // myCoolFunction2 () {
  //   return 'I am also cool';
  // }
  //
  // let myCoolFunction3 = () => {
  //   return 'I am cool as well'
  // }
  //
  // myCoolFunction4 = () => 'I am really cool';

  componentWillMount () {
    const game = JSON.parse(window.sessionStorage.getItem('game'))
    if (game && !game.win){
      this.setState(game)
    } else
      this.setState({
      cards: this._randomizeCards(cardArray.concat(cardArray)),
      matched: [],
      win: false
    })
  }

  _randomizeCards =  (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex

  // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
    return array
  }


  render () {
    if (!this.state.win) {
      const cards = this.state.cards.map((card, index) => {
        let up = !this.state.turned.includes(index) ? this.state.matched.includes(index) : this.state.turned.includes(index)
        return <Card flipCard={this.flipCard}
                      value={card}
                      up={up}
                      index={index}
                      key={index} />
      })
      return <div className="Home">
          <img src={logo} height="200px" alt="lotr logo" />
          <h1>Games Won: {window.sessionStorage.getItem('score')}</h1>
          <main>
            {cards}
          </main>
          <footer>
            <h5>&copy;Brett Macy Productions, Inc.</h5>
          </footer>
        </div>
    } else {
      let score = JSON.stringify(+window.sessionStorage.getItem('score') + 1)
      window.sessionStorage.setItem('score',`${score}`)
      return <div className="Win">
          <h1> THE PRECIOUS WINS!</h1>
          <img height="850" width="496" src="http://vignette3.wikia.nocookie.net/lotr/images/e/e1/Gollum_Render.png/revision/20141216091433" alt="gollum" />
          <button onClick={this._reset}>Click for New Game</button>
        </div>
      }
  }
}
export default App
