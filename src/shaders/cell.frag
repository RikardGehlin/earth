uniform bool isWater;
uniform float  water, growth, fertility;
uniform int temperature, height;

vec4 baseColor = vec4(0.55, 0.55, 0.55, 1) ; // 0x8d8d8d
vec4 waterColor = vec4(0, 0.2, 0.4, 1) ; // 0x003366
vec4 growthColor = vec4(0, 0.35, 0.02, 1) ; // 0x005a04
vec4 fertilityColor = vec4(0.5, 0.33, 0.09, 1) ; // 0x7f5417

vec4 coldestTemperatureColor = vec4(0.93, 0.93, 0.93, 1); // 0xeeeeee
vec4 coldTemperatureColor = vec4(0.96, 0.98, 0.98, 1); // 0xf5fafa
vec4 baseTemperatureColor = vec4(1.0, 1.0, 0.8, 1); // 0xffffcc
vec4 warmTemperatureColor = vec4(1.0, 0.8, 0.2, 1); // 0xffcc33
vec4 warmestTemperatureColor = vec4(1.0, 0.6, 0, 1); // 0xff9900
 
vec4 getWaterColor(float water) {
  return waterColor;
}

vec4 getGrowthColor(float growth) {
  return growthColor;
}

vec4 getFertilityColor(float fertility) {
  return fertilityColor;
}


vec4 getTemperatureColor(int temperature) {
  if (temperature <= -15) {
    return coldestTemperatureColor;
  } else if (-15 < temperature && temperature <= 0) {
    return coldTemperatureColor;
  } else if (0 < temperature && temperature <= 15) {
    return baseTemperatureColor;
  } else if (15 < temperature && temperature <= 30) {
    return warmTemperatureColor;;
  } else if (30 < temperature) {
    return warmestTemperatureColor;
  } else {
    return baseTemperatureColor;
  }
}

vec4 shadeColor(vec4 color, int height) {
  return color;
}

vec4 getColor(bool isWater, float water, float growth, float fertility, int temperature, int height) {
  vec4 color = baseColor;

  // Pure water, ie lakes, rivers, oceans...
  if (isWater == true) {
    color = getWaterColor(water);
  };
  
  // Water needs to be taken into account because of marches, swamps and wetlands...
  if (water > 0.0) {
    color = getWaterColor(water);
  }

  // The more growth, the greener the cell
  if (growth > 0.0) {
    color = getGrowthColor(growth);
  }

  if (fertility < 0.2) {
    color = getTemperatureColor(temperature);
  }

  return shadeColor(color, height);
}

void main() {
  gl_FragColor = getColor(isWater, water, growth, fertility, temperature, height);
}