import {
  LCHabToRGB,
  LCHuvToRGB,
  NumericTriple,
  RGBToLCHab,
  RGBToLCHuv,
} from "./colour-spaces";

export function calculateSaturatedColourArrayLab(
  startRGB: NumericTriple,
  endRGB: NumericTriple,
  StepCount: number,
): NumericTriple[] {
  const startLCHab = RGBToLCHab(startRGB);
  const endLCHab = RGBToLCHab(endRGB);

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
    const rgb = LCHabToRGB(currentLab);
    colours.push(rgb);
  }
  return colours;
}

export function calculateSaturatedColourArrayLuv(
  startRGB: NumericTriple,
  endRGB: NumericTriple,
  StepCount: number,
): NumericTriple[] {
  const startLCHuv = RGBToLCHuv(startRGB);
  const endLCHuv = RGBToLCHuv(endRGB);

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
    const rgb = LCHuvToRGB(currentLab);
    colours.push(rgb);
  }
  return colours;
}
