import {RGBToLab, LabToRGB, NumericTriple} from "./colour-spaces";

export function calculateLinearColourArray(
  startRGB: NumericTriple,
  endRGB: NumericTriple,
  StepCount: number,
): NumericTriple[] {
  const startLab = RGBToLab(startRGB);
  const endLab = RGBToLab(endRGB);
  const step = startLab.map((start, index) => {
    const end = endLab[index] ?? 0;
    return (end - start) / (StepCount - 1);
  });
  const colours: NumericTriple[] = [];
  for (let currentStep = 0; currentStep < StepCount; currentStep++) {
    const currentLab = startLab.map((start, index) => {
      const stepValue = (step[index] ?? 0) * currentStep;
      return start + stepValue;
    }) as NumericTriple;
    const rgb = LabToRGB(currentLab);
    colours.push(rgb);
  }
  return colours;
}
