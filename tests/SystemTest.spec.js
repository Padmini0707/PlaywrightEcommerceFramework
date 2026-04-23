import{test,expect} from '@playwright/test'
const ReusablePageMethods=require('./Utils/ReusablePageMethods')
const loginpage=require('./pages/LoginPage')
const searchpage=require('./pages/SearchPage')
const cartPages=require('./pages/CartPage')
const checkoutpages=require('./pages/CheckoutPage')

const E2ETestData=require('./fixtures/E2ETestdata.json')

let lpage;
let SearchPage;
let cpage;
let checkoutpage;

test.beforeEach(async ({page}) =>{
    await page.goto('/')
    lpage=new loginpage(page)
    SearchPage=new searchpage(page)
    cpage=new cartPages(page)
    checkoutpage=new checkoutpages(page)
})

for(const data of E2ETestData){
test(`System Test Case -> ${data.Username}`, async({page})=>{

     await lpage.loginToApplication(data.Username,data.Password)

    const actualUrl=await ReusablePageMethods.getPageTitle(page)
    expect(actualUrl,"Login Failed").toBe(data.ExpectedPageTitle)

     await SearchPage.addItemToCart(data.ProductName)
     await SearchPage.clickOnCartIcon()

     //Assert
    expect(await cpage.checkforItemCart()).toBeTruthy()

    await cpage.checkOut()

    await  checkoutpage.fillTheForm(data.FirstName,data.LastName,data.PostalCode)

    if(!data.FirstName || !data.LastName || !data.PostalCode){
        expect(await checkoutpage.checkErrorPresence(),{message:"User able to proceed with either of three mandatory details"}).toBeTruthy()
        await SearchPage.logout()
    }

    if(await checkoutpage.checkforItemBeforeCheckout()===0){
        await checkoutpage.clickOnFinish()
        expect(await checkoutpage.getOrderMessage(),{meaage:"User not able to place order"})
        .not.toBe(data.orderConfirmationmsg)

    }

    let expectedPrice=await checkoutpage.calculateItemPrice()

    let actualPrice=await checkoutpage.getTotalPrice()
  
    expect(actualPrice,{ message: "Total Price Mismatch" }).toBe(expectedPrice)
    await checkoutpage.clickOnFinish()
    expect(await checkoutpage.getOrderMessage(),{message:"User not able to place order"})
        .toBe(data.orderConfirmationmsg)
    await SearchPage.logout()
})

}

test('SystemTest Without any Product',async({page})=>{
    await lpage.loginToApplication(E2ETestData[0].Username,E2ETestData[0].Password)

    const actualUrl=await ReusablePageMethods.getPageTitle(page)
    expect(actualUrl,"Login Failed").toBe(E2ETestData[0].ExpectedPageTitle)

    await SearchPage.clickOnCartIcon()

    await cpage.checkOut()

    await  checkoutpage.fillTheForm(E2ETestData[0].FirstName,E2ETestData[0].LastName,E2ETestData[0].PostalCode)
    await checkoutpage.clickOnFinish()
    expect(await checkoutpage.getOrderMessage()) .not.toBe(E2ETestData[0].orderConfirmationmsg);
    await SearchPage.logout()
})