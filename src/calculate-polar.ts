import {
  LCHabToRGB,
  LCHuvToRGB,
  NumericTriple,
  RGBToLCHab,
  RGBToLCHuv,
} from "./colour-spaces";
import {Direction} from "./math/coordinates";

export function calculateSaturatedColourArrayLabClockwise(
  startRGB: NumericTriple,
  endRGB: NumericTriple,
  StepCount: number,
): NumericTriple[] {
  return calculateSaturatedColourArrayLab(
    startRGB,
    endRGB,
    StepCount,
    Direction.Clockwise,
  );
}

export function calculateSaturatedColourArrayLabCounterClockwise(
  startRGB: NumericTriple,
  endRGB: NumericTriple,
  StepCount: number,
): NumericTriple[] {
  return calculateSaturatedColourArrayLab(
    startRGB,
    endRGB,
    StepCount,
    Direction.CounterClockwise,
  );
}

function calculateSaturatedColourArrayLab(
  startRGB: NumericTriple,
  endRGB: NumericTriple,
  StepCount: number,
  direction: Direction,
): NumericTriple[] {
  const startLCHab = RGBToLCHab(startRGB);
  const endLCHab = RGBToLCHab(endRGB);

  console.log(
    `Start Lab Polar ${direction == Direction.Clockwise ? "Clockwise" : "Counter Clockwise"}`,
  );

  // The start has to be greater than the end for a clockwise rotation
  if (direction === Direction.Clockwise && startLCHab[2] < endLCHab[2]) {
    startLCHab[2] += 360;
  }

  // The end has to be greater than the end for a counter clockwise rotation
  if (direction === Direction.CounterClockwise && endLCHab[2] < startLCHab[2]) {
    endLCHab[2] += 360;
  }

  const lSteps = (endLCHab[0] - startLCHab[0]) / (StepCount - 1);
  const cSteps = (endLCHab[1] - startLCHab[1]) / (StepCount - 1);
  const hSteps = (endLCHab[2] - startLCHab[2]) / (StepCount - 1);

  const colours: NumericTriple[] = [];

  for (let currentStep = 0; currentStep < StepCount; currentStep++) {
    const currentLab = [
      startLCHab[0] + lSteps * currentStep,
      startLCHab[1] + cSteps * currentStep,
      startLCHab[2] + hSteps * currentStep,
    ] as NumericTriple;

    // re-normalise the Hue to up to 360
    if (currentLab[2] >= 360) {
      currentLab[2] -= 360;
    }
    console.log(currentLab);

    const rgb = LCHabToRGB(currentLab);
    colours.push(rgb);
  }
  return colours;
}

export function calculateSaturatedColourArrayLuvClockwise(
  startRGB: NumericTriple,
  endRGB: NumericTriple,
  StepCount: number,
): NumericTriple[] {
  return calculateSaturatedColourArrayLuv(
    startRGB,
    endRGB,
    StepCount,
    Direction.Clockwise,
  );
}

export function calculateSaturatedColourArrayLuvCounterClockwise(
  startRGB: NumericTriple,
  endRGB: NumericTriple,
  StepCount: number,
): NumericTriple[] {
  return calculateSaturatedColourArrayLuv(
    startRGB,
    endRGB,
    StepCount,
    Direction.CounterClockwise,
  );
}

function calculateSaturatedColourArrayLuv(
  startRGB: NumericTriple,
  endRGB: NumericTriple,
  StepCount: number,
  direction: Direction,
): NumericTriple[] {
  const startLCHuv = RGBToLCHuv(startRGB);
  const endLCHuv = RGBToLCHuv(endRGB);

  console.log(
    `Start Luv Polar ${direction == Direction.Clockwise ? "Clockwise" : "Counter Clockwise"}`,
  );

  // The start has to be greater than the end for a clockwise rotation
  if (direction === Direction.Clockwise && startLCHuv[2] < endLCHuv[2]) {
    startLCHuv[2] += 360;
  }

  // The end has to be greater than the end for a counter clockwise rotation
  if (direction === Direction.CounterClockwise && endLCHuv[2] < startLCHuv[2]) {
    endLCHuv[2] += 360;
  }

  const lSteps = (endLCHuv[0] - startLCHuv[0]) / (StepCount - 1);
  const cSteps = (endLCHuv[1] - startLCHuv[1]) / (StepCount - 1);
  const hSteps = (endLCHuv[2] - startLCHuv[2]) / (StepCount - 1);

  const colours: NumericTriple[] = [];

  for (let currentStep = 0; currentStep < StepCount; currentStep++) {
    const currentLab = [
      startLCHuv[0] + lSteps * currentStep,
      startLCHuv[1] + cSteps * currentStep,
      startLCHuv[2] + hSteps * currentStep,
    ] as NumericTriple;

    // re-normalise the Hue to up to 360
    if (currentLab[2] >= 360) {
      currentLab[2] -= 360;
    }

    console.log(currentLab);

    const rgb = LCHuvToRGB(currentLab);
    colours.push(rgb);
  }
  return colours;
}
