function isMtChk(dx){ return (dx != "") ?  dx : "null"; }
function gkuke(cnm){if(document.cookie.length>0){cst=document.cookie.indexOf(cnm+"=");if(cst!=-1){cst=cst+cnm.length+1;c_end=document.cookie.indexOf(";",cst);if(c_end==-1){c_end=document.cookie.length}
return unescape(document.cookie.substring(cst,c_end))}}
return""}
function gen_kbid(){return'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=Math.random()*16|0,v=c=='x'?r:(r&0x3|0x8);return v.toString(16)})}
var dt = new Date();
dt = dt.getDate()+"/"+(dt.getMonth()+1)+"/"+dt.getFullYear()+" "+dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds();
var kbid = "";
if(document.cookie.indexOf('kbid') > -1) {kbid = isMtChk(gkuke("kbid")); if(kbid == "kbid") { kbid = gen_kbid(); document.cookie = "kbid="+kbid+"; expires=Fri, 31 Jan 2038  23:59:59 GMT"; } } else {kbid = gen_kbid();	document.cookie = "kbid="+kbid+"; expires=Fri, 31 Jan 2038  23:59:59 GMT";}
var ep = "https://68mda39k2i.execute-api.ap-southeast-1.amazonaws.com/DynamoTest/putdata";
var bn = (document.location.hostname).replace("www.", "").replace(".com", "").replace(".in", "");
if(bn.indexOf("dev") == "-1" && bn.indexOf("author") == "-1" && bn.indexOf("ecom") == "-1"){
bn = (bn == "architecturaldigest") ? 'ad' : (bn == "cntraveller") ? 'cnt' : (bn == "gqindia") ? 'gq' : (bn == "vogue") ? 'vogue' : bn;
var brn = "Unknown", osn="Unknown";
if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) { brn = 'Opera'; }
else if(navigator.userAgent.indexOf("Chrome") != -1 ) { brn = 'Chrome'; }
else if(navigator.userAgent.indexOf("Safari") != -1) { brn = 'Safari'; }
else if(navigator.userAgent.indexOf("Firefox") != -1 ) { brn = 'Firefox'; }
else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) { brn = 'IE'; }
if (navigator.userAgent.indexOf("CriOS")!=-1) brn="Chrome iOS";
        
if (navigator.appVersion.indexOf("Win")!=-1) osn="Windows";
if (navigator.appVersion.indexOf("Mac")!=-1) osn="MacOS";
if (navigator.appVersion.indexOf("iPhone")!=-1) osn="iPhone";
if (navigator.appVersion.indexOf("X11")!=-1) osn="UNIX";
if (navigator.appVersion.indexOf("Linux")!=-1) osn="Linux";
var useragent = brn+' | '+osn;
var cn_bidx = "";
if(gkuke("cn_bid") == "" || gkuke("cn_bid") == "null") { cn_bidx = gkuke("kbid"); document.cookie = "cn_bid="+cn_bidx+"; expires=Fri, 31 Jan 2038  23:59:59 GMT"; } else { cn_bidx = gkuke("cn_bid") }
var cdata = '{ "cn_bid" : "'+isMtChk(cn_bidx)+'" , "cn_country": "'+isMtChk(gkuke("cn_country"))+'" , "ga": "'+isMtChk(gkuke("_ga"))+'" , "radius_login_uid": "'+isMtChk(gkuke("radius_login_uid"))+'", "cn_eid": "'+isMtChk(gkuke("cn_eid"))+'", "dt": "'+dt+'", "brand": "'+isMtChk(bn)+'", "useragent": "'+isMtChk(useragent)+'", "kbid": "'+isMtChk(kbid)+'" }';
 var xhr = new XMLHttpRequest();
 xhr.open('POST',ep , true);
 xhr.setRequestHeader("Content-Type", "application/json");
 xhr.onload = function () {
 };
 xhr.send(cdata);
 }
