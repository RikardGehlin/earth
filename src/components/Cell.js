import React, { Component } from "react";
import PropTypes from "prop-types";
import React3 from "react-three-renderer";
import { Euler, Vector3 } from "three";

/**
 * The component representing the robot / main player. We can implement it as
 * functional stateless component because it's so simple
 **/
const Cell = ({ position, rotation, color, wireframe }) => (
  <group position={position} rotation={rotation}>
    {/*
  <mesh>
        <geometryResource resourceId="robotGeometry" />
        <materialResource resourceId="robotTexture" />
      </mesh>
  */}
    <mesh>
      <boxGeometry width={1} height={1} depth={1} />
      <meshBasicMaterial color={color} wireframe={wireframe} />
    </mesh>
  </group>
);

Cell.propTypes = {
  position: PropTypes.instanceOf(Vector3),
  rotation: PropTypes.instanceOf(Euler)
};

export default Cell;
