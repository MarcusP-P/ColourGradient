import {
  RGBToLab,
  LabToRGB,
  RGBToXYZ,
} from "../node_modules/cie-colorconverter/dist/index";

declare type NumericTriple = [number, number, number];

declare interface Result {
  colour: string;
  Luminance: number;
}

const submitButton = document.getElementById("generate") as HTMLButtonElement;
const firstColourInput = document.getElementById(
  "start-colour",
) as HTMLInputElement;
const lastColourInput = document.getElementById(
  "end-colour",
) as HTMLInputElement;
const stepsInput = document.getElementById("steps") as HTMLInputElement;
const resultContainer = document.getElementById("results") as HTMLDivElement;

function convertColourStringToArray(colour: string): NumericTriple {
  const coloursRegex = /#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/;
  const colourHexArray = colour.match(coloursRegex)?.slice(1);
  // Convert the array values from "ff" to "0xff", and then convert that to a number
  const numberArray = colourHexArray?.map((x) =>
    Number("0x" + x),
  ) as NumericTriple;
  return numberArray;
}

function arrayToColourString(colourArray: NumericTriple): string {
  const hexArray = colourArray.map((x) =>
    Math.round(x).toString(16).padStart(2, "0"),
  );
  const colourString =
    "#" +
    hexArray.reduce((interimString, current) => interimString + current, "");
  return colourString;
}

function colourArray(
  startRGB: NumericTriple,
  endRGB: NumericTriple,
  StepCount: number,
): Result[] {
  const startLab = RGBToLab(startRGB, {
    gammaModel: "sRGB",
    rgbModel: "sRGB",
    refWhite: "D65",
  });
  const endLab = RGBToLab(endRGB, {
    gammaModel: "sRGB",
    rgbModel: "sRGB",
    refWhite: "D65",
  });
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
    let rgb = LabToRGB(currentLab, {
      gammaModel: "sRGB",
      rgbModel: "sRGB",
      refWhite: "D65",
    });
    rgb = rgb.map((x) => (x < 0 ? 0 : x > 255 ? 255 : x)) as NumericTriple;
    const xyz = RGBToXYZ(currentLab, {
      gammaModel: "sRGB",
      rgbModel: "sRGB",
      refWhite: "D65",
    });
    console.dir(rgb);
    const colour = arrayToColourString(rgb.slice() as NumericTriple);
    colours.push({colour: colour, Luminance: xyz[1]});
  }
  return colours;
}

function startColour(): NumericTriple {
  return convertColourStringToArray(firstColourInput.value);
}

function endColour(): NumericTriple {
  return convertColourStringToArray(lastColourInput.value);
}

function steps(): number {
  return Number(stepsInput.value);
}

submitButton.addEventListener("click", startCalcuation);

function startCalcuation() {
  resultContainer.innerText = "";
  convertColourStringToArray(firstColourInput.value);
  const startRGB = startColour();
  const endRGB = endColour();
  const StepCount = steps();
  const colours = colourArray(startRGB, endRGB, StepCount);
  let previousLuminance: number | undefined;

  for (const colour of colours) {
    const currentResult = document.createElement("div");
    resultContainer.appendChild(currentResult);
    const currentValue = document.createElement("p");
    currentResult.appendChild(currentValue);
    const currentSwatch = document.createElement("div");

    currentValue.innerText = colour.colour;

    if (previousLuminance) {
      const contrast =
        (Math.max(previousLuminance, colour.Luminance) + 0.05) /
        (Math.min(previousLuminance, colour.Luminance) + 0.05);
      currentValue.innerText += ` Contrast ratio:${contrast.toPrecision(3)}:1`;
    }

    currentValue.style.margin = "0";
    currentValue.style.height = "1.2rem";
    currentSwatch.style.backgroundColor = colour.colour;
    currentSwatch.style.width = "10rem";
    currentSwatch.style.minHeight = "1.5rem";
    currentSwatch.style.display = "inline-block";
    currentValue.insertBefore(currentSwatch, currentValue.firstChild);
    previousLuminance = colour.Luminance;
  }
}
