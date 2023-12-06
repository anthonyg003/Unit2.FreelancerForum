const freelancers = [
  { name: "Dr. Slice", price: 25, occupation: "gardener" },
  { name: "Dr. Pressure", price: 51, occupation: "programmer" },
  { name: "Prof. Possibility", price: 43, occupation: "teacher" },
  { name: "Prof. Prism", price: 81, occupation: "teacher" },
  { name: "Dr. Impulse", price: 43, occupation: "teacher" },
  { name: "Prof. Spark", price: 76, occupation: "programmer" },
  { name: "Dr. Wire", price: 47, occupation: "teacher" },
  { name: "Prof. Goose", price: 72, occupation: "driver" },
];

//Select priceValue to update the average price
const priceValue = document.querySelector("#priceValue");

//Creates table header
function createTableHeader(table) {
  const thead = document.createElement("thead");
  //Create header rows for table
  const headerRow = document.createElement("tr");
  //Create an array to store all the headings for the table
  const headers = ["Name", "Occupation", "Starting Price"];
  // loop through every element
  for (const header of headers) {
    const th = document.createElement("th");
    //Takes element from headers array and adds it to the th tag
    th.innerText = header;
    //Add th to the tr
    headerRow.appendChild(th);
  }
  //Add headerRow to thead
  thead.appendChild(headerRow);
  //Add thead to the table
  table.appendChild(thead);
}

function createTableBody(table, freelancers) {
  //Create body
  const tbody = document.createElement("tbody");

  for (const freelance of freelancers) {
    //Create tr to put inside of tbody
    const tableRow = document.createElement("tr");

    for (const key in freelance) {
      // Creates the td
      const td = document.createElement("td");
      //Adds element from the object key to td tags
      td.innerText = freelance[key];
      //Adds td to table row
      tableRow.appendChild(td);
    }
    tbody.appendChild(tableRow);
  }
  table.appendChild(tbody);
}
//funtion to calculate the average start price of all freelancers
function calculateAverageStartPrice(freelancers) {
  const totalPrice = freelancers.reduce((prev, curr) => {
    const price = prev + curr.price;
    return price;
  }, 0);
  const averagePrice = totalPrice / freelancers.length;
  priceValue.innerText = Math.floor(averagePrice);
}

function appendTableToContainer(table) {
  //Get root element
  const root = document.querySelector("#root");
  //clears the html file for the set interval
  root.innerHTML = "";
  //creates a new header for table
  const h2 = document.createElement("h2");
  h2.innerText = "Available Freelancers";
  root.appendChild(h2);
  root.appendChild(table);
}

// function to add the new freelancer to the table
function updateTableAndAverage(newFreelancer) {
  freelancers.push(newFreelancer);
  const table = document.createElement("table");
  createTableHeader(table);
  createTableBody(table, freelancers);
  appendTableToContainer(table);

  calculateAverageStartPrice(freelancers);
}
//function to display new freelancer every second
function simulateNewFreelancer() {
  const intervalId = setInterval(() => {
    const newFreelancer = {
      name: "Carol",
      occupation: "Programmer",
      price: 70,
    };
    updateTableAndAverage(newFreelancer);
  }, 1000);

  return intervalId;
}

//Calls all the functions to create the table
function render(initialState) {
  const table = document.createElement("table");
  createTableHeader(table);
  createTableBody(table, initialState);
  appendTableToContainer(table);
  calculateAverageStartPrice(freelancers);
}

const intervalId = simulateNewFreelancer();
//stops adding "Carol"
setTimeout(() => {
  clearInterval(intervalId);
}, 5000);

render(freelancers);
