import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { card } from 'mtgsdk';

const INITIAL = 'initial';
const LOADING = 'loading';
const ERROR = 'error';
const SHOW_CARDS = 'show_cards';

class App extends Component {
  state = { cards: [], state: 'initial' };
  fetchCards(type) {
    card
      .where({ type, random: 'true', pageSize: 3, gameFormat: 'Vintage' })
      .then(cards => {
        this.setState({ cards, state: SHOW_CARDS });
      })
      .catch(error => this.setState({ cards: [], error: JSON.stringify(error) }));
    this.setState({ state: LOADING });
  }

  handleInstant = () => {
    this.fetchCards('instant');
  };

  handleSorccery = () => {
    this.fetchCards('sorcery');
  };

  handleReset = () => {
    this.setState({ state: INITIAL });
  };

  render() {
    switch (this.state.state) {
      case INITIAL:
        return (
          <div className="body">
            <button className="buttons" onClick={this.handleInstant}>
              Instant
            </button>
            <button className="buttons" onClick={this.handleSorccery}>
              Sorccery
            </button>
          </div>
        );
      case LOADING:
        return <div>LOADING</div>;
      case ERROR:
        return <div>{this.state.error}</div>;
      case SHOW_CARDS:
        return (
          <div className="center-vertically" onClick={this.handleReset}>
            <div className="image-carousel">
              {this.state.cards.map(({ name, imageUrl }) => (
                <img key={name} src={imageUrl} alt={name} />
              ))}
            </div>
          </div>
        );
    }
  }
}

export default App;
