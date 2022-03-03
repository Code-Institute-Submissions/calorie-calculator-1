document.addEventListener("DOMContentLoaded", function(){
    let maintenance = document.getElementById("maintenance");
    let aim = document.getElementById("aim");
    let macros = document.getElementsByClassName("macroNutrient");

    /* 
    The following javascript code takes measurements entered by a user and uses them to 
    calculate their Maintenance Calories (TDEE - Total Daily Energy Expenditure), its also 
    takes an aim (or goal) of the user and based on that goal it calculates the calories needed 
    to achieve that goal, furthermore it allows the user to specify the macronutrient compostition 
    of this goal calorie amount and informs them of how many grams of each macronutrient they 
    should have based on the target calories and the desired Macronutrient composition
    */

    // When the "Calculate Current Maintenance Calories" button is clicked the related function is called.
    maintenance.addEventListener("click", function(){
        calculateMaintenance();
    }
    )

    // Once a user specifies their goal, a Target Calories amount is calculated.
    aim.addEventListener("change", function(){
        calculateTarget();
    }
    )

    // If any of the Macronutrient amounts are changed, a routine to validate and 
    // recalculate the alloted grams and calories is called 
    for (let macro of macros){
        macro.addEventListener("change", function(){
            calculateMacros(this.id);
        })
    }
}
)

/* 
This function calculates the users current maintenace calories by calling one of two formulas, 
if a bodyfat percentage has been specified then the Katch-McCardle formula is called, otherwise the 
Harris-Benedict formula is called. Once a current maintenance amount is calculated, a routine to 
calculate a target amount amount is called, this is because a weight objective is always specified. 
On loading, that objective is set to "Maintain Current Weight", this default is useful in terms of
having the macronutirent matrix always filled 
*/
function calculateMaintenance(){
    // Before either formula is called, a function which ensures the necessary
    // measurements have been entered is called
    let necessary = checkMeasurements();
    if (necessary){
        // depend on whether bodyfat has been specified, the appropriate formula is used 
        bodyfat = document.getElementById("bodyfat").value; 
        if (bodyfat > 0){
            katchMcCardle();
        } else {
            harrisBenedict();
        }
        // once a current maintenance calorie amount is available, calculate a target calorie amount
        // based on the user's objective (on loading the aim is defaulted to 'Maintain Current Weight')  
        calculateTarget(); 
    }
}

/* 
This function calculates the user's Target Maintenance Calories by taking their goal i.e. lose/maintain/gain
weight and applying an appropriate multiplier to their Current Maintenance Calories. If an aggresive
weight loss target or a rapid weight gain target has been specified then a warning will be displayed
that such a goal should not be pursued in the long term
*/
function calculateTarget(){
    // Before applying the multiplier, a function which ensures the necessary measurements to 
    // calculate Current Maintenance Calories have been entered is called
    let necessary = checkMeasurements();
    if (necessary){
        // Retrieve the Current Maintenance Calories
        let tdee = document.getElementById("tdee").innerText;
        let target = document.getElementById("target");
        let warning = document.getElementById("warning");
        warning.innerText = "";
        // Establish whether the Current Maintenance Calories have been calculated, the variable
        // "tdee" stands for Total Daily Energy Expenditure a common acronym for Maintenance Calories
        if (tdee !== "TBD"){
            //If the Current Maintenance Calories have been calculated, determine the aim of the
            // user and apply the appropriate multiplier
            aim = document.getElementById("aim").value;
            switch(aim){
                case "aggressive":
                    target.innerText = Math.round(tdee * 0.8);
                    // sets the warning as this is an 'extreme' goal
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
                    // sets the warning as this is an 'extreme' goal
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
            // If the Current Maintenance Calories have not yet been calculated, prompt the user to
            // press the button to do so
            target.innerText = "You need to calculate Current Maintenance Calories first.";
            target.style.color = "#FF0000";
        }
    } 
    
}

/* 
The user is allowed to specify a macronutrient composition of their calories i.e. the percentage
of their total calorie allowance that they wish to consume in protein, carbohydrate and fat 
respectively. On loading the page the percentages are defaulted to 30%, 40% and 30% respectively. The
function will calculate grams of each macronutriet to meet the overall calorie goal 
*/
function calculateMacros(macro){
    // Validate that the composition specified totals 100% and that no one nutrient is specified at
    // over 90% (as this would be inadvisable from a health perspective)  
    validateMacros(macro);
    // Based on the specified percentages, the grams and calories per macronutrient are calculated.
    calculateGramsAndCals();
}

/* 
Height, weight, age and bodyfat percentage are all validated to be within a range that the two
available formulae can work. If any of them fail the validation, an alert is given, the user is 
placed on the relevant field and a 'false' returned to the calling function, so that it will stop
its processing 
*/
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
    // Unlike the other variables, bodyfat is not mandatory but if it is specified, it should be
    // within a valid range
    if ( (bodyfat !== 0) && (bodyfat > 75 || bodyfat < 5 ) ) {
        alert("Either leave bodyfat as zero or specify a value between 5% and 75%.");
        document.getElementById("bodyfat").focus();
        return false;
    }
    return true;
}

/* 
This function executes the Harris Benedict formula to calculate Basal Metabolic Rate and then
calls a multiplier to get the Total Daily Energy Expenditure (TDEE)
*/
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

/* 
This function executes the Katch McCardle formula to calculate Basal Metabolic Rate and then
calls a multiplier to get the Total Daily Energy Expenditure (TDEE)
*/
function katchMcCardle(){
    let weight = document.getElementById("weight").value;
    let bodyfat = document.getElementById("bodyfat").value;
    let leanBodyMass = weight * ((100 - bodyfat)/100);
    let bmr = 370 + (21.6 * leanBodyMass);
    maintenanceMultiplier(bmr);
}

/* 
This function accepts the Basal Metabolic Rate and applies a multiplier to get the TDEE
*/
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

/* 
This function takes the user's desired macronutrient composition and works out how many grams of 
each macronutrient they are allowed based on their target calorie amount and their desired 
macronutrient composition 
*/
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
    // Each gram of protein is four calories
    document.getElementById("proteinGrams").innerText = Math.round(proteinCalories / 4);

    let carbohydrateCalories = Math.round((target * carbohydrate) / 100);
    document.getElementById("carbohydrateCalories").innerText = carbohydrateCalories;
    // Each gram of carbohydrate is four calories
    document.getElementById("carbohydrateGrams").innerText = Math.round(carbohydrateCalories / 4);

    let fatCalories = Math.round((target * fat) / 100);
    document.getElementById("fatCalories").innerText = fatCalories;
    // Each gram of fat is nine calories
    document.getElementById("fatGrams").innerText = Math.round(fatCalories / 9);

}

/*
This function validates that the user has specified a macronutrient composition that is 100% between
the three macronutrients. It also checks that no one macronutrient is over 90% as this would not be 
healthy. One of three macronutrients can be changed on any occasion and the relevant macronutrient is
passed to this function
*/
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
        return;
    }

    // depending on which macronutrient has just been changed, check to see it has not been specified
    // to be more than 90% and if this is the case issue a warning and return the user to that field
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