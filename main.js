//hackerrank auto code submission using 'promises'

const { resolve } = require("path/posix");
const ansObj= require("./answer");
const puppeteer = require("puppeteer");
const loginUrl= "https://www.hackerrank.com/auth/login";
const email="jotef34975@whecode.com";
const password= "123456";

openBrowserPromise= puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"]
})

let page;
openBrowserPromise.then(function(browser){
    let openNewTabPromise = browser.newPage();
    return openNewTabPromise;
}).then(function(newTab){
    page=newTab;
    let openLoginPagePromise=page.goto(loginUrl);
    return openLoginPagePromise;
}).then(function(){
    let waitForSelectorPromise= page.waitForSelector("input[id='input-1']", {visible : true});
    return waitForSelectorPromise;
    
}).then(function(){
    let typeEmailPromise=page.type("input[id='input-1']", email, { delay: 50 });
    return typeEmailPromise;
}).then(function(){
    let typePasswordPromise=page.type("input[type='password']", password, { delay : 50 });
    return typePasswordPromise;
}).then(function(){
    let loginButtonClickPromise= page.click("button[type='submit']", { delay : 50 });
    return loginButtonClickPromise;
}).then(function(){
    let clickAlgorithmPromise= waitAndClick("li a[data-attr1='algorithms']", page);
    return clickAlgorithmPromise;
}).then(function(){
    let checkListWarmupPromise= waitAndClick("input[value='warmup']", page);
    return checkListWarmupPromise;
}).then(function(){
    let allQuestionsPromise=page.$$("button.ui-btn.ui-btn-normal.primary-cta.ui-btn-styled");
    return allQuestionsPromise;
    
}).then(function(questions){
    console.log("number of questions in warmup section are: " + questions.length);
    let solveQuestionPromise= questionSolver(questions[0], ansObj.answer[0]);
    return solveQuestionPromise;
}).catch(function(err){
    console.error(err);
})


function questionSolver(question, answer){
    return new Promise(function(resolve, reject){
    
       /*Note: Every time we submit a correct solution in hackerrank for first question, the second question comes on top next time. 
       Since we have written answer for a specific question, so we need to click on that particular question instead 
       of clicking on questions[0] */
        let clickQuestionPromise = waitAndClick("div.first-challenge", page);

        // let clickQuestionPromise = question.click();
    
        clickQuestionPromise.then(function(){
            let editorInFocusPromise = waitAndClick(".monaco-editor.no-user-select.vs", page)
            return editorInFocusPromise;  
        })
        .then(function(){
            let customInputCheckboxPromise = waitAndClick("input.checkbox-input", page);
            return customInputCheckboxPromise;
        }).then(function(){
            let waitForSelectorPromise= page.waitForSelector("textarea.custominput", {visible : true })
        })
        .then(function(){
            let typeCodePromise= page.type("textarea.custominput", answer, { delay : 20 });
            return typeCodePromise;
        }).then(function(){
            let holdCtrlPromise= page.keyboard.down("Control");
            return holdCtrlPromise;
        })
        .then(function(){
            let pressAPromise= page.keyboard.press("A", { delay : 100 });
            return pressAPromise;
        }).then(function(){
            let pressXPromise = page.keyboard.press("X", { delay : 100 });
            return pressXPromise;
        }).then(function(){
            let unholdCtrlPromise= page.keyboard.up("Control");
            return unholdCtrlPromise;
        }).then(function(){
            let clickEditorPromise = waitAndClick(".monaco-editor.no-user-select.vs", page)
            return clickEditorPromise;  
        }).then(function(){
            let holdCtrlPromise= page.keyboard.down("Control");
            return holdCtrlPromise;
        })
        .then(function(){
            let pressAPromise= page.keyboard.press("A", { delay : 100 });
            return pressAPromise;
        }).then(function(){
            let pressVPromise = page.keyboard.press("V", { delay : 100 });
            return pressVPromise;
        }).then(function(){
            let submitAnswerPromise= waitAndClick("button.hr-monaco-submit", page);
            return submitAnswerPromise;
        })
        .then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}



function waitAndClick(selector, cPage){
    return new Promise(function(resolve, reject){
        let waitForSelectorPromise = cPage.waitForSelector(selector);
        waitForSelectorPromise.then(function(){
            let clickSelectorPromise=cPage.click(selector, { delay : 50 });
            return clickSelectorPromise;
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}

