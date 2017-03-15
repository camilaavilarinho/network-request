var dry = [];

function logURL(requestDetails) {
  var requestURL = new URL(requestDetails.originUrl).host;
  var thirdParty = new URL(requestDetails.url).host;
  var filterThird = filter(requestURL, thirdParty);
  console.log("Thid party: "+ filterThird);
}

function filter(requestUrl, thirdParty){
  if((requestUrl !== "") && (thirdParty != requestUrl)){
    if(dry.indexOf(thirdParty) == -1){
        dry.push(thirdParty);
    }
  }
  return dry;
}

browser.webRequest.onBeforeRequest.addListener(
  logURL,
  {urls: ["<all_urls>"]}
);
