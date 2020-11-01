document.addEventListener("DOMContentLoaded", () => {
  let out_time = document.getElementById("out_time");
  let inp_hour = document.getElementById("inp_hour");
  let inp_min = document.getElementById("inp_min");
  let btn = document.getElementById("btn_update");
  let check_weekends = document.getElementById("inp_check_weekends");
  let time_settings;

  // generate options to dropdown elements
  addOption("00", inp_min);

  let i = 15;
  while(i<=60){
    if(i<=23){
      addOption(i, inp_hour);
    }
    if(i%15 == 0){
      addOption(i, inp_min);
    }
    i++;
  }

  chrome.storage.sync.get("time_settings", (data) => {
    time_settings = data.time_settings;
    updateInterface();

    btn.addEventListener("click", () => {
      let min = inp_min.value.toString();
      let hour = inp_hour.value.toString();
      let time_format = hour + ":" + min;

      let i = 1;
      let end = time_settings.length - 1;
      if(check_weekends.checked){
        //include block to weekends
        i--;
        end++;
      }else{
        // set weekend block to false
        time_settings[0][0] = false;
        time_settings[6][0] = false;
      }

      while(i < end){
        time_settings[i][0] = true;
        time_settings[i][1] = time_format;
        i++;
      }

      chrome.storage.sync.set({time_settings: time_settings}, () => {
        updateInterface();
        let out = document.getElementById("update_done");
        out.innerText = "Updated!";
        setTimeout(()=>{
          out.innerText = "";
        },1500);
      });
    });
  });

  function updateInterface(){
    let today = new Date();
    today = today.getDay();
    let output = "Not blocked today";
    if(time_settings[today][0]){
      output = time_settings[today][1];
      let opt_setting = output.split(":")
      inp_hour.value = opt_setting[0];
      inp_min.value = opt_setting[1];
    }
    out_time.innerText = output;

    //check if sun og sat is blocked
    if(time_settings[0][0] || time_settings[6][0]){
      check_weekends.checked = true;
    }else{
      check_weekends.checked = false;
    }
  }

  function addOption(num, parent){
    let opt = document.createElement("option");
    opt.value = num;
    opt.text = num;
    parent.add(opt);
  }
//DOMContentLoaded-end
});
