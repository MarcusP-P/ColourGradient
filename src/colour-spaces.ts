import {
  ConverterOptions,
  RGBToLab as RGB2Lab,
  LabToRGB as Lab2RGB,
  RGBToXYZ as RGB2XYZ,
} from "../node_modules/cie-colorconverter/dist/index";

export declare type NumericTriple = [number, number, number];

const colourSpaceOptions: ConverterOptions = {
  gammaModel: "sRGB",
  rgbModel: "sRGB",
  refWhite: "D65",
};

export function RGBToLab(rgb: NumericTriple): NumericTriple {
  return RGB2Lab(rgb, colourSpaceOptions).slice() as NumericTriple;
}

export function LabToRGB(lab: NumericTriple): NumericTriple {
  const rgb = Lab2RGB(lab, colourSpaceOptions)
    .map((x) => (x < 0 ? 0 : x > 255 ? 255 : x))
    .slice() as NumericTriple;
  return rgb;
}

export function RGBToXYZ(lab: NumericTriple): NumericTriple {
  return RGB2XYZ(lab, colourSpaceOptions).slice() as NumericTriple;
}

export function relativeLuminance(rgb: NumericTriple): number {
  const xyx = RGBToXYZ(rgb);
  return xyx[1];
}

export function colourStringToNumericTriple(colour: string): NumericTriple {
  const coloursRegex = /#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/;
  const colourHexArray = colour.match(coloursRegex)?.slice(1);
  // Convert the array values from "ff" to "0xff", and then convert that to a number
  const numberArray = colourHexArray?.map((x) =>
    Number("0x" + x),
  ) as NumericTriple;
  return numberArray;
}

export function numericTripleToColour(colourArray: NumericTriple): string {
  const hexArray = colourArray.map((x) =>
    Math.round(x).toString(16).padStart(2, "0"),
  );
  const colourString =
    "#" +
    hexArray.reduce((interimString, current) => interimString + current, "");
  return colourString;
}

export function contrast(rgb1: NumericTriple, rgb2: NumericTriple) {
  const relativeLuminance1 = relativeLuminance(rgb1);
  const relativeLuminance2 = relativeLuminance(rgb2);
  return contrastFromRelativeLuminence(relativeLuminance1, relativeLuminance2);
}

export function contrastFromRelativeLuminence(
  relativeLuminance1: number,
  relativeLuminance2: number,
): number {
  return (
    (Math.max(relativeLuminance1, relativeLuminance2) + 0.05) /
    (Math.min(relativeLuminance1, relativeLuminance2) + 0.05)
  );
}
