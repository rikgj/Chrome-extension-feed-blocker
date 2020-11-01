chrome.runtime.onInstalled.addListener( () => {
  let time_settings = [
    [false, "16:00"],
    [true, "16:00"],
    [true, "16:00"],
    [true, "16:00"],
    [true, "16:00"],
    [true, "16:00"],
    [false, "16:00"]
  ];

  chrome.storage.sync.set({time_settings: time_settings});
});
