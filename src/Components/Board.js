import React, {Component} from 'react';
import Square from './Square';

/**
 * The game board. A grid of squares contianing letters.
 * Handles dragging a selection of squares horizontally and diagonally.
 */
class Board extends React.Component {

  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    // We need to track the current selection and drag start location if a drag
    // is in progress.
    this.state = {
      dragStart: null,
      selection: []
    };
  }

  /**
   * Responds to mouse down event on a square.
   */
  handleMouseDown({row, col}){
    // Set state to start new selection.
    this.setState({
      dragStart: {row: row, col: col},
      selection: [{row: row, col: col}]
    });

  }

  /**
   * Responds to mouse over event on a square.
   */
  handleMouseOver({row, col}) {
    // Only respond if we have already started a drag (mouse down on a square).
    if(this.state.dragStart) {

      // Get updated selection.
      const selected = this.getSelection(
        this.state.dragStart,
        {row: row, col: col}
      );

      // Update state with new selection.
      this.setState({
        selection: selected
      });

    }
  }

  /**
   * Responds to mouse up event on a square.
   */
  handleMouseUp(pos){

    // Call to parent that we have submitted a selection.
    if(this.props.onMakeSelection) {
      this.props.onMakeSelection(this.state.selection);
    }

    // Clear selection state.
    this.setState({
      dragStart: null,
      selection: []
    });

  }

  /**
   * Calcualtes and returns a list of selected square locations.
   * @param  {Point} start The row/column where the drag started.
   * @param  {Point} end   The row/column where the mouse is now.
   * @return {Array}       Array of selected square locations.
   */
  getSelection(start, end) {
    // We will return an array of selected points.
    let selected = [];

    if(start && end) {
      // Calculate horizontal and vertical diferences.
      let difCol = end.col - start.col;
      let difRow = end.row - start.row;
      // Calculate horizontal and vertical directions.
      let incCol = Math.sign(difCol);
      let incRow = Math.sign(difRow);
      // Counters.
      let count = 0;
      let r = start.row;
      let c = start.col;

      // Calculate how many squares we need to select.
      if(incRow == 0 || incCol == 0) {
        // Horizontal and vertical selection.
        count = Math.max(Math.abs(difRow), Math.abs(difCol));
      } else {
        // Diagonal selection.
        count = Math.min(Math.abs(difRow), Math.abs(difCol));
      }

      // Select the relevent squares.
      for(let i = 0; i <= count; i++) {
        selected.push({row: r, col: c});
        c += incCol;
        r += incRow;
      }
    }

    // Return the selected points.
    return selected;
  }

  /**
   * Renders the control
   */
  render() {

    // For the square keys.
    var id = 0;

    // Events to pass to the squares.
    var mouseEvents = {
      onMouseOver: this.handleMouseOver.bind(this),
      onMouseDown: this.handleMouseDown.bind(this),
      onMouseUp  : this.handleMouseUp.bind(this)
    }

    // Determines if a given square location is currently selected.
    const isSelected = function(pos) {
      for(let point of this.state.selection) {
        if(point.row === pos.row && point.col === pos.col) {
          return true;
        }
      }
      return false;
    }.bind(this);

    // Generate the grid.
    var grid = this.props.squares.map((row, ri) => {
      return (
        <div key={++id} className="board-row">
        {
          row.map((col, ci) => {
            const pos = {row: ri, col: ci};

            return (
              <Square
                key={++id}
                value={col.value}
                pos={pos}
                revealed={col.revealed}
                selected={isSelected(pos)}
                events={mouseEvents}
              />
            )
          })
        }
        </div>
      );
    });

    return (
      <div className="board">{grid}</div>
    );
  }
}

export default Board;
