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
      )
    );
  }
  loadInitialEnergy(energyIndex);
  chartToChange.data.datasets[0].data = current_fuel_values;
  chartToChange.update();
  console.log(`Values updated! ${current_fuel_values}`);
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

var barColor = "#4287f5";
var text = "Carbon Intensity Forecast (gCO2e/kWh)";

function renderCharts() {
  new Chart("all-regions", {
    type: "bar",
    data: {
      labels: regions,
      datasets: [
        {
          backgroundColor: barColor,
          data: intensity,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: text,
      },
    },
  });

  const filterRegionChart = new Chart("filter-region", {
    type: "bar",
    data: {
      labels: regions,
      datasets: [
        {
          backgroundColor: barColor,
          data: current_fuel_values,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      legend: { display: false },
      title: {
        display: true,
        text: text,
      },
    },
  });

  new Chart("filter-energy-source", {
    type: "pie",
    data: {
      labels: regions,
      datasets: [
        {
          backgroundColor: barColor,
          data: intensity,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: text,
      },
    },
  });

  chartToChange = filterRegionChart;
}
