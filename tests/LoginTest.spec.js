import{test,expect} from '@playwright/test'
const Loginpage=require("./pages/LoginPage")
const searchPage=require("./pages/SearchPage")
const ResuableMethods=require("./Utils/ReusablePageMethods")
//import fixtures
const loginData=require("./fixtures/login-data.json")

for(const data of loginData){
    
    test(`Login Testcase : Username ->  ${data.Username || 'empty Username'}`,async({page})=>{
       const lpage=new Loginpage(page)
       const spage=new searchPage(page)
        await page.goto('/')
    //create the object for both login and search page

    await lpage.loginToApplication(data.Username,data.Password)
   
    //after click verify if the home page lanched

    if(data.Username && data.Password){
        let loggedIn=await spage.checkForLoginConfirm()
        if (loggedIn) {
            const expectedTitle=await ResuableMethods. getPageTitle(page)
            expect(expectedTitle,"Login Failed").toBe("Swag Labs")
             await spage.logout()
        }
        else{
             const flag=await lpage.checkForLoginErrorMessage()
            expect(flag,"User able to login with wrong creditionals").toBe(true);
        }
    }
    else{
        const flag=await lpage.checkForLoginErrorMessage()
        expect(flag,"User able to login with wrong creditionals").toBe(true);
    }
    //     try{
            
            
    //         const expectedTitle=await ResuableMethods. getPageTitle(page)
    //         expect(expectedTitle,"Login Failed").toBe("Swag Labs")
    //         await spage.logout()
    //      }
    //      catch(error) {
    //         const flag=await lpage.checkForLoginErrorMessage()
    //         expect(flag,"User able to login with wrong creditionals").toBe(true);
    //    }
        
    // }
    // else{
    //     const flag=await lpage.checkForLoginErrorMessage()
    //     expect(flag,"User able to login with username or password being null").toBe(true);
    // }
})
}
