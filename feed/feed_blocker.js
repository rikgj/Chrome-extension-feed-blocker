/*
This js code will create a feed blocker to site spesification given in domainInfo, remember to add site in the manifest.
*/
let domainInfo = {
  "facebook":{
    "block_parent":"#mount_0_0 > div > div:nth-child(1) > div.rq0escxv.l9j0dhe7.du4w35lb > div.rq0escxv.l9j0dhe7.du4w35lb > div > div > div.j83agx80.cbu4d94t.d6urw2fd.dp1hu0rb.l9j0dhe7.du4w35lb > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.pfnyh3mw.taijpn5t.gs1a9yip.owycx6da.btwxx1t3.dp1hu0rb.p01isnhg > div > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.g5gj957u.pmt1y7k9.buofh1pr.hpfvmrgz.taijpn5t.gs1a9yip.owycx6da.btwxx1t3.f7vcsfb0.fjf4s8hc.b6rwyo50.oyrvap6t > div",
    "listener_target":"#mount_0_0 > div > div:nth-child(1) > div.rq0escxv.l9j0dhe7.du4w35lb > div:nth-child(4) > div.bp9cbjyn.rq0escxv.j83agx80.buofh1pr.byvelhso.dhix69tm.poy2od1o.j9ispegn.kr520xx4.ehxjyohh",
    "eventListener":"mousedown"
  },
  "youtube":{
    "block_parent":"#page-manager > ytd-browse",
    "listener_target":"body > ytd-app > yt-page-navigation-progress",
    "eventListener":"NOT USED",
    "observer":true,
    "observe_attribute":"hidden"
  }
}

// FIXME: the function should probably not rely on a timer setup

let domain = window.location.href.split(".")[1];

// Setting up the html part to block the feed
let block = document.createElement("DIV");
block.classList = "block " + domain;
block.id = "feed_blocker";

initiate();

function set_block(target){
  target.appendChild(block);
}

function initiate(){
  // I use a timer-method so that i can check that the nescessery elements are
  // present, event though the script is set to run at document_end in the manifest


  let info = domainInfo[domain];
  setTimeout(()=>{
    let listener_target = document.querySelector(info.listener_target);
    let block_parent = document.querySelector(info.block_parent);
    if(listener_target != null && block_parent != null){
      // block the feed
      set_block(block_parent);

      // register listener to update block
      switch (info.observer) {
        case true:
          // Create an observer with callback function
          let observer = new MutationObserver((mutationsList, observer) => {
            for(let mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName == info.observe_attribute) {
                      set_block(block_parent)
                }
            }
          });

          // Start observing
          observer.observe(listener_target, {attributes: true});
          break;
        default:
          listener_target.addEventListener(info.eventListener,()=>{set_block(block_parent)});
          console.log("default");
      }

    } else {
        console.log("This is not a very good solution");
        initiate();
    }
  },400);
}
