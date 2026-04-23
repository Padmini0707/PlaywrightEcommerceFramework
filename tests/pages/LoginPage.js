//importing resuable methods here
const ResuableMethods=require('../Utils/ReusablePageMethods');
const ExplicitWaits=require("../Utils/ExplicitWaits");
class LoginPage{

    
    //constrctor used to intialize all the locators and the page fixture for the respective classes
    constructor(page){
        this.page=page;
        this.username='id=user-name',
        this.password='id=password',
        this.loginButton='id=login-button',
        //error
        this.errormsg='//h3',
        this.errorbtn='.error-button'
    }

    //function to login
    async loginToApplication(userName,Password){
        await ResuableMethods.sendData(this.page,this.username,userName)

        await ResuableMethods.sendData(this.page,this.password,Password)

        await ResuableMethods.clicks(this.page,this.loginButton)
    }

    //boolean function to check the error message for the login failure

    async checkForLoginErrorMessage(){
        await ExplicitWaits.waitForElementToAppear(this.page,this.errormsg)

        const actualerrormsg= await this.page.locator(this.errormsg).textContent()

        //to close the error x button
        await ResuableMethods.clicks(this.page,this.errorbtn)

        if(actualerrormsg!=null){
            return true
        }

        return false
    }
}
module.exports=LoginPage;