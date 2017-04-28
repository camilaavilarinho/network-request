var gettingConnection = browser.storage.local.get("connection");
gettingConnection.then(results => {
  if (!results.connection) {
    results = {
      connection: {}
    };
  }

  const{connection} = results
  var output = [];
  function logURL(requestDetails) {
    var data = filter(requestDetails);

    results.connection = data;
    browser.storage.local.set(results);
    //console.log("Results: "+ results.connection);
  }

  function filter(requestDetails){

    //filter data from the connection
    var domain = new URL(requestDetails.originUrl)
    var source = domain.host;
    var target = new URL(requestDetails.url).host;
    var timestamp = requestDetails.timeStamp;
    var contentType = requestDetails.type;
    var cookie = false;
    var secure = (domain.protocol.match(/https/)) ? true : false;
    var sourcePathDepth = getPathDepth(domain.pathname);
    var sourceQueryDepth = getQueryDepth(domain.search);
    var method = requestDetails.method;


    function getPathDepth(path){
      var aux = path.split('/').slice(1,);
      return (aux[aux.length-1]=== "") ? aux.length - 1 : aux.length;
    }

    function getQueryDepth(path){
      var aux = path.split(/;|\&/);
      return (aux.length <= 1) ? aux.length - 1 : aux.length;

    }

    var header = []
    for(var h of requestDetails.requestHeaders){
      //header.push(h.name, h.value);
      //cookies
      if(h.name.toLowerCase() === "cookie"){
        cookie = true;
      }
    }

    output.push([source, target, timestamp, contentType, cookie, secure, sourcePathDepth, sourceQueryDepth, method]);
    return output;

  }



  browser.webRequest.onBeforeSendHeaders.addListener(
    logURL,
    {urls: ["<all_urls>"]},
    ["requestHeaders"]
  );


});
