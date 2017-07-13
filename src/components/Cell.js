import React, { Component } from 'react';
import PropTypes from 'prop-types';
import React3 from 'react-three-renderer';
import { Color, Vector3, Euler } from 'three';

import fragmentShaderDepth from 'raw!../shaders/cell.frag';

/**
 * The component representing the individual cell of a map. We can implement it as
 * functional stateless component because it's so simple
 **/
const Cell = props => {
  let {
    position,
    rotation,
    width,
    height,
    depth,
    isWater,
    water,
    fertility,
    temperature,
    growth,
  } = props;

  // add a uniform for color shader
  var uniforms = {
    isWater: {
      value: true,
    },
    water: {
      value: 1.0,
    },
    growth: {
      value: 0.5,
    },
    fertility: {
      value: 1.0,
    },
    temperature: {
      value: 1,
    },
    height: {
      value: 1,
    },
  };

  return (
    <group position={position} rotation={rotation}>
      {/*
  <mesh>
        <geometryResource resourceId="robotGeometry" />
        <materialResource resourceId="robotTexture" />
      </mesh>
  */}
      <mesh>
        <boxGeometry width={width} height={height} depth={depth} />
        <shaderMaterial
          uniforms={uniforms}
          fragmentShader={fragmentShaderDepth}
        />
        {/*<meshBasicMaterial
          color={getColor(water, growth, temperature, fertility, position)}
        />*/}
      </mesh>
    </group>
  );
};

Cell.propTypes = {
  position: PropTypes.instanceOf(Vector3).isRequired,
  rotation: PropTypes.instanceOf(Euler).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired,
  isWater: PropTypes.bool.isRequired,
  water: PropTypes.number.isRequired,
  fertility: PropTypes.number.isRequired,
  temperature: PropTypes.number.isRequired,
  growth: PropTypes.number.isRequired,
};

export default Cell;
