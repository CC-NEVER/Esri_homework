const { test, expect} = require('@playwright/test');
// require data
const {Hazards,Road,Areas}=require('./data.js')

// page load test
test('Page Load test success', async ({ page }) => {
  await page.on('load', () => console.log('Page loaded!'));
  await page.goto('/javascript/latest/sample-code/widgets-editor-basic/live');
  await page.on('requestfailed', request => {
    console.log(request.url() + ' ' + request.failure().errorText);
  });  
  // status===200
  let flag=true;
  await page.on('response', response => {
    if(response.status()!='200'){
      console.log(response.status(),response.url());
      flag=false;
    }
  });
  //Check whether the page is loaded properly
  if(flag){
    console.log('Page load successfully')
  }else{
    console.log('Some resources did not load successfully');
  }
});

test('Page Load test failed', async ({ page }) => {
  await page.on('load', () => console.log('Page loaded!'));
  await page.goto('/javascript/latest/sample-code/widgets-editor-basi');
  await page.on('requestfailed', request => {
    console.log(request.url() + ' ' + request.failure().errorText);
  });  

  // status===200
  let flag=true;
  await page.on('response', response => {
    if(response.status()!='200'){
      console.log(response.status(),response.url());
      flag=false;}
  });
  //Check whether the page is loaded properly
  if(flag){
    console.log('Page load successfully')
  }else{
    console.log('Some resources did not load successfully');
  }
});

//Feature test
test('Feature test', async ({ page }) => {
  await console.log(Hazards,Road,Areas);
  await page.goto('/javascript/latest/sample-code/widgets-editor-basic/live');
  // Click button:has-text(Hazards.type)
  await page.mouse.wheel(-200,-300);
  await page.locator('button:has-text("'+Hazards.type+'")').click();
  // Click canvas
  await page.click('div[role="application"]',Option={position:{x:Hazards.position.x,y:Hazards.position.y}})
  // Click text=Description >> input[type="text"]
  await page.locator('text=Description >> input[type="text"]').fill(Hazards.description);
  await page.locator('[aria-label="SpecialInstructions"]').click();
  await page.locator('span:has-text("'+Hazards.instructions+'")').click();;
  await page.locator('text=ActiveClosedPendingStatusActiveActiveClosedPending >> svg').click();
  await page.locator('span:has-text("'+Hazards.status+'")').click();
  await page.locator('[aria-label="Priority"]').click();
  await page.locator('span:has-text("'+Hazards.priority+'")').click();
  await page.locator('button:has-text("Create")').click();
  await page.locator('text=BackPlace feature >> button').click();

  //expect test
  await page.click('div[role="application"]',Option={position:{x:Hazards.position.x,y:Hazards.position.y}})
  await expect.soft(page.locator('tr:nth-child(1) .esri-feature-fields__field-data')).toHaveText(Hazards.type);
  await expect.soft(page.locator('tr:nth-child(2) .esri-feature-fields__field-data')).toHaveText(Hazards.description);
  await expect.soft(page.locator('tr:nth-child(3) .esri-feature-fields__field-data')).toHaveText(Hazards.instructions);
  await expect.soft(page.locator('tr:nth-child(4) .esri-feature-fields__field-data')).toHaveText(Hazards.status);
  await expect.soft(page.locator('tr:nth-child(5) .esri-feature-fields__field-data')).toHaveText(Hazards.priority);
});


//Road Closure test
test('Road Closure test', async ({ page }) => {
  await page.goto('https://developers.arcgis.com/javascript/latest/sample-code/widgets-editor-basic/live/');
  await page.mouse.wheel(-200,-300);
  await page.click('button:has-text("'+Road.type+'")');
  //Choose points
  let len=Road.point.pointX.length;
  for(let i=0;i<len-1;i++){
    await page.click('div[role="application"]',Option={position:{x:Road.point.pointX[i],y:Road.point.pointY[i]}})
  }
  await page.dblclick('div[role="application"]',Option={position:{x:Road.point.pointX[len-1],y:Road.point.pointY[len-1]}})
  await page.locator('[aria-label="Severity"]').click();
  await page.locator('span:has-text("'+Road.severity+'")').click();
  await page.locator('[aria-label="blocktype"]').click();
  await page.locator('span:has-text("'+Road.blockage+'")').click();
  await page.locator('[aria-label="active"]').click();
  if(Road.active==='Yes'){
    await page.locator('span:has-text("Yes")').click();
  }else{
    await page.locator('span:has-text("No")').nth(2).click();
  }
  await page.locator('text=Location Description >> input[type="text"]').fill(Road.description);
  await page.locator('button:has-text("Create")').click();
  await page.locator('text=BackPlace feature >> button').click();
  //expect test
  await page.click('div[role="application"]',Option={position:{x:Road.point.pointX[0],y:Road.point.pointY[0]}})
  await expect.soft(page.locator('tr:nth-child(1) .esri-feature-fields__field-data')).toHaveText(Road.description);
  await expect.soft(page.locator('tr:nth-child(2) .esri-feature-fields__field-data')).toHaveText(Road.blockage);
  await expect.soft(page.locator('tr:nth-child(7) .esri-feature-fields__field-data')).toHaveText(Road.active);
  await expect.soft(page.locator('tr:nth-child(9) .esri-feature-fields__field-data')).toHaveText(Road.severity);
})


// Areas test
test('Areas test', async ({ page }) => {
  await page.goto('https://developers.arcgis.com/javascript/latest/sample-code/widgets-editor-basic/live/');
  await page.mouse.wheel(-200,-300);
  await page.click('button:has-text("'+Areas.type+'")');
  //Choose points
  let len=Areas.point.pointX.length;
  for(let i=0;i<len-1;i++){
    await page.click('div[role="application"]',Option={position:{x:Areas.point.pointX[i],y:Areas.point.pointY[i]}})
  }
  await page.dblclick('div[role="application"]',Option={position:{x:Areas.point.pointX[len-1],y:Areas.point.pointY[len-1]}})
  // Click [aria-label="incidenttype"]
  await page.locator('[aria-label="incidenttype"]').click();
  await page.locator('span:has-text("'+Areas.incident+'")').first().click();
  await page.locator('[aria-label="activeincid"]').click();
  if(Areas.active==='Yes'){
    await page.locator('li:has-text("Yes")').nth(1).click();
  }else{
    await page.locator('span:has-text("No")').nth(2).click();
  }
  await page.locator('text=Description >> input[type="text"]').fill(Areas.description);
  await page.locator('button:has-text("Create")').click();
  await page.locator('text=BackPlace feature >> button').click();

  //expect test
  await page.click('div[role="application"]',Option={position:{x:Areas.point.pointX[0],y:Areas.point.pointY[0]}})
  await expect.soft(page.locator('tr:nth-child(2) .esri-feature-fields__field-data')).toHaveText(Areas.description);
  await expect.soft(page.locator('tr:nth-child(6) .esri-feature-fields__field-data')).toHaveText(Areas.incident);
  await expect.soft(page.locator('tr:nth-child(4) .esri-feature-fields__field-data')).toHaveText(Areas.active);
})