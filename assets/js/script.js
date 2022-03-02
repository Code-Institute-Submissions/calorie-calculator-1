document.addEventListener("DOMContentLoaded", function(){
    console.log("Before assignments");
    let maintenance = document.getElementById("maintenance");
    let aim = document.getElementById("aim");
    let macros = document.getElementsByClassName("macroNutrient");

    maintenance.addEventListener("click", function(){
        calculateMaintenance();
    }
    )

    aim.addEventListener("change", function(){
        calculateTarget();
    }
    )

    for (let macro of macros){
        macro.addEventListener("change", function(){
            console.log("Changed on " + this.id);
            calculateMacros(this.id);
        })
    }
}
)

function calculateMaintenance(){
    let necessary = checkMeasurements();
    if (necessary){
        bodyfat = document.getElementById("bodyfat").value; 
        if (bodyfat > 0){
            katchMcCardle();
        } else {
            harrisBenedict();
        } 
        calculateTarget(); 
    }
}

function calculateTarget(){
    let necessary = checkMeasurements();
    if (necessary){
        let tdee = document.getElementById("tdee").innerText;
        let target = document.getElementById("target");
        let warning = document.getElementById("warning");
        warning.innerText = "";
        if (tdee !== "TBD"){
            aim = document.getElementById("aim").value;
            switch(aim){
                case "aggressive":
                    target.innerText = Math.round(tdee * 0.8);
                    warning.innerText = "Aggressive weight loss targets should not be pursued for a long period.";
                    warning.style.color = "#FF0000";
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
                    warning.innerText ="Rapid weight gain targets should not be pursued for a long period.";
                    warning.style.color = "#FF0000";
                    break;
                default:
                    bmr = 0;
                    break;            
            } 
            target.style.color = " #daa520";
            calculateGramsAndCals();
        } else {
            target.innerText = "You need to calculate Current Maintenance Calories first.";
            target.style.color = "#FF0000";
        }
    } 
    
}

function calculateMacros(macro){
    validateMacros(macro);

    calculateGramsAndCals();
}


function checkMeasurements(){
    let weight = document.getElementById("weight").value;
    let height = document.getElementById("height").value;
    let age = document.getElementById("age").value;
    let bodyfat = parseInt(document.getElementById("bodyfat").value);
    if (weight > 300 || weight < 20 ) {
        alert("Weight must be between 20 and 300 kilograms");
        document.getElementById("weight").focus();
        return false;
    }
    if (height > 250 || height < 90 ) {
        alert("Height must be between 90 and 250 centimetres");
        document.getElementById("height").focus();
        return false;
    }
    if (age > 120 || age < 18 ) {
        alert("Age must be between 18 and 120 years");
        document.getElementById("age").focus();
        return false;
    }
    if ( (bodyfat !== 0) && (bodyfat > 75 || bodyfat < 5 ) ) {
        alert("Either leave bodyfat as zero or specify a value between 5% and 75%.");
        document.getElementById("bodyfat").focus();
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

function calculateGramsAndCals(){
    let target = document.getElementById("target").innerText;
    let protein = document.getElementById("protein").value;
    let carbohydrate = document.getElementById("carbohydrate").value;
    let fat = document.getElementById("fat").value;
    Math.round(protein);
    Math.round(carbohydrate);
    Math.round(fat);

    let proteinCalories = Math.round((target * protein) / 100);
    document.getElementById("proteinCalories").innerText = proteinCalories;
    document.getElementById("proteinGrams").innerText = Math.round(proteinCalories / 4);

    let carbohydrateCalories = Math.round((target * carbohydrate) / 100);
    document.getElementById("carbohydrateCalories").innerText = carbohydrateCalories;
    document.getElementById("carbohydrateGrams").innerText = Math.round(carbohydrateCalories / 4);

    let fatCalories = Math.round((target * fat) / 100);
    document.getElementById("fatCalories").innerText = fatCalories;
    document.getElementById("fatGrams").innerText = Math.round(fatCalories / 9);

}

function validateMacros(macro){
    let protein = parseInt(document.getElementById("protein").value);
    let carbohydrate = parseInt(document.getElementById("carbohydrate").value);
    let fat = parseInt(document.getElementById("fat").value);
    Math.round(protein);
    Math.round(carbohydrate);
    Math.round(fat);
    let totalMacros = protein + carbohydrate + fat;

    if ( totalMacros !== 100){
        alert("The composition of macros is " + totalMacros + "% and it should be 100 percent");
        document.getElementById("carbohydrate").focus();
    }

    switch(macro){
        case "protein":
            if (protein > 90) {
                alert("Protein is " + protein + "% and no individual macronutrient should be greater than 90 percent.");
                document.getElementById("protein").focus();
            } 
            break;
        case "carbohydrate":
            if (carbohydrate > 90) {
                alert("Carbohydrate is " + carbohydrate + "% and no individual macronutrient should be greater than 90 percent.");
                document.getElementById("carbohydrate").focus();
            } 
            break;
        case "fat":
            if (fat > 90) {
                alert("Fat is " + fat + "% and no individual macronutrient should be greater than 90 percent.");
                document.getElementById("fat").focus();
            } 
            break;

    }


    
}