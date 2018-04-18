import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { card } from 'mtgsdk';
import { RingLoader } from 'react-spinners';
import { AwesomeButtonProgress } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-blue.css';

const INITIAL = 'initial';
const LOADING = 'loading';
const ERROR = 'error';
const SHOW_CARDS = 'show_cards';

class App extends Component {
  state = { cards: [], state: 'initial' };
  fetchCards(type, next) {
    card
      .where({ type, random: 'true', pageSize: 3, gameFormat: 'Vintage' })
      .then(cards => {
        this.setState({ cards, state: SHOW_CARDS });
        next();
      })
      .catch(error => this.setState({ cards: [], error: JSON.stringify(error) }));
    // this.setState({ state: LOADING });
  }

  handleInstant = next => {
    this.fetchCards('instant', next);
  };

  handleSorccery = next => {
    this.fetchCards('sorcery', next);
  };

  handleReset = () => {
    this.setState({ state: INITIAL });
  };

  render() {
    switch (this.state.state) {
      case INITIAL:
        return (
          <div className="body center-vertically">
            <div className="center-horizontally">
              <AwesomeButtonProgress
                type="primary"
                size="large"
                action={(element, next) => this.handleInstant(next)}
              >
                Instant
              </AwesomeButtonProgress>
              <AwesomeButtonProgress
                type="secondary"
                size="large"
                action={(element, next) => this.handleSorccery(next)}
              >
                Sorcery
              </AwesomeButtonProgress>
            </div>
          </div>
        );
      case LOADING:
        return (
          <div className="center-vertically">
            <div className="center-horizontally">
              <RingLoader loading={true} color="#4A90E2" />
            </div>
          </div>
        );
      case ERROR:
        return <div>{this.state.error}</div>;
      case SHOW_CARDS:
        return (
          <div className="center-vertically" onClick={this.handleReset}>
            <div className="image-carousel">
              {this.state.cards.map(({ name, imageUrl, text }) => (
                <img key={name} src={imageUrl} alt={`${name}----${text}`} />
              ))}
            </div>
          </div>
        );
    }
  }
}

export default App;
