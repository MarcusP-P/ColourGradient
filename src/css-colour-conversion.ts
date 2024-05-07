import {NumericTriple} from "./types";

export function convertColourStringToArray(colour: string): NumericTriple {
  const coloursRegex = /#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/;
  const colourHexArray = colour.match(coloursRegex)?.slice(1);
  // Convert the array values from "ff" to "0xff", and then convert that to a number
  const numberArray = colourHexArray?.map((x) =>
    Number("0x" + x),
  ) as NumericTriple;
  return numberArray;
}

export function arrayToColourString(colourArray: NumericTriple): string {
  const hexArray = colourArray.map((x) =>
    Math.round(x).toString(16).padStart(2, "0"),
  );
  const colourString =
    "#" +
    hexArray.reduce((interimString, current) => interimString + current, "");
  return colourString;
}
