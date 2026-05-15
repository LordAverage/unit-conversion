class measurementUnit {
  constructor(element, metricSingular, metricPlural, imperialSingular, imperialPlural, ratio) {
    this.element          = element;
    this.metricSingular     = metricSingular;
    this.metricPlural       = metricPlural;
    this.imperialSingular = imperialSingular;
    this.imperialPlural   = imperialPlural;
    this.ratio            = ratio;
  }
  
  getImperialValue(metricValue) {
    return (metricValue * this.ratio).toFixed(3);
  }
  
  getMetricValue(imperialValue) {
    return (imperialValue / this.ratio).toFixed(3);
  }
  
  render() {
    let metricForm;
    let imperialForm;
    const metricValue   = this.getMetricValue(convertValue);
    const imperialValue = this.getImperialValue(convertValue);
    
    if (metricValue === 1)
        metricForm  = this.metricSingular;
    else metricForm = this.metricPlural;
    
    if (imperialValue === 1)
        imperialForm  = this.imperialSingular;
    else imperialForm = this.imperialPlural;
    
    this.element.textContent = `${convertValue} ${metricForm} = ${imperialValue} ${imperialForm} | ${convertValue} ${imperialForm} = ${metricValue} ${metricForm}`
  }
}

const meterTofoot   = 3.28084;
const literToGallon = 0.264172;
const kilosToPound  = 2.20462;
const MIN           = 0;
const MAX           = 99999;

const metersEl        = document.getElementById("meters-text");
const litersEl        = document.getElementById("liters-text");
const kilosEl         = document.getElementById("kilos-text");
const convertValueEl  = document.getElementById("convert-value");
const convertBtn      = document.getElementById("convert-btn");

const measurementUnits = [ new measurementUnit(metersEl, "meter", "meters", "foot", "feet", meterTofoot),
                           new measurementUnit(litersEl, "liter", "liters", "gallon", "gallons", literToGallon),
                           new measurementUnit(kilosEl, "kilogram", "kilograms", "pound", "pounds", kilosToPound) ];
                           
let   convertValue    = convertValueEl.value;

function renderConversions() {
    for (let i = 0; i < measurementUnits.length; i++)
        measurementUnits[i].render();
}

function fetchConvertValue() { return convertValueEl.value }

function setConvertValue() { convertValue = fetchConvertValue(); }

function convert() {
    setConvertValue();
    
    renderConversions();
}

convertValueEl.addEventListener("input", function () {  
  this.value = this.value.replace(/[^0-9]/g, "");
  this.value = String(Number(this.value));
  if (!this.value) this.value = 0;
  if (MAX < Number(this.value))
    this.value = MAX;
});

convertValueEl.addEventListener("paste", function (e) {
  e.preventDefault();
  const cleaned = (e.clipboardData || window.clipboardData)
    .getData('text').replace(/[^0-9]/g, "");
  if (cleaned) this.value = Math.min(Math.max(Number(cleaned), MIN), MAX);
});

convertBtn.addEventListener("click", convert);

convert();