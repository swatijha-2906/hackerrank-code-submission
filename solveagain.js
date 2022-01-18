//hackerrank auto code submission using 'async-await'

const ansObj= require("./answer");
const puppeteer = require("puppeteer");
const loginUrl= "https://www.hackerrank.com/auth/login";
const email="jotef34975@whecode.com";
const password= "123456";

let newTab;
(async function hackerrankChallenge(){
    try{
        let openBrowserPromise= await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        })

        newTab= await openBrowserPromise.newPage();
        await newTab.goto(loginUrl);
        await newTab.waitForSelector("input[id='input-1']", {visible : true});
        await newTab.type("input[id='input-1']", email, { delay: 50 });
        await newTab.type("input[type='password']", password, { delay : 50 });
        await newTab.click("button[type='submit']", { delay : 50 });
        await waitAndClick("li a[data-attr1='algorithms']", newTab);
        await waitAndClick("input[value='warmup']", newTab);
        let allQuestions= await newTab.$$("button.ui-btn.ui-btn-normal.primary-cta.ui-btn-styled");
        console.log("number of questions in warmup section are: " + allQuestions.length);
        await questionSolver(allQuestions[0], ansObj.answer[0])

    }
    catch(err){
        console.log(err);
    }
})();

async function questionSolver(question , answer){
    try{
        await waitAndClick("div.first-challenge", newTab);
        await waitAndClick(".monaco-editor.no-user-select.vs", newTab);
        await waitAndClick("input.checkbox-input", newTab);
        await newTab.waitForSelector("textarea.custominput", {visible : true })
        await newTab.type("textarea.custominput", answer, { delay : 20 });
        await newTab.keyboard.down("Control");
        await newTab.keyboard.press("A", { delay : 100 });
        await newTab.keyboard.press("X", { delay : 100 });
        await newTab.keyboard.up("Control");
        await waitAndClick(".monaco-editor.no-user-select.vs", newTab);
        await newTab.keyboard.down("Control");
        await newTab.keyboard.press("A", { delay : 100 });
        await newTab.keyboard.press("V", { delay : 100 });
        await waitAndClick("button.hr-monaco-submit", newTab);

    }
    catch(err){
        console.error(err);

    }
}

async function waitAndClick(selector, page){

    try{
        await page.waitForSelector(selector, {visible : true });
        clickSelector= await page.click(selector, {delay : 50 });
        return clickSelector;
    }
    catch(err){
        console.log(err);
    }
    
}