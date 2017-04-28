var gettingConnection = browser.storage.local.get("connection");
gettingConnection.then(results => {
  if (!results.connection) {
    return;
  }

  const{connection} = results;

  const data = connection;

  let listEl = document.querySelector("ul");
  while(listEl.firstChild)
    listEl.removeChild(listEl.firstChild);

  for (let i=0; i < data.length; i++){
    const listItem = document.createElement("li");
    const request = data[i];
    listItem.textContent = `${request}`;
    listEl.appendChild(listItem);
  }

});
