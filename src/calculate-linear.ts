import {
  RGBToLab,
  LabToRGB,
  RGBToXYZ,
} from "../node_modules/cie-colorconverter/dist/index";

import {NumericTriple, Result} from "./types";
import {arrayToColourString} from "./css-colour-conversion";
import {colourSpaceOptions} from "./colour-space-options";

export function calculateLinearColourArray(
  startRGB: NumericTriple,
  endRGB: NumericTriple,
  StepCount: number,
): Result[] {
  const startLab = RGBToLab(startRGB, colourSpaceOptions);
  const endLab = RGBToLab(endRGB, colourSpaceOptions);
  const step = startLab.map((start, index) => {
    const end = endLab[index] ?? 0;
    return (end - start) / (StepCount - 1);
  });
  const colours: Result[] = [];
  for (let currentStep = 0; currentStep < StepCount; currentStep++) {
    const currentLab = startLab.map((start, index) => {
      const stepValue = (step[index] ?? 0) * currentStep;
      return start + stepValue;
    }) as NumericTriple;
    let rgb = LabToRGB(currentLab, colourSpaceOptions);
    rgb = rgb.map((x) => (x < 0 ? 0 : x > 255 ? 255 : x)) as NumericTriple;
    const xyz = RGBToXYZ(currentLab, colourSpaceOptions);
    console.dir(rgb);
    const colour = arrayToColourString(rgb.slice() as NumericTriple);
    colours.push({colour: colour, Luminance: xyz[1]});
  }
  return colours;
}
