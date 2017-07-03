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
      type: 'f', // a float
      value: 1.0,
    },
    water: {
      type: 'f', // a float
      value: 1.0,
    },
    growth: {
      type: 'f', // a float
      value: 1.0,
    },
    temperature: {
      type: 'f', // a float
      value: 1.0,
    },
    fertility: {
      type: 'f', // a float
      value: 1.0,
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
