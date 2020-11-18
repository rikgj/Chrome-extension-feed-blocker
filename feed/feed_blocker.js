/*
This js code will create a feed blocker to site spesification given in domainInfo, remember to add site in the manifest.
*/
let domainInfo = {
  "facebook":{
    "block_parent":"#mount_0_0 > div > div:nth-child(1) > div.rq0escxv.l9j0dhe7.du4w35lb > div.rq0escxv.l9j0dhe7.du4w35lb > div > div > div.j83agx80.cbu4d94t.d6urw2fd.dp1hu0rb.l9j0dhe7.du4w35lb > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.pfnyh3mw.taijpn5t.gs1a9yip.owycx6da.btwxx1t3.dp1hu0rb.p01isnhg > div > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.g5gj957u.pmt1y7k9.buofh1pr.hpfvmrgz.taijpn5t.gs1a9yip.owycx6da.btwxx1t3.f7vcsfb0.fjf4s8hc.b6rwyo50.oyrvap6t > div",
    "eventListener":"click"
  },
  "youtube":{
    "block_parent":"#page-manager > ytd-browse",
    "eventListener":"yt-navigate-start"
  }
}

let domain = document.location.href.split(".")[1];
let info = domainInfo[domain];
let cur_path = document.location.pathname;
const BLOCK_ID = "feed_blocker";
// Setting up the html part to block the feed
let block = document.createElement("DIV");
block.classList = "block " + domain;
block.id = BLOCK_ID;


function setBlock(){
  // a function that runs until the block parent is detected
  setTimeout(()=>{
    let block_parent = document.querySelector(info.block_parent);
    if(block_parent != null){
      // block the feed
      block_parent.appendChild(block);
      console.log("you just got blocked");
    }else{
      console.log("it was null");
      setBlock();
    }
  },300);
}

function clearBlock(){
  let el = document.getElementById(BLOCK_ID);
  if(el != null){
    el.parentNode.removeChild(el);
    console.log("clearBlock");
  }else{
    console.log("clearBlock null")
  }
}

function checkPath(){
  console.log("click");
  setTimeout(()=>{
    if (cur_path != document.location.pathname) {
        cur_path = document.location.pathname;
        if(cur_path.length == 1){
          // there has been navigation to the main site
          console.log("comapre ok")
          setBlock();
        }else if (cur_path.length > 1){
          clearBlock();
        }
    }
  }, 500);
}


// sets block if you navigate directly
if(cur_path.length == 1){
  setBlock();
}
document.addEventListener("click", () => { checkPath(); });
