const ResuableMethods=require('../Utils/ReusablePageMethods')
const ExplicitWaits=require('../Utils/ExplicitWaits')
let ItemName=''
class CartPage{
    
    constructor(page){
        this.page=page;
        this.checkout='#checkout',
        this.shopping='#continue-shopping',
        this.commonxpath="//div[@class='cart_list']//div[@class='cart_item_label']",
        this.linkText='/a',
        this.cartbutton='/following-sibling::div//button'
    }
    

    async removeItemFroCart(Option){
        const allIteLinks=await this.page.locator(this.commonxpath+this.linkText)
        const count=await allIteLinks.count()

        for(let i=0;i<count;i++){
            const Items=allIteLinks.nth(i)
            if((await Items.textContent()).toLowerCase()===Option.toLowerCase()){

                await Items.locator('xpath='+this.cartbutton).click()
                break
            }
        }
    }

    //continue shopping
    async continueShopping(){
        await ResuableMethods.clicks(this.page,this.shopping)
    }

    //checkout
    async checkOut(){
         await ResuableMethods.clicks(this.page,this.checkout)
    }

    //check item is in cart page
    async checkforItemCart(){
      try{
       await ExplicitWaits.waitForElementToAppear(this.page ,this.commonxpath)
        return true
       }
       catch{
        return false
       }
       
    }
 
}
module.exports=CartPage;