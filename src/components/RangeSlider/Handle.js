import React, { Component } from 'react';
import classNames from 'classnames';

import css from './Handle.module.css';

/**
 * A component that renders a handle for a range slider.
 *
 * @component
 * @param {Object} props
 * @param {string} [props.rootClassName] - Custom class that overrides the default class for the root element
 * @param {string} [props.className] - Custom class that extends the default class for the root element
 * @param {number} props.min - The minimum value of the range slider
 * @param {number} props.max - The maximum value of the range slider
 * @param {Function} props.valueToPosition - The function to convert the value to the position
 * @param {Function} props.positionToValue - The function to convert the position to the value
 * @param {Function} props.onChange - The function to call when the value changes
 * @param {Function} props.changeActive - The function to call when the active state changes
 * @returns {JSX.Element}
 */
class Handle extends Component {
  constructor(props) {
    super(props);

    this.state = { dragging: false, relativePos: null };

    this.handleRef = React.createRef();
    this._isMounted = false;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);

    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.onMouseMoveListener = window.addEventListener('mousemove', this.onMouseMove, false);
    this.onMouseUpListener = window.addEventListener('mouseup', this.onMouseUp, false);
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('mousemove', this.onMouseMoveListener, false);
    window.removeEventListener('mouseup', this.onMouseUpListener, false);
  }

  onMouseDown(e) {
    e.stopPropagation();
    e.preventDefault();

    this.onStart(e.pageX);
  }
  onMouseMove(e) {
    if (!this.state.dragging) return;

    this.onMove(e.pageX);
  }
  onMouseUp(e) {
    e.stopPropagation();
    e.preventDefault();

    this.onEnd();
  }

  onTouchStart(e) {
    e.stopPropagation();
    e.preventDefault();

    const touchpageX = e.touches[0].pageX;
    this.onStart(touchpageX);
  }
  onTouchMove(e) {
    if (!this.state.dragging) return;

    this.onMove(e.touches[0].pageX);
  }
  onTouchEnd(e) {
    e.stopPropagation();
    e.preventDefault();

    this.onEnd();
  }

  onStart(pagePosition) {
    const { offsetLeft, offsetWidth } = this.handleRef.current;
    this.setState({ dragging: true, relativePos: pagePosition - offsetLeft - offsetWidth / 2 });
    this.props.changeActive();
  }
  onMove(pagePosition) {
    const { min, max, positionToValue } = this.props;
    const position = pagePosition - this.state.relativePos;
    const currentValue = positionToValue(position);

    const value = currentValue < min ? min : currentValue > max ? max : currentValue;

    this.props.onChange(value);
  }
  onEnd() {
    // Ensuring that setState doesn't get called.
    // This a strange behaviour since window.removeEventListener is called in componentWillUnmount
    if (this._isMounted) {
      this.setState({ dragging: false });
    }
  }

  render() {
    const { rootClassName, className, value, valueToPosition } = this.props;
    const position = valueToPosition(value);
    const classes = classNames(rootClassName || css.rootTouchBuffer, className);

    return (
      <div
        className={classes}
        ref={this.handleRef}
        style={{ left: `${position}px` }}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
        role="button"
      >
        <div
          className={classNames(css.visibleHandle, {
            [css.dragged]: this.state.dragging,
          })}
        />
      </div>
    );
  }
}

export default Handle;
