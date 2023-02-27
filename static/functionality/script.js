const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
const result =  document.getElementById("results");
const hideInputs = document.getElementById("inputForm")
const inputContainer = document.getElementById("input-container")
const inputss = document.getElementById("inputs")
const showEye = document.getElementById("openedEye")
const hideEye = document.getElementById("closedEye")
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

let winnerDegree = 0
let winner = 0
let counter = 0
const minDegree = 0
const maxDegree = 360
let values = []
let weights = []
var colors = ['#011d4a', '#8b35bc', '#a7a4fc', '#7163da']
//Object that stores values of minimum and maximum angle for a value
let rotationValues = [];
//Size of each piece
let data1 = [16];
//background color for each piece
var pieColors = ['#a7a4fc'];
//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: [],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data1,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
span.onclick = function() {
  modal.style.display = "none";
}
function hideInputsfnc() {
  hideInputs.style.display = "none";
  showEye.style.display = "block";
  hideEye.style.display = "none";
  inputss.style.display = "none"
  inputContainer.style.border = "none";
}
function showInputsfnc() {
  hideEye.style.display = "block";
  inputss.style.display = "block";
  hideInputs.style.display = "block";
  showEye.style.display = "none";
  inputContainer.style.border = "4px solid white";
  
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
function closeForm(){
  modal.style.display = "none";
}
//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      modal.style.display = "block";
      result.innerHTML = `<h1>You Won ${i.value}</h1>`;
      spinBtn.disabled = false;
      break;
    }
  }
};

function updateOnDelete() {
  rotationValues = []
  myChart.data.datasets[0].data = []
  pieColors = []
  counter-=1
  myChart.data.labels = []
  let colorPicker = 0
  let minimumDeg = 0
  let maximumDeg = 0
  let angle = maxDegree / counter
  myChart.data.datasets[0].backgroundColor.pop()
  for(let i=0; i < counter; i++){
    let pieSize = 100 / counter;
    myChart.data.datasets[0].data.push(pieSize)
    myChart.data.labels.push(values[i])
    if(counter == 1){
      minimumDeg = minDegree
      maximumDeg = (angle * counter) - 1
      rotationValues.push({ minDegree: minimumDeg, maxDegree: maximumDeg, value: values[i], prob: weights[i] })
     }
    else{
      minimumDeg = angle * (i)
      maximumDeg = minimumDeg + angle - 1
      rotationValues.push({ minDegree: minimumDeg, maxDegree: maximumDeg, value: values[i], prob: weights[i] })
    }
}
myChart.update();
}
function displayMessage(){
    let choice = document.getElementById("choice").value;
    let weight = document.getElementById("weight").value;
    if(choice != "" && weight != "")
    {
    rotationValues = []
    myChart.data.datasets[0].data = []
    pieColors = []
    counter+=1
    let colorPicker = 0
    let minimumDeg = 0
    let maximumDeg = 0
    let angle = maxDegree / counter

    myChart.data.labels.push(choice)
    colorPicker = counter % 4
    myChart.data.datasets[0].backgroundColor.push(colors[colorPicker])
    values.push(choice)
    weights.push(weight)
    for(let i=0; i < counter; i++){
        let pieSize = 100 / counter;
        myChart.data.datasets[0].data.push(pieSize)
        if(counter == 1){
          minimumDeg = minDegree
          maximumDeg = (angle * counter) - 1
          rotationValues.push({ minDegree: minimumDeg, maxDegree: maximumDeg, value: values[i], prob: weights[i] })
         }
        else{
          minimumDeg = angle * (i)
          maximumDeg = minimumDeg + angle - 1
          rotationValues.push({ minDegree: minimumDeg, maxDegree: maximumDeg, value: values[i], prob: weights[i] })
        }
    }
    myChart.update();
    let div = document.createElement("div")
    div.setAttribute("id", counter)
    div.setAttribute("class", "inputsDiv")
    let element = document.getElementById("inputs");
    var input1 = document.createElement("INPUT");
    var input2 = document.createElement("INPUT");
    // var editButton = document.createElement("INPUT")
    var deleteButton = document.createElement("INPUT")
    input1.setAttribute("type", "text");
    input1.setAttribute("oninput","OnEdit(this);")
    input1.setAttribute("value", choice);
    input1.setAttribute("class", "values")
    input1.setAttribute("id", "choice-" + counter);
    input2.setAttribute("type", "number");
    input2.setAttribute("value", weight);
    input2.setAttribute("class", "prb")
    input2.setAttribute("id", "weight-" + counter);
    input2.setAttribute("oninput","OnEdit(this);")
    
    
    deleteButton.setAttribute("value","X")
    deleteButton.setAttribute("class", "deleteImage")
    deleteButton.setAttribute("type","button")
    deleteButton.setAttribute("id",counter)
    deleteButton.setAttribute("onclick","remove(this);")

    div.append(input2);
    div.append(input1)
    div.append(deleteButton)
    element.append(div)
    document.getElementById("weight").value = ""
    document.getElementById("choice").value = ""
  }
}
  function OnEdit(ele){
    let id = ele.id
    if(id.includes("choice-") == true)
    {
      const newValue = document.getElementById(id).value
      const myID = id.split("-")
      values[myID[1] - 1] = newValue
      rotationValues[myID[1] - 1].value = newValue
      myChart.data.labels[myID[1] - 1] = newValue
    }
    else if(id.includes("weight-") == true)
    {
      const newWeight = document.getElementById(id).value
      const myID = id.split("-")
      weights[myID[1] - 1] = newWeight
      rotationValues[myID[1] - 1].prob = weights
      
    }
      myChart.update();
  }
  function remove(ele) {
    const element = document.getElementById(counter);
    element.remove();
    values.splice(ele.id-1, 1);
    weights.splice(ele.id-1, 1);
    rotationValues.splice(ele.id-1, 1);
    updateOnDelete()
  }
//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  // Generate random degrees to stop at
  let randomNumber = Math.floor(Math.random() * 101)
  let cumulativePorb = 0;
  let FinalDegree = 0;
  for(let i = 0; i < values.length; i++) {
    cumulativePorb+= parseInt(weights[i])
    if(randomNumber <= cumulativePorb){
      FinalDegree = Math.floor((rotationValues[i].maxDegree - rotationValues[i].minDegree) / 2) +  rotationValues[i].minDegree
      winner = i + 1
      break;
    }
  }
  if( winner == 1){
    winnerDegree = 1
   }
   else {
    winnerDegree = Math.floor(((360 / counter) * (values.length + 1 - winner)) + (Math.floor(0.3 * counter) + 1) * 20)
   }
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */

    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == winnerDegree) {
      valueGenerator(FinalDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
  
});
