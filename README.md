# Calorie Calculator

The application allows a user to enter figure out their required calorie consumption to achieve a weight loss or weight gain goal and and it will also tell them how many grams of each macronutrient they are allowed based on their desired percentage breakdown. 

<img width="944" alt="homescreen" src="https://user-images.githubusercontent.com/70945839/156760752-21279006-ac16-4917-be51-fceb73152452.png">

## Features 

There are three main features to the application, the first allows calculation of current maintenance calories, the second accepts a goal i.e. to lose or gain weight and calculate a target calorie allowance and, finally, a gram per macronutrient is calculated based on a desired percentage breakdown between macronutrients.    

### Calculate Maintenance Calories

<img width="448" alt="leftsidescreen" src="https://user-images.githubusercontent.com/70945839/156762226-b7ba56ac-08f8-4466-9de7-8923f00996a6.png">
The user is prompted to enter weight, height, age, sex, bodyfat percentage and activity level.  The user can then click the "Calculate Maintenance Calories" button and a recommended calorie consumption amount is calculated. 

If the user has not entered a mandatory field (weight, height, age, sex) they will be alerted on clicking the button. The user will also be alerted if an input is outside a range for which the calculator works e.g. if an age greater than 120 years is entered. Bodyfat percentage is an optional field but if it is entered there is validation that it is not outside the 5% to 75% range. Activity level is mandatory and chosen from a dropdown menu, the default is 'Sedentary'.

