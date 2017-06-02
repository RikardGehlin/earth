import React, { Component } from "react";
import THREE, { Vector3, Euler } from "three";
import autobind from "autobind-decorator";

import Earth from "../components/Earth";
import "./Earth.scss";

// Simple functions that manage scene state
import cellReducer from "../reducers/cellReducer";

/**
 * Container component. See https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.jwywi6ltw
 * for more reading. This container holds the game logic, but not the view code
 */
export default class EarthContainer extends Component {
  constructor() {
    super();

    // Initial scene state
    this.state = {
      cameraPosition: new Vector3(0, 0, 5),
      lookAt: new Vector3(0, 0, 0)
    };
  }

  componentDidMount() {
    // Track if we're mounted so animation loop doesn't tick after unmount
    this.mounted = true;

    // Expose the global THREE object for use in debugging console
    window.THREE = THREE;

    // Start the animation loop when this component loads
    this.requestAnimationLoop();
  }

  componentWillUnmount() {
    this.mounted = false;
    this.cancelAnimationLoop();
  }

  // We autobind methods using this decorator to get hot reloading
  @autobind requestAnimationLoop() {
    this.reqAnimId = window.requestAnimationFrame(this.animationLoop);
  }

  @autobind cancelAnimationLoop() {
    window.cancelAnimationFrame(this.reqAnimId);
  }

  // Our game loop, which is managed as the window's requestAnimationFrame callback
  @autobind animationLoop(time) {
    if (!this.mounted) {
      return;
    }

    this.requestAnimationLoop();

    const oldState = this.state;

    // Apply our reducer functions to the scene state.It could be moved into a redux/flux store and updated once per loop.
    const newState = cellReducer(time);

    this.setState(newState);
  }

  render() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const {
      cameraPosition,
      geometry,
      lookAt,
      cellPosition,
      cellRotation
    } = this.state;

    // This could be replaced with a loading  screen, or even a 3d scene without geometry in it if all data isn't loaded
    return (
      <div>
        {
          <Earth
            width={width}
            height={height}
            cameraPosition={cameraPosition}
            lookAt={lookAt}
            geometry={geometry}
            cellPosition={cellPosition}
            cellRotation={cellRotation}
          />
        }
      </div>
    );
  }
}
