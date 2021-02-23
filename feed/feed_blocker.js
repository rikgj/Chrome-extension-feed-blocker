/*
This js code will create a feed blocker to site spesification given in domainInfo, remember to add site in the manifest.
*/
let domainInfo = {
  "facebook":{
    "block_parent":"[role='main']",
  },
  "youtube":{
    "block_parent":"#page-manager > ytd-browse",
  }
}

let domain = document.location.href.split(".")[1];
let info = domainInfo[domain];
let path_length = document.location.pathname.length;
const BLOCK_ID = "feed_blocker";
let block = false;

// sets block if you navigate directly to main site
if(path_length == 1){
  setBlock();
}
document.addEventListener("click", () => { checkPath(); });


function setBlock(){
  // a function that runs until the block parent is detected
  // Setting up the html part to block the feed
  let block_el = document.createElement("DIV");
  block_el.classList = "block " + domain;
  block_el.id = BLOCK_ID;

  setTimeout(()=>{
    let block_parent = document.querySelector(info.block_parent);
    if(block_parent != null){
      // block the feed
      block_parent.appendChild(block_el);

      // set refrence to block element on site
      block = document.getElementById(BLOCK_ID);
    }else{
      setBlock();
    }
  },300);
}

function checkPath(){
  setTimeout(()=>{
    let cur_len = document.location.pathname.length
    if (path_length != cur_len) {
        path_length = cur_len;
        if(path_length == 1){
          // there has been navigation to the main site
          if(!block){
            setBlock();
          }else{
            block.hidden = false;
          }
        }else if (path_length > 1 && block){
          // nav outisde main site and block is set
          block.hidden = true
        }
    }
  }, 500);
}
