import THREE, { Vector3, Euler } from "three";

/*const positionScale = 0.5;
const positionSpeed = 0.001;
const positionOffset = 0.2;

const rotationSpeed = 0.02;
const rotationScale = 0.03;
*/

const delta = 0.002;

/**
 * We can manage our cell state in a series of small, easy to reason about
 * functions
 **/
export default function cellReudcer(cells, time) {
  // Merge the old state with the updated properties
  return cells.map(cell => {
    let fertility = cell.fertility;
    let water = cell.water;
    let growth = cell.growth;

    /*if (water) {
      fertility += delta;
    } else {
      fertility -= delta;
    }

    if (cell.temp <= 10) {
      fertility -= delta;
    } else if (cell.temp > 10) {
      fertility += delta;
    } else if (cell.temp > 30) {
      fertility += delta / 2;
      water -= delta / 2;
    } else if (cell.temp > 50) {
      fertility -= delta;
      water -= delta;
    }

    if (growth) {
      growth += delta;
      water -= delta;
    }

    if (fertility) {
      growth += delta;
    } else {
      growth -= delta;
    }

    console.log("aaa", water, fertility, growth);*/
    return {
      position: cell.position,
      rotation: cell.rotation,
      width: cell.width,
      height: cell.height,
      depth: cell.depth,
      temperature: cell.temperature,
      // water: Math.max(0, Math.min(water, 1)),
      isWater: cell.isWater,
      water: cell.water,
      fertility: Math.max(0, Math.min(fertility, 1)),
      growth: Math.max(0, Math.min(growth, 1))
    };
  });
}
