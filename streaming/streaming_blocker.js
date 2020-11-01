/*
This JS will give a reminder to not look at streaming services during office hours.
*/

chrome.storage.sync.get("time_settings", (data) => {
  let today = new Date();
  today = today.getDay();// 0-6 (sunday - saturday)
  let settings_today = data.time_settings[today];
  let closing_time = settings_today[1];
  if(settings_today[0]){
    let spl = closing_time.split(":");
    let set_hours_end = parseInt(spl[0]);
    let set_min_end = parseInt(spl[1]);

    let set_hours_start = 8;
    let set_min_start = 0;

    let d = new Date();
    let now_hours = d.getHours();
    let now_min = d.getMinutes();

    if(
      (set_hours_start == now_hours && set_min_start > now_min)
      || (set_hours_end == now_hours && set_min_end > now_min)
      || (set_hours_end > now_hours && set_hours_start < now_hours)
      ){
        // we are still in the defined work time
        //creating HTML
        let message = document.createElement("DIV");
        message.classList = "streaming_message";

        let content = document.createElement("DIV");
        content.innerText = "This is not after office hours \n" + "08:00 - " + closing_time;;
        message.appendChild(content);

        let backboard = document.createElement("DIV");
        backboard.classList = "streaming_backboard";

        document.body.appendChild(backboard);
        document.body.appendChild(message);
    } else if (1 < now_hours &&  now_hours < 6){
        // a gentle nudge that it is getting late
        alert("Maybe you should go to bed.");
    } else {
        alert("Feel free to watch!");
    }
  }else{
    console.log(closing_time);
    console.log("do not block today")
  }
});
