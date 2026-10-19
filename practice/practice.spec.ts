import { test, expect } from '@playwright/test';

test("User login" , async({page})=>{
    await page.goto("/");
    await page.getByRole("textbox",{name:"you@example.com"}).fill("admin@test.com");
    await page.getByRole("textbox",{name:"Enter password"}).fill("1234");
    await page.getByRole("button", { name: "Login" }).click();
     const profileHeader = await page.getByRole("heading", { name: "Profile" }).textContent();
     await expect(profileHeader?.includes("Profile")).toBeTruthy();
    // await expect(page.getByRole('heading')).toContainText('Profile');
    // await expect(page.getByRole("heading", { name: "Profile" })).toHaveText("Profile");
    await page.context().storageState({path:"auth.json"});
    //  await page.pause();
});
//duibar browser open korse tai next page e zay nai, zodi browser fixture
//thakto tahole onno page e zete partam, nuth ekhane page fixture
test("Double Button Click", async({page})=>{
   await  page.goto("/dashboard/practice-components")
     let alertMessage = "";
     await page.on("dialog", async dialog=>{
        alertMessage = dialog.message();
        await dialog.accept();
     })
     await page.getByRole("button", { name: "Double Click Me" }).dblclick();
     console.log(alertMessage);
    

})
//test.only only ekta
test("Context Button click", async ({ page }) => {
    await page.goto("/dashboard/practice-components");
    let alertMessage = "";
    await page.on('dialog', async dialog => {
        alertMessage = dialog.message();
        await dialog.accept();
    })
    await page.getByRole("button", { name: "Right Click Me" }).click({button:"right"});
    console.log(alertMessage);
})

//tab handling er jonno context
test("Open New Tab",async({page,context})=>{
     await page.goto("/dashboard/practice-components");
     const newPagePromise=context.waitForEvent("page");
     await page.getByRole("button",{name:"Open New Tab"}).click();
     const newPage=await newPagePromise;
     //ze page open hobe tar jonno wait korte hobe, then save
    await newPage.waitForLoadState();
    console.log(newPage.url());
    expect(newPage.url()).toContain("example.com");
     await newPage.bringToFront();
     // await newPage.close();
    //  await newPage.pause();


})

test("New window handling",async({page,context})=>{
    await page.goto("/dashboard/practice-components");
    const newPagePromise = context.waitForEvent('page');
    await page.getByRole("button", { name: "Open New Window" }).click();
    const newPage = await newPagePromise;
    await newPage.waitForLoadState();
    console.log(newPage.url());
    expect(newPage.url()).toContain("example.com");
   
     await newPage.bringToFront();
     // await newPage.close();
     await newPage.pause();

})
test("Open Modal",async({page})=>{
    await page.goto("/dashboard/practice-components");
     await page.locator(".btn.btn-success").click();
     const modal= await page.getByRole("dialog");
     await expect(modal).toBeVisible();
     const modalText=await modal.textContent();
     console.log(modalText);
    await modal.getByRole("button",{name:"Close"}).nth(0).click();
     await expect(modal).not.toBeVisible();
  
     
})    

test.only("NextJS Datetime input",async({page})=>{
     await page.goto("/dashboard/practice-components");
      const dateTimeElem= await page.locator("[type=datetime-local]");
      await dateTimeElem.fill('2025-08-25T18:30');
      await expect(dateTimeElem).toHaveValue("2025-08-25T18:30");
     

})

test("React DatePicker ReadOnly",async({page})=>{
    await page.goto("/dashboard/practice-components");
    const dateElem= await page.locator("[readonly]").elementHandle();
    await dateElem!.evaluate((el:HTMLInputElement)=>{
        el.removeAttribute("readonly");
        el.value="2026-01-01";
        el.dispatchEvent(new Event("change",{bubbles:true}));
    })
     const value=await dateElem!.getProperty('value');
    console.log(await value.jsonValue());
    // console.log(await dateElem.inputValue());

})
//dateElem! current value , tai not 
//Readonly date input খুঁজে বের করা → DOM element নেওয়া → JavaScript দিয়ে readonly সরানো → value বসানো → change event চালানো → শেষে value verify/read করা।
//el হলো তোমার selected input element।

// page.goto()
    //  ↓
// [readonly] input খুঁজে বের করো
//      ↓
// elementHandle()
//      ↓
// actual DOM element পাওয়া গেল
//      ↓
// evaluate()
//      ↓
// readonly সরাও
//      ↓
// value = "2026-01-01"
//      ↓
// change event dispatch করো
//      ↓
// application-কে জানাও value change হয়েছে
//      ↓
// getProperty("value")
//      ↓
// jsonValue()
//      ↓
// "2026-01-01"

test("React DatePicker",async({page})=>{
    await page.goto("/dashboard/practice-components");
    const reactDatePicker=await page.getByPlaceholder("Select date");
    await reactDatePicker.click();
    await reactDatePicker.fill("08/15/2026");
    await page.keyboard.press("Enter");
    console.log(await reactDatePicker.inputValue());

})
//ekta page er vitore onno page show iframe

test.only("Handle iFrame",async({page})=>{
    await page.goto("/dashboard/practice-components");
    const frame=await page.frameLocator('iframe');
    await frame.getByRole("textbox", { name: "you@example.com" }).fill('admin@test.com');
    await frame.getByRole("textbox", { name: "Enter password" }).fill("1234")
    await frame.getByRole("button", { name: "Login" }).click();
     await page.pause();


})  


    