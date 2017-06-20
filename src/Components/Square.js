import React from 'react';
/**
 * Generates a single square to be part of the game board.
 */
function Square({value, pos, selected, revealed, events}) {

  // css classes to apply.
  const classes = ['square'];

  // Add to list of classes if required.
  if(selected) {
    classes.push('is-selected');
  } else if(revealed) {
    classes.push('is-revealed');
  }

  return (
    <button
    className={classes.join(' ')}
    onMouseOver = {() => events.onMouseOver(pos)}
    onMouseDown = {() => events.onMouseDown(pos)}
    onMouseUp   = {() => events.onMouseUp(pos)}
    >
    {value}
    </button>
  );

}

export default Square;
