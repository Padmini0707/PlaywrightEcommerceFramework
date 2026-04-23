
//to make this function visible to all to utilize need to be exported

class ResuableMethods{

    //reusable methods to perform click actions
   static  async  clicks(page,element){

        await page.locator(element).click()

    }

    //reusable method to enter data

    static async sendData(page,element,value){
        await page.locator(element).fill(value)
    }

    // Refresh Page
   static  async RefreshPage(page){
        await page.refresh()
    }

    //get the page title
  static  async getPageTitle(page){
        return await page.title()
    }

    //get the page url

  static   async getPageUrl(page){
      return await page.url()
    }

}
module.exports=ResuableMethods;