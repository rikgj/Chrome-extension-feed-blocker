/*
This js code will create a feed blocker to site spesification given in domainInfo, remember to add site in the manifest.
*/

let domainInfo = {
  "facebook":{
    "block_parent":"#mount_0_0 > div > div:nth-child(1) > div.rq0escxv.l9j0dhe7.du4w35lb > div.rq0escxv.l9j0dhe7.du4w35lb > div > div > div.j83agx80.cbu4d94t.d6urw2fd.dp1hu0rb.l9j0dhe7.du4w35lb > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.pfnyh3mw.taijpn5t.gs1a9yip.owycx6da.btwxx1t3.dp1hu0rb.p01isnhg > div > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.g5gj957u.pmt1y7k9.buofh1pr.hpfvmrgz.taijpn5t.gs1a9yip.owycx6da.btwxx1t3.f7vcsfb0.fjf4s8hc.b6rwyo50.oyrvap6t > div",
    "listener_parent":"#mount_0_0 > div > div:nth-child(1) > div.rq0escxv.l9j0dhe7.du4w35lb > div:nth-child(4) > div.bp9cbjyn.rq0escxv.j83agx80.buofh1pr.byvelhso.dhix69tm.poy2od1o.j9ispegn.kr520xx4.ehxjyohh",
    "eventListener":"mousedown"
  },
  "youtube":{
    "block_parent":"#page-manager > ytd-browse",
    "listener_parent":"body > ytd-app",
    "eventListener":"yt-navigate-finish"
  }
}

let domain = window.location.href.split(".")[1];

// Setting up the html part to block the feed
let block = document.createElement("DIV");
block.classList = "block " + domain;
block.id = "feed_blocker";

initiate();
function initiate(){
  console.log("init");
  // i use a timer-method because window.onload or DOMContentLoaded has not been reliable
  setTimeout(()=>{
    let el = document.querySelector(domainInfo[domain].listener_parent);
    if(el != null){
      set_block();
      el.addEventListener(domainInfo[domain].eventListener,()=>{set_block()});
    }else{
      initiate();
    }
  },200);
}
// FIXME: check both elements in one interval
function set_block(){
  console.log("set block");
  setTimeout(()=>{
    let el = document.querySelector(domainInfo[domain].block_parent);
    if(el!=null){
      el.appendChild(block);
    }else{
      set_block();
    }
  },200);
}
