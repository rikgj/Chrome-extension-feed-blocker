
chrome.storage.sync.get("time_settings", (data) => {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let time_settings = data.time_settings;
  let parent = document.getElementById("container_days");
  let hours = [15,16,17,18,19,20,21,22,23];
  let mins =  [0,15,30,45];
  for (let i in time_settings){
    let checked = "";
    if(time_settings[i][0]){
        checked = "checked";
    }
    let cur_time = time_settings[i][1];
    let cur_day = days[i];
        let hour_min = cur_time.split(":");
    let h_i = hours.indexOf(parseInt(hour_min[0]));
    let m_i = mins.indexOf(parseInt(hour_min[1]));
    let range_val = (h_i + 1)*(m_i + 1)-1;

    let day = "";
    day+="<div class='ct_day'>";
      day+="<div class='adv_info'>";
        day+="<div class=''>";
          day+="<span>"+ cur_day +"</span>";
        day+="</div>";

        day+="<div class='ct_slider_val'>";
        day+="<span id='inp_range-" + i + "_txt'>" + cur_time + "</span>";
        day+="</div>";

        day+="<div class=''>";
          day+="<input id='inp_bool-" + i + "' type='checkbox' name='' value='' " + checked +">";
        day+="</div>";
      day+="</div>";

      day+="<div class='ct_slider'>";
        day+="<input id='inp_range-" + i + "' type='range' min='0' max='35' value='" + range_val + "'>";
      day+="</div>";



    day+="</div>";

    parent.innerHTML+=day;
  }
  // add event listeners
  for (let i in time_settings){
      let r_id = "inp_range-" + i;
      document.getElementById(r_id).addEventListener("change", (evt)=>{
        updateRangeVal(evt);
      });
  }
});

document.getElementById("btn_adv_update").addEventListener("click", ()=>{
  btnUpdate();
});


function btnUpdate(){
  let new_settings = [];
  for(let i=0; i <= 6; i++){
    let time = document.getElementById("inp_range-" + i + "_txt").innerText;
    let block = document.getElementById("inp_bool-" + i).checked;
    let day = [block, time];
    new_settings.push(day);
  }
  chrome.storage.sync.set({time_settings: new_settings});
}

function updateRangeVal(evt){
  let o_id = evt.target.id + "_txt";
  // FIXME: let hours and mins be  calculated with min max value set by background.js for more flexy?
  let hours = [15,16,17,18,19,20,21,22,23];
  let mins =  ["00",15,30,45];
  let val = evt.target.value;
  let hour = Math.floor(val/4);
  hour = hours[hour];
  let min = val%4;
  min = mins[min];
  document.getElementById(o_id).innerText = hour + ":" + min;
}
