import React, {Component} from 'react';
import './app.css';
import Game from './Components/Game';
import puzzleData from './puzzleData.json';

/**
 * The main application component. Contains the test data we will use.
 */
class App extends React.Component {
  constructor(props) {
    super(props);

    // TODO: Load data asynchronously.
    this.state = {
      puzzles: puzzleData.puzzles
    };

  }

  /**
   * Render the application.
   */
  render() {
    return (
      <div className='app'>
        <div className='game-header'>
          <h1>Translation-Search</h1>
        </div>

        <Game data={this.state.puzzles} />

        <div className='game-footer' />

      </div>
    )
  }
}

export default App;
