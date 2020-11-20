/*
This js code will create a feed blocker to site spesification given in domainInfo, remember to add site in the manifest.
*/
let domainInfo = {
  "facebook":{
    "block_parent":"#mount_0_0 > div > div:nth-child(1) > div.rq0escxv.l9j0dhe7.du4w35lb > div.rq0escxv.l9j0dhe7.du4w35lb > div > div > div.j83agx80.cbu4d94t.d6urw2fd.dp1hu0rb.l9j0dhe7.du4w35lb > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.pfnyh3mw.taijpn5t.gs1a9yip.owycx6da.btwxx1t3.dp1hu0rb.p01isnhg > div > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.g5gj957u.pmt1y7k9.buofh1pr.hpfvmrgz.taijpn5t.gs1a9yip.owycx6da.btwxx1t3.f7vcsfb0.fjf4s8hc.b6rwyo50.oyrvap6t > div",
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
