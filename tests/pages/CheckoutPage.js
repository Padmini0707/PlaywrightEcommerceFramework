const ResuableMethods=require('../Utils/ReusablePageMethods')
const ExplicitWait=require('../Utils/ExplicitWaits')


class CheckoutPage{
    constructor(page){
        this.page=page,
        this.title='.title',
        this.fname='#first-name',
        this.lname='#last-name',
        this.postcal='#postal-code',
        this.errormsg='//h3',
        this.continuebtn='#continue',
        this.eachitemPrices="//div[@class='cart_list']//div[@class='inventory_item_price']",
        this.totalItemPrice="//div[@class='summary_subtotal_label']",
        this.finish='#finish',
        this.completemsg='.complete-header'
    }

    //method to get the pagename
    async getPageName(){
       return await this.page.locator(this.title).textContent()
    }

    //method to fill the form
    async fillTheForm(firstName,lastName,postcode){
        await ResuableMethods.sendData(this.page,this.fname,firstName)
        await ResuableMethods.sendData(this.page,this.lname,lastName)
        await ResuableMethods.sendData(this.page,this.postcal,postcode)
        await ResuableMethods.clicks(this.page,this.continuebtn)
    }

    //method to check for error
    async checkforErrorMsg(){
        return await this.page.locator(this.errormsg).textContent()
    }

    //boolean function to check error
    async checkErrorPresence(){
        if(await this.checkforErrorMsg()!=null){
            return true
        }
        return false
    }

    //replace All to replcae non numeric characters
    getNumbers(number){
       let replceValue= number.toString().replace(/[^0-9.-]/g, "")
       return parseFloat(replceValue)
    }

    //check for item present before checkout
    async checkforItemBeforeCheckout(){
        return await this.page.locator(this.eachitemPrices).count()
    }

    //calculate the totalprice

    async calculateItemPrice(){
        let totalPrice=0
        let listofPrices=await this.page.locator(this.eachitemPrices)
        let lis=await listofPrices.count()
        console.log("Total Item: "+lis)
        for(let i=0;i<await listofPrices.count();i++){
            let eachPrice=await listofPrices.nth(i).textContent()
            console.log("Each Price: "+eachPrice)
            totalPrice+=this.getNumbers(eachPrice)
        }
        console.log(totalPrice)
        return totalPrice
    }

    //get the total price
    async getTotalPrice(){
        let totalprice=await this.page.locator(this.totalItemPrice).textContent()
        let actualPrice=this.getNumbers(totalprice)
        return actualPrice
    }

    //click on finish button
    async clickOnFinish(){
        await ExplicitWait.waitForElementToAppear(this.page,this.finish)
        await ResuableMethods.clicks(this.page,this.finish)
    }

    //fetch the order success message
    async getOrderMessage(){
        await ExplicitWait.waitForElementToAppear(this.page,this.completemsg)
         return await this.page.locator(this.completemsg).textContent()
    }

}

module.exports=CheckoutPage;