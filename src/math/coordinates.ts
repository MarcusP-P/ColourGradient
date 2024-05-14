export class Cartesian {
  x = 0;
  y = 0;
}

export class Polar {
  theta = 0;
  r = 0;
}

export enum Direction {
  Clockwise,
  CounterClockwise,
}

export function cartesianToPolar(source: Cartesian): Polar {
  const theta = Math.atan2(source.y, source.x);
  const dest: Polar = {
    r: Math.sqrt(source.x ** 2 + source.y ** 2),
    theta: theta,
  };
  return dest;
}

export function polarToCartesian(source: Polar): Cartesian {
  const dest = {
    x: Math.cos(source.theta) * source.r,
    y: Math.sin(source.theta) * source.r,
  };
  return dest;
}

// Calcualte the shortest direction between two polar co-ordiantes.
export function direction(first: Polar, second: Polar): Direction {
  if (first.theta === second.theta) {
    return Direction.CounterClockwise;
  } else if (first.theta < second.theta) {
    if (second.theta - first.theta > Math.PI) {
      return Direction.Clockwise;
    } else {
      return Direction.CounterClockwise;
    }
  } else {
    if (first.theta - second.theta > Math.PI) {
      return Direction.CounterClockwise;
    } else {
      return Direction.Clockwise;
    }
  }
}
