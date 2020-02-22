function removeAllcookie(cookies,tab,btn) {
    if (cookies.length > 0) {
      for (let cookie of cookies) {
        let removing = browser.cookies.remove({name: cookie.name,url: tab.url,storeId: tab.cookieStoreId})
      }
      btn.innerHTML = "Deleted !!";
    } else {
      btn.innerHTML = "No cookie to delete";
    }
}
function detectcookiesForTab(tabs) {
  //get the first tab object in the array
  let tab = tabs.pop();
  //get all cookies in the domain
  var gettingAllCookies = browser.cookies.getAll({url: tab.url ,storeId: tab.cookieStoreId});
  gettingAllCookies.then((cookies) => {
    var activeTabUrl = document.getElementById('header-title');
    if (cookies.length > 0) {
      var text = document.createTextNode(cookies.length+" Cookies at: "+tab.title);
      var btn = document.createElement("BUTTON");
      btn.innerHTML = "Trash it";
      activeTabUrl.parentNode.appendChild(btn);
      btn.onclick = function() {removeAllcookie(cookies,tab,btn)};
    } else {
      var text = document.createTextNode("No Cookies at: "+tab.title);
    }
    activeTabUrl.appendChild(text);
  });
}
function getActiveTab() {
  return browser.tabs.query({currentWindow: true, active: true});
}
getActiveTab().then(detectcookiesForTab);