One of two calculations is used to derive the Current Maintenance Calories and which one is dependant on whether bodyfat was specified. If bodyfat was specified then the Katch McCardle formula (https://en.wikipedia.org/wiki/Basal_metabolic_rate) is used otherwise the Harris Benedict formula  (https://en.wikipedia.org/wiki/Harris%E2%80%93Benedict_equation) is used. These formulas give a Basal Metabolic Rate, essentially the amount of calories your body utilises just to keep you alive, a multiplier is then applied to get the Total Daily Energy Expenditure (TDEE) and it is TDEE which is the Current Maintenance Calories.

### Enter Weight Loss or Gain Target
<img width="428" alt="goalsandtargets" src="https://user-images.githubusercontent.com/70945839/156764823-d5c00080-8c2d-45ea-b3ea-002e8b4fdd3a.png">
The user is invited to enter a weight goal and a target calorie amount will be calculated. 

The weight goal is from a dropdown and the options include "Aggressive Weight Loss", "Moderate Weight Loss", "Maintain Current Weight" (the default), "Modest Weight Gain" and "Rapid Weight Gain". If either of the two extreme options are chosen then along with the target calorie amount, a warning will be dispayed saying that it should not be pursued for a long period.

Essentially, a multiplier is applied based on the goal, and, initially, as the default is to "Maintain Current Weight", a multiplier of '1' is applied as soon as the button to Calculate Current Maintenance Calories is clicked, so once Current Maintenance Calories are displayed, an identical amount will be displayed in Target Calorie Amount. The target can then be changed as many times as the user wishes. If the user attempts to calculate a target calorie amount before they have calculated their maintenance calories they are advised that this is a pre-requisite.

### Calculate Macronutrient Consumption
<img width="436" alt="macro" src="https://user-images.githubusercontent.com/70945839/156766949-f4af44d9-b7d9-447c-bf12-1c5d3a21c8da.png">
The user can then specify they wish to allocate their calories between the three macronutrients, protein, carbohydrate and fat, percentages are used and the default is 30%, 40% and 30% respectively. Once the user chooses the percentages, the amount of grams of each macronutrient and the calorie allocation for that macronutrient is displayed.

The calculation is quite straight forward a gram of protein and carbohydrate contains four calories while a gram of fat contains nine calories.

If the user allocates more than 90% to one macronutrient they are warned they should not do this and if they do not account for 100% of the allocation or account for more than 100% they are also warned.

### Footer
<img width="958" alt="footer" src="https://user-images.githubusercontent.com/70945839/156767776-bbe2faf8-f720-421b-a113-7993c580f913.png">
A footer explains which two formulae the basis of the calculations and gives links to pages explaining them.


### Features Left to Implement

An activity tracker where a user can specify what activity they wish to add or take away over the course of an average week and be given information on what likely difference that would make in either their calorie allowance or how much more quickly they could meet their goal. A link to a food database with calories per serving would also be relevant.

## Testing 

Testing was performed on each individual field, functional area and the interaction of the functional areas. Before the user can calculate a maintenance calorie amount, it was ensured that all fields need to be specified correctly and before a target calorie amount can be specified, it is required that a maintenance amount be calculated. If a user specified a macro percentage breakdown that is not 100%  warning is issued.

During the testing, it was decided that Event Listeners should be used in such a way that alerts were not called incessantly if a user were to mistype but called when a significant operation was about to occur. This was judged to be the right balance between ensuring accurate inputs without making the user exprience cumbersome.

When the screen width goes below 950px, the Target Goals section moves from the right of the screen to below the Current Maintenance Calories section. When the screen width goes below 460px, the width of columns in the Macro Composition area is reduced.

The application works on an iPhone but it does not look as well as it might, some additional time would ideally be spent in addressing this.

The application has some issues on Firefox in that the area where macronutrient percentages are displayed are automatically displayed with up and down arrows beside them obscuring the fields, some additional time would ideally be spent addressing this. 

One area that was not addressed is to optimise the display based on the display scale of the device. The programming occured on a laptop where the display was set to 150% and it fits best there. When it is changed to 100%, the application still looks reasonable and functions but it would be optimal if the font size automatically adjusted to make better use of the relatively larger screen. Some prelimiary investigation of this indicated that it is possible with some dynamic media queries in the javascript code interacting with the CSS.  

### Validator Testing 

- HTML
  - No errors were returned when passing through the official [W3C validator]
- CSS
  - No errors were found when passing through the official [(Jigsaw) validator]
- Javascript
  - Other than one remark, no errors were found when passing the program through Jshint. The remark was "Functions declared within loops referencing an outer scoped variable may lead to confusing semantics. (calculateMacros)" It was decided that the code is quite easy to read and understand and that the alternative to calling the function from within a loop would have been to duplicate code to an extent that was a little untidy. 

### Unfixed Bugs

There are no obvious functional bugs but a decision was made not to check each field as it is entered with dedicated Event Listeners but rather to check at significant stages e.g. when the Calculate Maintenance Calories button is clicked, when the Target (in terms of weight) is changed or when the Composition in terms of Macronutrients is changed. This makes for a better experience most of the time but there are some situations where it might be frustrating to have to change an input. It also means if a Current Maintenance Amount is calculated and then a field is changed but the Calculate Maintenance Calories button is not pressed again that the user might be misled (although this is unlikely). It was felt that continually recalculating fields everytime one value changed would be unpleasant for the user.

Another area that would be nice to have a more elegant solution to is in the Macronutrient Composition is set to a number other than 100%, the user is warned but in some instances resetting the numbers might be preferable, however, in other cases it was felt that this could be misleading if the user was unknowingly left with a composition they did not intend and on balance this was a worse situation.

One area that was not addressed is to optimise the display based on the display scale of the device. The programming occured on a laptop where the display was set to 150% and it fits best there. When it is changed to 100%, the application still looks reasonable and functions but it would be optimal if the font size automatically adjusted to make better use of the relatively larger screen. Some prelimiary investigation of this indicated that it is possible with some dynamic media queries in the javascript code interacting with the CSS. 

## Deployment
- The site was deployed to GitHub pages. 

## Credits 

The Code institute GitHub templates and the modules from the Diploma in Software Development (E-commerce Applications) were referenced repeatedly. W3Schools.com, W3org.com and StackOverflow.com were all also referenced liberally.

For the actual Calorie Maintenance formulas https://tdeecalculator.net/ and https://www.calculator.net/tdee-calculator.html were used along with Wikipedia and the book The Lean Muscle Diet by Alan Aragon and Lou Schuler.

Google Fonts and Favicon.io were also utilised.

