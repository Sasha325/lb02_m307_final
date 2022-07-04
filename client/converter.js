const fromSize = document.querySelector(".from select");
const getButton = document.querySelector("form button");
const fromRegion = document.querySelector(".from-region select");
const toRegion = document.querySelector(".to-region select");
const convertableRegions = document.getElementsByClassName("convertable-regions");
sexSelectors = document.getElementsByName("sex");

let sex = "men";
let from = "us";6
let size = sizes[sex][0][from];
let to = "eu";

const regions = '{"us":"US", "uk":"UK", "eu":"EU"}';

fromSize.addEventListener("change", (e) => {
  size = e.target.value;
});

fromRegion.addEventListener("change", (e) => {
  from = e.target.value;
  computeSizes();
  loadFlag(e.target);
});

toRegion.addEventListener("change", (e) => {
  to = e.target.value;
  loadFlag(e.target);
});

getButton.addEventListener("click", (e) => {
  e.preventDefault(); //preventing form from submitting
  getShoeSize();
});

function computeRegions() {
  const parsedRegions = JSON.parse(regions);
  let optionTag;
  for (let i = 0; i < 2; i++) {
    for (const key in parsedRegions) {
      if (i === 1 && key === "eu") {
        optionTag = `<option value="${key}" selected>${parsedRegions[key]}</option>`;
      } else {
        optionTag = `<option value="${key}">${parsedRegions[key]}</option>`;
      }
      convertableRegions[i].insertAdjacentHTML("beforeend", optionTag);
    }
  }
}

// computes and inserts available sizes from sizes.js into the size selector dropdown
function computeSizes() {
  //removes all children of the sizes dropdown DOM element
  while (fromSize.lastElementChild) {
    fromSize.removeChild(fromSize.lastElementChild);
  }

  // array that contains all sizes that will display in dropdown
  let sizesArray = [];

  sizes[sex].forEach((i) => {
    sizesArray.push(i[from]);
  });
  // create Set and spread into array to remove duplicates
  sizesArray = [...new Set(sizesArray)];
  for (let index in sizesArray) {
    let optionTag = `<option value="${sizesArray[index]}">${sizesArray[index]}</option>`;
    //insert option tag into DOM
    fromSize.insertAdjacentHTML("beforeend", optionTag);
  }
  // set size as first element in array
  size = sizesArray[0];
}

function computeToSize() {
  let temp = sizes[sex].filter((i) => i[from] == size);
  return temp[0][to];
}

function getRadioVals() {
  let radios = document.getElementsByName("sex");
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      sex = radios[i].value;
    }
  }
}

function loadFlag(element) {
  let imgTag = element.parentElement.querySelector("img"); // selecting img tag of particular drop list
  if (element.value === "us") {
    // passing country code of a selected currency code in a img url
    imgTag.src = `https://flagcdn.com/48x36/us.png`;
  } else if (element.value === "eu") {
    imgTag.src = `https://flagcdn.com/48x36/eu.png`;
  } else {
    imgTag.src = `https://flagcdn.com/48x36/gb.png`;
  }
}

function getShoeSize() {
  const resultField = document.querySelector("#result");

  resultField.innerText = computeToSize();
}

// iterate over sex selectors and attach eventLstener + functions that should be performed
for (let i = 0; i < sexSelectors.length; i++) {
  sexSelectors[i].addEventListener("click", () => {
    // find which sex is selected and set sex = the selected radio input
    getRadioVals();
    // compute the sizes and display them in the dropdown
    computeSizes();
  });
}

// when first rendering the page run these two functions to fill in the regions and sizes
computeRegions();
computeSizes();
