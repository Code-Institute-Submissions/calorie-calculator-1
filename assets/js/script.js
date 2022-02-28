document.addEventListener("DOMContentLoaded", function(){
    let maintenance = document.getElementById("maintenance");
    let calculate = document.getElementById("calculate");

    maintenance.addEventListener("click", function(){
        calculateMaintenance();
    }
    )

    calculate.addEventListener("click", function(){
            calculateTarget();
    }
    )
}
)

function calculateMaintenance(){
    let tdee = document.getElementById("tdee");
    let necessary = checkMeasurements();
    if (necessary){
        bodyfat = document.getElementById("bodyfat"); 
        if (bodyfat > 0){
            //katchMcCardle();
            console.log("Katch");
        } else {
            //harrisBenedict();
            console.log("Harris");
        }
        tdee.innerText = "2,000";
        tdee.style.color = " #daa520"
    } else {
        tdee.innerText = "Please specify correct weight, height, and age";
        tdee.style.color = "#FF0000";
        document.getElementById("weight").value = 0;
        document.getElementById("height").value = 0;
        document.getElementById("age").value = 0;
        document.getElementById("bodyfat").value = 0;
        document.getElementById("weight").focus();
    }
}

function calculateTarget(){
    let target = document.getElementById("target");
    target.innerText = "1,750";
}

function checkMeasurements(){
    let weight = document.getElementById("weight").value;
    let height = document.getElementById("height").value;
    let age = document.getElementById("age").value;
    if (weight > 300 || weight < 20 ) {
        alert("Weight must be between 20 and 300 kilograms");
        return false;
    }
    if (height > 250 || height < 90 ) {
        alert("Height must be between 90 and 250 centimetres");
        return false;
    }
    if (age > 120 || age < 18 ) {
        alert("Age must be between 18 and 120 years");
        return false;
    }
    return true;
}

