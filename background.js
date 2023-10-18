// event to run execute.js content when extension's button is clicked
chrome.action.onClicked.addListener(execScript);

async function execScript() {
  const tabId = await getTabId();
  const tab = await chrome.tabs.get(tabId);
  const url = tab.url;

  const menu =  /https:\/\/www\.pyszne\.pl\/.*\/?menu/  ;

  const restaurants =   /https:\/\/www\.pyszne\.pl\/.+\/.+\//;
  if (menu.test(url)) {
    chrome.scripting.executeScript({
      target: {tabId: tabId},
      files: ['randomDish.js']
    });
  } else if(restaurants.test(url)){
    chrome.scripting.executeScript({
        target: {tabId: tabId},
        files: ['randomRestaurant.js']
      })
  }
 
}

async function getTabId() {
  const tabs = await chrome.tabs.query({active: true, currentWindow: true});
  return (tabs.length > 0) ? tabs[0].id : null;
}
