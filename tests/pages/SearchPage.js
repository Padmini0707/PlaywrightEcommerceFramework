//export resuable methd class here

const ResuableMethods = require("../Utils/ReusablePageMethods");
const ExplicitWaits=require("../Utils/ExplicitWaits")

class SearchPage{

    constructor(page){
        this.page=page
        this.menuicon='#react-burger-menu-btn',
        this.logoutbtn='#logout_sidebar_link',
        this.closeicon='#react-burger-cross-btn',
        this.carticon='.shopping_cart_link',
        this.dropdown='.product_sort_container',
       this.productlist="//div[@class='inventory_list']//div[@class='inventory_item_label']",
       this. names='/a',
        this.addtocartbuttons='/parent::div/following-sibling::div/button',
        this.listofProductNames=this.productlist+this.names,
      //  this.listofcart=productlist+addtocartbuttons,

        this.titles='.title'
    }


    //logout function
    async logout(){
        //playwright will autoscroll before click or perform any actions
        await ResuableMethods.clicks(this.page,this.menuicon)

        await ResuableMethods.clicks(this.page,this.logoutbtn)
    }

    //wait in the search page for login confirmation

    async checkForLoginConfirm(){
        try{
        await ExplicitWaits.waitForElementToAppear(this.page,this.titles)
        return true
        }
        catch(error){
            return false
        }
    }

    //Select dropdown to arrange the items
    async arrageProducts(option){
       await this.page.locator(this.dropdown).selectOption(option)
      
    }

    //click on CartIcon
    async clickOnCartIcon(){
        await ResuableMethods.clicks(this.page,this.carticon)
    }

    //add item to cart

    async addItemToCart(Option){
        const allProductNames=await this.page.locator(this.listofProductNames)
        const count=await allProductNames.count();
        for(let i=0;i<count;i++){
            const product=allProductNames.nth(i);
            const text=(await product.textContent()).toLowerCase()

            if(text===Option.toLowerCase()){
                await product.locator('xpath='+this.addtocartbuttons).click()
                break;
            }
        }
    }
}

module.exports=SearchPage;