import React, { Component } from "react";
import PropTypes from "prop-types";
import React3 from "react-three-renderer";
import { Vector3, Euler, Geometry, DoubleSide } from "three";

const THREE = require("three");
const OrbitControls = require("three-orbit-controls")(THREE);

// import base cell for earth data
import Cell from "./Cell";

/**
 * The main class to display the map. This contains only view code!
 */
export default class Game extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    cameraPosition: PropTypes.instanceOf(Vector3).isRequired,
    lookAt: PropTypes.instanceOf(Vector3).isRequired,
    geometry: PropTypes.instanceOf(Geometry),
    cellPosition: PropTypes.instanceOf(Vector3),
    cellRotation: PropTypes.instanceOf(Euler)
  };

  componentDidMount() {
    const controls = new OrbitControls(this.refs.camera);
    this.controls = controls;
  }

  componentWillUnmount() {
    this.controls.dispose();
    delete this.controls;
  }

  render() {
    const {
      width,
      height,
      cameraPosition,
      geometry,
      lookAt,
      cellPosition,
      cellRotation
    } = this.props;

    const aspectratio = this.props.width / this.props.height;

    const cameraprops = {
      fov: 75,
      aspect: aspectratio,
      near: 0.1,
      far: 1000,
      position: cameraPosition,
      lookAt: lookAt
    };

    return (
      <React3 mainCamera="camera" width={width} height={height} antialias>
        <resources />
        <scene>
          <perspectiveCamera ref="camera" name="camera" {...cameraprops} />
          <ambientLight color={0xdddddd} />
          <Cell
            position={cellPosition}
            rotation={cellRotation}
            color={0x00aa00}
          />
          <Cell
            position={cellPosition}
            rotation={cellRotation}
            color={0x000000}
            wireframe
          />
          <axisHelper size={5} />
        </scene>
      </React3>
    );
  }
}
