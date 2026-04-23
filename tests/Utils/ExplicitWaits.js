
class ExplicitWaits{

   static async waitForElementToAppear(page,element){

        await page.waitForSelector(element,{state:'visible'})
    }
}

module.exports=ExplicitWaits;