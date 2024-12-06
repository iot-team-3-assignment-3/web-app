const payload = JSON.parse(
  document.getElementById("string-response").innerText
);

window.onload = function () {
  loadInitialRegion(0);
  loadInitialEnergy(0);
  populateCharts();
  renderCharts();
};

function loadInitialRegion(index) {
  // Loads initial region filter label
  document.getElementById("region-label").innerText = String(
    payload["data"][0]["regions"][index]["shortname"]
  );
}

function loadInitialEnergy(index) {
  // Loads initial fuel filter label
  document.getElementById("energy-label").innerText = String(
    payload["data"][0]["regions"][index]["generationmix"][index]["fuel"]
  );
}

function hideShow(hideid, showid, activeTab, inactiveTab) {
  document.getElementById(hideid).classList.add("hidden");
  document.getElementById(showid).classList.remove("hidden");
  document.getElementById(activeTab).classList.add("active");
  document.getElementById(inactiveTab).classList.remove("active");
}

function toggleEnergytype(energyIndex) {
  // This is what happens when you click a filter option
  // New values are pulled from the payload, and the chart is updated to display the new values
  current_fuel_values = [];
  for (let i = 0; i < payload["data"][0]["regions"].length; i++) {
    current_fuel_values.push(
      parseFloat(
        payload["data"][0]["regions"][i]["generationmix"][energyIndex]["perc"]
      ).toFixed(1)
    );
  }
  current_fuel_values;
  console.log(current_fuel_values);
  loadInitialEnergy(energyIndex);
  chartToChange.data.datasets[0].data = current_fuel_values;
  chartToChange.update();
}

// Render charts

// Setting up lists of values for chart 1
const regions = [];
const intensity = [];
let chartToChange;

// Initialising arrays to be used for storing the chart data

// Setting up lists of values for charts 2 and 3
let current_region_by_energy = {};
let current_fuel_by_region = {};
let current_fuel_values = [];

function populateCharts() {
  for (let i = 0; i < payload["data"][0]["regions"].length; i++) {
    current_fuel_by_region[
      String(payload["data"][0]["regions"][i]["shortname"])
    ] = parseFloat(
      payload["data"][0]["regions"][i]["generationmix"][0]["perc"]
    );

    regions.push(String(payload["data"][0]["regions"][i]["shortname"]));
    intensity.push(
      parseInt(payload["data"][0]["regions"][i]["intensity"]["forecast"])
    );
    // iterating through each 'regions' entry in the payload, and adding its respective region name and intensity forecast to separate arrays.

    current_fuel_values.push(
      parseFloat(payload["data"][0]["regions"][i]["generationmix"][0]["perc"])
    );
  }
}

// Adding each array to the values to display on the chart

var barColorsBlue = [
  "#0000ff",
  "#0000cc",
  "#000099",
  "#000066",
  "#000033",
  "#0033ff",
  "#0066ff",
  "#0099ff",
  "#00ccff",
  "#33ccff",
  "#66ccff",
  "#99ccff",
  "#ccccff",
  "#6699ff",
  "#3366ff",
  "#0033cc",
  "#003399",
  "#003366",
];
var barColorsRed = [
  "#ff0000",
  "#cc0000",
  "#990000",
  "#660000",
  "#330000",
  "#ff3333",
  "#ff6666",
  "#ff9999",
  "#ffcccc",
  "#ff6633",
  "#ff3300",
  "#cc3300",
  "#993300",
  "#660033",
  "#ff0033",
  "#cc0033",
  "#990033",
  "#660000",
];
var barColorsGreen = [
  "#00ff00",
  "#00cc00",
  "#009900",
  "#006600",
  "#003300",
  "#33ff33",
  "#66ff66",
  "#99ff99",
  "#ccffcc",
  "#33cc33",
  "#33ff00",
  "#00ff33",
  "#00cc33",
  "#009933",
  "#339933",
  "#66cc66",
  "#99cc99",
  "#336600",
];

function renderCharts() {
  new Chart("all-regions", {
    type: "bar",
    data: {
      labels: regions,
      datasets: [
        {
          backgroundColor: barColorsBlue,
          data: intensity,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Carbon Intensity Forecast (gCO2e/kWh)",
      },
    },
  });

  const filterRegionChart = new Chart("filter-region", {
    type: "bar",
    data: {
      labels: regions,
      datasets: [
        {
          backgroundColor: barColorsRed,
          data: current_fuel_values,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      legend: { display: false },
      title: {
        display: true,
        text: "% distribution of fuel type by region",
      },
    },
  });

  new Chart("filter-energy-source", {
    type: "pie",
    data: {
      labels: regions,
      datasets: [
        {
          backgroundColor: barColorsGreen,
          data: intensity,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "% distribution of fuel types per region",
      },
    },
  });

  chartToChange = filterRegionChart;
}
