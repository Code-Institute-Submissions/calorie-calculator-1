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
    let necessary = checkMeasurements();
    if (necessary){
        bodyfat = document.getElementById("bodyfat").value; 
        console.log("Bodyfat: " + bodyfat);
        if (bodyfat > 0){
            katchMcCardle();
            console.log("Katch");
        } else {
            harrisBenedict();
            console.log("Harris");
        } 
    } 
}

function calculateTarget(){
    let necessary = checkMeasurements();
    if (necessary){
        let tdee = document.getElementById("tdee").innerText;
        let target = document.getElementById("target");
        console.log("TDEE: " + tdee);
        if (tdee !== "TBD"){
            switch(aim){
                case "aggressive":
                    target.innerText = Math.round(tdee * 0.8);
                    break;
                case "moderate":
                    target.innerText = Math.round(tdee * 0.9);
                    break;
                case "maintain":
                    target.innerText = tdee;
                    break;
                case "modest":
                    target.innerText = Math.round(tdee * 1.1);
                    break;
                case "rapid":
                    target.innerText = Math.round(tdee * 1.2);
                    break;
                default:
                    bmr = 0;
                    break;            
            }
            target.style.color = " #daa520";
        } else {
            target.innerText = "You need to calculate Current Maintenance Calories first.";
            target.style.color = "#FF0000";
        }
    } 
    
}

function checkMeasurements(){
    let weight = document.getElementById("weight").value;
    let height = document.getElementById("height").value;
    let age = document.getElementById("age").value;
    if (weight > 300 || weight < 20 ) {
        alert("Weight must be between 20 and 300 kilograms");
        tdee.innerText = "Please specify correct weight.";
        tdee.style.color = "#FF0000";
        document.getElementById("weight").focus();
        return false;
    }
    if (height > 250 || height < 90 ) {
        alert("Height must be between 90 and 250 centimetres");
        tdee.innerText = "Please specify correct height.";
        tdee.style.color = "#FF0000";
        document.getElementById("height").focus();
        return false;
    }
    if (age > 120 || age < 18 ) {
        alert("Age must be between 18 and 120 years");
        tdee.innerText = "Please specify correct age.";
        tdee.style.color = "#FF0000";
        document.getElementById("age").focus();
        return false;
    }
    return true;
}

function harrisBenedict(){
    let weight = document.getElementById("weight").value;
    let height = document.getElementById("height").value;
    let age = document.getElementById("age").value;
    let sex = document.getElementById("sex").value;
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    if (sex === "male"){
        bmr += 5;
    } else {
        bmr -= 161
    }
    maintenanceMultiplier(bmr);
}

function katchMcCardle(){
    let weight = document.getElementById("weight").value;
    let bodyfat = document.getElementById("bodyfat").value;
    let leanBodyMass = weight * ((100 - bodyfat)/100);
    let bmr = 370 + (21.6 * leanBodyMass);
    maintenanceMultiplier(bmr);
}

function maintenanceMultiplier(bmr){
    let tdee = document.getElementById("tdee");
    let activity = document.getElementById("activity").value;
    switch(activity){
        case "sedentary":
            bmr *= 1.2;
            break;
        case "light":
            bmr *= 1.375;
            break;
        case "moderate":
            bmr *= 1.55;
            break;
        case "heavy":
            bmr *= 1.725;
            break;
        case "athlete":
            bmr *= 1.9;
            break;
        default:
            bmr = 0;
            break;            
    }
    tdee.innerText = Math.round(bmr);
    tdee.style.color = " #daa520";
}