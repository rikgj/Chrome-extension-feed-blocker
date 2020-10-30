chrome.runtime.onInstalled.addListener( () => {
  console.log("outer - background.js")
  chrome.storage.sync.set({time: "16:00"}, () => {
    console.log("inner - background.js");
  });
});
