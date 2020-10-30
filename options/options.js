document.addEventListener("DOMContentLoaded", () => {
  let textEl = document.getElementById("info");
  let el_hour = document.getElementById("inp_hour");
  let el_min = document.getElementById("inp_min");
  let btn = document.getElementById("btn_update");

  let i = 15;
  let el;
  addOption("00",el_min);

  while(i<=60){
    if(i<=23){
      addOption(i,el_hour)
    }
    if(i%15 == 0){
      addOption(i,el_min);
    }
    i++;
  }

  chrome.storage.sync.get("time", (data) => {
    textEl.innerText = data.time;
  });


  btn.onclick = () => {
    let min = el_min.value.toString();
    let hour = el_hour.value.toString();
    let string = hour + ":" + min;

    chrome.storage.sync.set({time: string}, () => {
      textEl.innerText = string;
    });
  };
});

function addOption(num, parent){
  let opt = document.createElement("option");
  opt.value = num;
  opt.text = num;
  parent.add(opt);
}
