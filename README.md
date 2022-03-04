# Calorie Calculator

The application allows a user to enter figure out their required calorie consumption to achieve a weight loss or weight gain goal and and it will also tell them how many grams of each macronutrient they are allowed based on their desired percentage breakdown. 

<img width="944" alt="homescreen" src="https://user-images.githubusercontent.com/70945839/156760752-21279006-ac16-4917-be51-fceb73152452.png">

## Features 

There are three main features to the application, the first allows calculation current maintenance calories, the second accepts a goal i.e. to lose or gain weight and calulcate a target calorie allowance and, finally, a gram per macronutrient is calculated based on a desired percentage breakdown between macronutrients.    

### Calculate Maintenance Calories

<img width="448" alt="leftsidescreen" src="https://user-images.githubusercontent.com/70945839/156762226-b7ba56ac-08f8-4466-9de7-8923f00996a6.png">
The user is prompted to enter weight, height, age, sex, bodyfat percentage and activity level.  The user can then click the "Calculate Maintenance Calories" button and a recommended calorie consumption amount is calculated. 

If the user has not entered a mandatory field (weight, height, age, sex) they will be alerted on clicking the button. The user will also be alerted if an input is outside a range for which the calculator works e.g. an age greater than 120 years is entered. Bodyfat percentage is an optional field but if it is entered there is validation that it is not outside the 5% to 75% range. Activity level is mandatory and chosen from a dropdown menu, the default is 'Sedentary'.

One of two calculations is chosen to derive the Current Maintenance Calories and which one is dependant on whether bodyfat was specified. If bodyfat was specified then Katch McCardle formula (https://en.wikipedia.org/wiki/Basal_metabolic_rate) is used otherwise the Harris Benedict formula is used (https://en.wikipedia.org/wiki/Harris%E2%80%93Benedict_equation). These formulas give a Basal Metabolic Rate, essentially the amount of calories your body utilises just to keep you alive, a multiplier is then applied to get the Total Daily Energy Expenditure (TDEE) and it is TDEE which is the Current Maintenance Calories.

### Enter Weight Loss or Gain Target
<img width="428" alt="goalsandtargets" src="https://user-images.githubusercontent.com/70945839/156764823-d5c00080-8c2d-45ea-b3ea-002e8b4fdd3a.png">
The user is invited to enter a weight goal and a target calorie amount will be calculated. 

The weight goal is from a dropdown and the options include "Aggressive Weight Loss", "Moderate Weight Loss", "Maintain Current Weight" (the default), "Modest Weight Gain" and "Rapid Weight Gain". If either of the two extreme options are chosen then along with the target calorie amount, a warning will be dispayed saying that it should not be pursued for a long period.

Essentially, a multiplier is applied based on the goal, and, initially, as the default is to "Maintain Current Weight", a multiplier of '1' is applied as soon as the button to Calculate Current Maintenance Calories is clicked, so once Current Maintenance Calories are displayed, an identical amount will be displayed in Target Calorie Amount. The target can then be changed as many times as the user wishes. If the user attempts to caulculate a target calorie amount before they have calculated their maintenance calories they are advised that this is a pre-requisite.

### Calculate Macronutrient Consumption
<img width="436" alt="macro" src="https://user-images.githubusercontent.com/70945839/156766949-f4af44d9-b7d9-447c-bf12-1c5d3a21c8da.png">



### Features Left to Implement

- Another feature idea

## Testing 

In this section, you need to convince the assessor that you have conducted enough testing to legitimately believe that the site works well. Essentially, in this part you will want to go over all of your project’s features and ensure that they all work as intended, with the project providing an easy and straightforward way for the users to achieve their goals.

In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.


### Validator Testing 

- HTML
  - No errors were returned when passing through the official [W3C validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Fcode-institute-org.github.io%2Flove-running-2.0%2Findex.html)
- CSS
  - No errors were found when passing through the official [(Jigsaw) validator](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fvalidator.w3.org%2Fnu%2F%3Fdoc%3Dhttps%253A%252F%252Fcode-institute-org.github.io%252Flove-running-2.0%252Findex.html&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en#css)

### Unfixed Bugs

You will need to mention unfixed bugs and why they were not fixed. This section should include shortcomings of the frameworks or technologies used. Although time can be a big variable to consider, paucity of time and difficulty understanding implementation is not a valid reason to leave bugs unfixed. 

## Deployment

This section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub) 

- The site was deployed to GitHub pages. The steps to deploy are as follows: 
  - In the GitHub repository, navigate to the Settings tab 
  - From the source section drop-down menu, select the Master Branch
  - Once the master branch has been selected, the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment. 

The live link can be found here - https://code-institute-org.github.io/love-running-2.0/index.html 


## Credits 

In this section you need to reference where you got your content, media and extra help from. It is common practice to use code from other repositories and tutorials, however, it is important to be very specific about these sources to avoid plagiarism. 

You can break the credits section up into Content and Media, depending on what you have included in your project. 

### Content 

- The text for the Home page was taken from Wikipedia Article A
- Instructions on how to implement form validation on the Sign Up page was taken from [Specific YouTube Tutorial](https://www.youtube.com/)
- The icons in the footer were taken from [Font Awesome](https://fontawesome.com/)

### Media

- The photos used on the home and sign up page are from This Open Source site
- The images used for the gallery page were taken from this other open source site


Congratulations on completing your Readme, you have made another big stride in the direction of being a developer! 

## Other General Project Advice

Below you will find a couple of extra tips that may be helpful when completing your project. Remember that each of these projects will become part of your final portfolio so it’s important to allow enough time to showcase your best work! 

- One of the most basic elements of keeping a healthy commit history is with the commit message. When getting started with your project, read through [this article](https://chris.beams.io/posts/git-commit/) by Chris Beams on How to Write  a Git Commit Message 
  - Make sure to keep the messages in the imperative mood 

- When naming the files in your project directory, make sure to consider meaningful naming of files, point to specific names and sections of content.
  - For example, instead of naming an image used ‘image1.png’ consider naming it ‘landing_page_img.png’. This will ensure that there are clear file paths kept. 

- Do some extra research on good and bad coding practices, there are a handful of useful articles to read, consider reviewing the following list when getting started:
  - [Writing Your Best Code](https://learn.shayhowe.com/html-css/writing-your-best-code/)
  - [HTML & CSS Coding Best Practices](https://medium.com/@inceptiondj.info/html-css-coding-best-practice-fadb9870a00f)
  - [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html#General)

Getting started with your Portfolio Projects can be daunting, planning your project can make it a lot easier to tackle, take small steps to reach the final outcome and enjoy the process! 
