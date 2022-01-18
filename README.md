# hackerrank-code-submission
## using nodejs

### About
This is a browser automation project which when run, will automatically execute the following activities:-
1. The [hackerrank](https://www.hackerrank.com/auth/login) login page is opened.
2. User email and password is entered and login button is clicked.
3. 'Algorithms' section is selected and then 'Warmup' checkbox is marked.
4. The first question 'Solve Me First' is opened from the list of given questions.
5. The solution code for the question is typed automatically in the text editor.
6. Finally the code is submitted and all the test cases are passed.


### How to run this project
1. Clone this repository in your local environment.
2. Run command `npm install` to install all the required packages.
3. Run command `node main.js`  or `node solveagain.js`to see the automation result.




### Insights-

1. Puppeteer module used here for browser automation.
2. This challenge is solved using both 'promises' and 'async-await'
3. The 'promise' concept is implemented in 'main.js' file.
4. The 'async-await' concept is implemented in 'solveagain.js' file

