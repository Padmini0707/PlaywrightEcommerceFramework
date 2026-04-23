import{test,expect} from '@playwright/test'
const ReusablePageMethods=require('./Utils/ReusablePageMethods')
const loginpage=require('./pages/LoginPage')
const searchpage=require('./pages/SearchPage')
const cartPages=require('./pages/CartPage')

const cartTestData=require('./fixtures/CartTestdata.json')

let lpage;
let SearchPage;
let cpage;
test.beforeEach(async ({page}) =>{
    await page.goto('/')
    lpage=new loginpage(page)
    SearchPage=new searchpage(page)
    cpage=new cartPages(page)
})

test(`Add and Remove Iteme from Cart Test Case -> ${cartTestData.ProductName}`, async({page})=>{
    await lpage.loginToApplication(cartTestData.Username,cartTestData.Password)

    const actualUrl=await ReusablePageMethods.getPageTitle(page)
    expect(actualUrl,"Login Failed").toBe(cartTestData.ExpectedPageTitle)

    await SearchPage.arrageProducts(cartTestData.ArrangeProduct)

    await SearchPage.addItemToCart(cartTestData.ProductName)
     await SearchPage.clickOnCartIcon()

     //Assert
    expect(await cpage.checkforItemCart()).toBeTruthy()

    await cpage.removeItemFroCart(cartTestData.ProductName)

    await SearchPage.logout()
    expect(true).toBeTruthy()
})
