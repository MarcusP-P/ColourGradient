import {
  calculateLinearColourArrayLab,
  calculateLinearColourArrayLuv,
} from "./calculate-linear";
import {
  calculateSaturatedColourArrayLabClockwise,
  calculateSaturatedColourArrayLabCounterClockwise,
  calculateSaturatedColourArrayLuvClockwise,
  calculateSaturatedColourArrayLuvCounterClockwise,
} from "./calculate-polar";
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
  resultContainer.innerHTML = "<h2>Results</h2>";
  colourStringToNumericTriple(firstColourInput.value);
  const startRGB = startColour();
  const endRGB = endColour();
  const StepCount = steps();

  const linearColoursLab = calculateLinearColourArrayLab(
    startRGB,
    endRGB,
    StepCount,
  );
  populateResults("Lab linear", linearColoursLab);

  const saturatedColoursLabClockwise =
    calculateSaturatedColourArrayLabClockwise(startRGB, endRGB, StepCount);
  populateResults("Lab preserve saturation 1", saturatedColoursLabClockwise);

  const saturatedColoursLabCounterClockwise =
    calculateSaturatedColourArrayLabCounterClockwise(
      startRGB,
      endRGB,
      StepCount,
    );
  populateResults(
    "Lab preserve saturation 2",
    saturatedColoursLabCounterClockwise,
  );

  const linearColoursLuv = calculateLinearColourArrayLuv(
    startRGB,
    endRGB,
    StepCount,
  );
  populateResults("Luv linear", linearColoursLuv);

  const saturatedColoursLuvClockwise =
    calculateSaturatedColourArrayLuvClockwise(startRGB, endRGB, StepCount);
  populateResults("Luv preserve saturation 1", saturatedColoursLuvClockwise);

  const saturatedColoursLuvCoubnterClockwise =
    calculateSaturatedColourArrayLuvCounterClockwise(
      startRGB,
      endRGB,
      StepCount,
    );
  populateResults(
    "Luv preserve saturation 2",
    saturatedColoursLuvCoubnterClockwise,
  );
}

function populateResults(title: string, colours: NumericTriple[]) {
  let previousRgb: NumericTriple | undefined;

  const heading = document.createElement("h3");
  heading.innerText = title;
  resultContainer.appendChild(heading);

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
