import {Result, NumericTriple} from "./types";
import {convertColourStringToArray} from "./css-colour-conversion";
import {calculateLinearColourArray} from "./calculate-linear";
import {contrast} from "./contrast";

const submitButton = document.getElementById("generate") as HTMLButtonElement;
const firstColourInput = document.getElementById(
  "start-colour",
) as HTMLInputElement;
const lastColourInput = document.getElementById(
  "end-colour",
) as HTMLInputElement;
const stepsInput = document.getElementById("steps") as HTMLInputElement;
const resultContainer = document.getElementById("results") as HTMLDivElement;

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
  const colours = calculateLinearColourArray(startRGB, endRGB, StepCount);
  populateResults(colours);
}

function populateResults(colours: Result[]) {
  let previousLuminance: number | undefined;

  for (const colour of colours) {
    const currentResult = document.createElement("div");
    resultContainer.appendChild(currentResult);
    const currentValue = document.createElement("p");
    currentResult.appendChild(currentValue);
    const currentSwatch = document.createElement("div");

    currentValue.innerText = colour.colour;

    if (previousLuminance) {
      const newContrast = contrast(previousLuminance, colour.Luminance);
      currentValue.innerText += ` Contrast ratio:${newContrast.toPrecision(3)}:1`;
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
