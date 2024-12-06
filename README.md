# Welcome to the UK Carbon intensity Dashboard


## What does this dashboard show?

The main graph at the top displays the grams of CO2 per kilowatt hour that different regions in the UK produce. This is a straightforward static graph that retrieves data from the API endpoint ```https://carbonintensity.org.uk/regional```. This will update with the most up to date data every time the page is reloaded.

The graph in the bottom left is a graph displaying the percentage that each region relies on for the selected fuel type. For example, for any selected fuel type, e.g. wind, the number displayed is the percentage of total energy produced for each region that comes from wind power - the number displayed for London may be 10.6, meaning that 10.6% of London's power comes from wind.

```Click the filter and choose a fuel type from the dropdown to toggle it.```

The graph in the bottom right displays the proportions of all the fuel types that make up the total energy production of the selected region. All the sections of the pie chart sum up to 100, as they represent the percentage make-up of fuel types used in the toggled region.

```Click the filter and choose a region from the dropdown to toggle it.```

Theres also some documentation available in the ```Docs``` tab around the data source and its respective collaborators.

## Contribute to this repo

1. Create a new folder and open it in VSCode

2. Open your command line and type ```git clone https://github.com/iot-team-3-assignment-3/web-app.git```

3. run the command ```source .venv/bin/activate``` to activate the virtual environment

4. Check it's activated by running ```which python``` - it should return a file path

5. Make some changes

6. Test your changes by running ```python3 main.py``` (mac) or ```py main.py``` (windows) and opening the URL it gives you

7. When you're ready to push, run:
    - ```git add .```
    - ```git checkout dev```
    - ```git commit -m 'your message'```
    - ```git push origin dev```