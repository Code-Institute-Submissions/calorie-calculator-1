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
            katchMcCardle();
        } else {
            harrisBenedict();
        }
    } else {
        tdee.innerText = "Specify correct weight, height, and age";
    }
}

function calculateTarget(){
    let target = document.getElementById("target");
    target.innerText = "1,750";
}

function checkMeasurements(){
    let weight = document.getElementById("weight");
    let height = document.getElementById("height");
    let age = document.getElementById("age");
    if (weight > 300 || weight < 20 ) {
        alert("Weight must be between 20 and 300 kilograms");
        weight = 0;******
        document.getElementById("weight").focus();
        return false;
    }
    if (height > 250 || height < 90 ) {
        alert("Height must be between 90 and 250 centimetres");
        height.focus();
        return false;
    }
    if (age > 120 || age < 18 ) {
        alert("Age must be between 18 and 120 years");
        age.focus();
        return false;
    }
    return true;

}

