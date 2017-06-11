import React, { Component } from "react";
import PropTypes from "prop-types";
import React3 from "react-three-renderer";
import { Color, Vector3, Euler } from "three";

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
    water,
    fertility,
    temperature,
    growth
  } = props;

  const getWaterColor = water => {
    return new Color(0x003366);
  };

  const getGrowthColor = growth => {
    const color = new Color(0x005a04);
    const colorHSL = color.getHSL();
    console.log(
      "aa",
      colorHSL,
      color.setHSL(colorHSL.h, colorHSL.s, colorHSL.l)
    );
    return color.setHSL(colorHSL.h, colorHSL.s, colorHSL.l * (1 - growth));
  };

  const getFertilityColor = fertility => {
    return new Color(0x7f5417).multiplyScalar(2 - fertility);
  };

  const getTemperatureColor = temperature => {
    /*  
        temperature = white to orange,
        coldest: 238, 238, 238
        cold: 245, 250, 250
        base color: 255, 255, 204
        warm: 255, 204, 51
        warmest: 255, 153, 0
    */

    let tempColor;
    if (temperature <= -15) {
      tempColor = new Color(0xeeeeee);
    } else if (-15 < temperature && temperature <= 0) {
      tempColor = new Color(0xf5fafa);
    } else if (0 < temperature && temperature <= 15) {
      tempColor = new Color(0xffffcc);
    } else if (15 < temperature && temperature <= 30) {
      tempColor = new Color(0xffcc33);
    } else if (30 < temperature) {
      tempColor = new Color(0xff9900);
    } else {
      tempColor = new Color(0xeeeeee);
    }

    return tempColor;
  };

  const shadeColor2 = (color, percent) => {
    var f = parseInt(color, 16),
      t = percent < 0 ? 0 : 255,
      p = percent < 0 ? percent * -1 : percent,
      R = f >> 16,
      G = (f >> 8) & 0x00ff,
      B = f & 0x0000ff;

    const color2 =
      "#" +
      (0x1000000 +
        (Math.round((t - R) * p) + R) * 0x10000 +
        (Math.round((t - G) * p) + G) * 0x100 +
        (Math.round((t - B) * p) + B))
        .toString(16)
        .slice(1);

    return new Color(color2);
  };

  const getColor = (isWater, growth, temperature, fertility, position) => {
    let color = new Color(0x8d8d8d);

    // Pure water, ie lakes, rivers, oceans...
    if (isWater === true) {
      return getWaterColor(water);
    }

    // The more growth, the greener the cell
    if (growth) {
      color.multiply(getGrowthColor(growth));
    }

    // Water needs to be taken into account because of marches, swamps and wetlands...
    /* if (water) {
      color.multiply(getWaterColor(water));
    }

    if (fertility < 0.2) {
      color.lerp(getTemperatureColor(temperature), 1 - fertility * 5);
    }
*/
    return shadeColor2(color.getHexString(), position.y / 20);
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
        <meshBasicMaterial
          color={getColor(water, growth, temperature, fertility, position)}
        />
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
  growth: PropTypes.number.isRequired
};

export default Cell;
