import {calculateLinearColourArray} from "./calculate-linear";
import {
  NumericTriple,
  numericTripleToColour,
  colourStringToNumericTriple,
  contrast,
} from "./colour-spaces";

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
  return colourStringToNumericTriple(firstColourInput.value);
}

function endColour(): NumericTriple {
  return colourStringToNumericTriple(lastColourInput.value);
}

function steps(): number {
  return Number(stepsInput.value);
}

submitButton.addEventListener("click", startCalcuation);

function startCalcuation() {
  resultContainer.innerText = "";
  colourStringToNumericTriple(firstColourInput.value);
  const startRGB = startColour();
  const endRGB = endColour();
  const StepCount = steps();
  const colours = calculateLinearColourArray(startRGB, endRGB, StepCount);
  populateResults(colours);
}

function populateResults(colours: NumericTriple[]) {
  let previousRgb: NumericTriple | undefined;

  for (const rgb of colours) {
    const currentResult = document.createElement("div");
    resultContainer.appendChild(currentResult);
    const currentValue = document.createElement("p");
    currentResult.appendChild(currentValue);
    const currentSwatch = document.createElement("div");

    const colour = numericTripleToColour(rgb);

    currentValue.innerText = colour;

    if (previousRgb) {
      const newContrast = contrast(previousRgb, rgb);
      currentValue.innerText += ` Contrast ratio:${newContrast.toPrecision(3)}:1`;
    }

    currentValue.style.margin = "0";
    currentValue.style.height = "1.2rem";
    currentSwatch.style.backgroundColor = colour;
    currentSwatch.style.width = "10rem";
    currentSwatch.style.minHeight = "1.5rem";
    currentSwatch.style.display = "inline-block";
    currentValue.insertBefore(currentSwatch, currentValue.firstChild);
    previousRgb = rgb;
  }
}
