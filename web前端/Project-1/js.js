/**
 * Created by wangrentian on 2017/3/14.
 */
/*通用函数开始*/
function addLoadEvent(func) {
    var oldfunc=window.onload;
    if(typeof oldfunc!="function"){
        window.onload=func;
    }else{
        window.onload=function(){
            oldfunc();
            func();
        }
    }
}
function movement(target,xpos,ypos,interval){
    var ele=document.getElementById(target);
    if(ele.move){
        clearTimeout(ele.move);
    }
    if(!ele.style.left){
        ele.style.left="0px";
    }
    if(!ele.style.top){
        ele.style.top="0px"
    }
    var xp=parseInt(ele.style.left);
    var yp=parseInt(ele.style.top);
    if(xp==xpos&&yp==ypos){
        return true;
    }
    if(xp<xpos){
        var dis=Math.ceil((xpos-xp)/10);
        xp+=dis;
    }
    if(xp>xpos){
        var dis=Math.ceil((xp-xpos)/10);
        xp-=dis;
    }
    if(yp<ypos){
        var dis=Math.ceil((ypos-yp)/10);
        yp+=dis;
    }
    if(yp>ypos){
        var dis=Math.ceil((yp-ypos)/10);
        yp-=dis;
    }
    ele.style.left=xp+"px";
    ele.style.top=yp+"px";
    ele.move=setTimeout("movement('"+target+"',"+xpos+","+ypos+","+interval+")",interval);
}
function insertAfter(newElement,target){
    var par=target.parentNode;
    if(par.lastChild==target){
        par.appendChild(newElement);
    }else{
        par.insertBefore(newElement,target.nextSibling)
    }
}
function showHighLight(){
    if(!document.getElementsByTagName) return false;
    var nav=document.getElementsByTagName("nav");
    var nava=nav[0].getElementsByTagName("a");
    for(var i=0;i<nava.length;i++){
        var href=nava[i].getAttribute("href");
        if(window.location.href.indexOf(href)!=-1){
            nava[i].className="here";
            document.getElementsByTagName("body")[0].setAttribute("id",nava[i].lastChild.nodeValue.toLowerCase())
        }
    }
}
addLoadEvent(showHighLight);
/*通用函数结束*/
/*Home部分开始*/
function disp() {
    if(!document.getElementById("desc")) return false;
    var placerhold=document.createElement("img");
    var div=document.createElement("div");
    var frame=document.createElement("img");
    placerhold.setAttribute("src","images/slideshow.gif");
    placerhold.setAttribute("alt","slideshow");
    placerhold.setAttribute("id","img");
    div.setAttribute("id","place");
    div.appendChild(placerhold);
    frame.setAttribute("src","images/frame.gif");
    frame.setAttribute("id","frame");
    div.appendChild(frame);
    insertAfter(div,document.getElementById("desc"));
    var link=document.getElementById("home");
    var linkurl=link.getElementsByTagName("a");
    for(var i=0;i<linkurl.length;i++) {
    linkurl[i].onmouseover=function(){
    var url=this.getAttribute("href");
    if(url.indexOf("Home.html")!=-1){
        movement("img",0,0,1);
    }
    if(url.indexOf("About.html")!=-1){
            movement("img",-300,0,1);
        }
    if(url.indexOf("Photo.html")!=-1){
            movement("img",-450,0,1);
        }
    if(url.indexOf("Live.html")!=-1){
            movement("img",-600,0,1);
        }
    if(url.indexOf("Contact.html")!=-1){
            movement("img",-150,0,1);
        }
    }
    }
}
addLoadEvent(disp);
/*Home部分结束*/
/*About部分开始*/
function showSect(element){
    if(!document.getElementsByTagName) return false;
    var sect=document.getElementsByTagName("section");
    for(var i=0;i<sect.length;i++){
        if(sect[i].getAttribute("id")==element){
            sect[i].style.display="block";
        }else{
            sect[i].style.display="none";
        }
    }
}
function showWhich() {
    if(!document.getElementById("about")) return false;
    var bo=document.getElementById("about");
     var link=bo.getElementsByTagName("a");
    for(var i=0;i<link.length;i++){
         var tit=link[i].getAttribute("href").split("#")[1];
         if(!tit) continue;
        document.getElementById(tit).style.display="none";
        link[i].val=tit;
        link[i].onclick=function(){
            showSect(this.val);
        }
    }}
addLoadEvent(showWhich);
/*About部分结束*/
/*Photos部分开始*/
function photo(){
    if(!document.getElementById("photos")) return false;
    var li=document.getElementById("pho");
    var link=li.getElementsByTagName("a");
    var tit=document.getElementById("text");
    var pla=document.getElementById("place");
    for(var i=0;i<link.length;i++){
        link[i].onclick=function(){
            var al=this.getAttribute("title");
            var url=this.getAttribute("href");
            tit.lastChild.nodeValue=al;
            pla.setAttribute("src",url);
            return false;
        }
    }
}
addLoadEvent(photo);
/*Photos部分结束*/
/*Live部分开始*/
function displayabbr(){
    if(!document.getElementById("live")) return false;
    var bo=document.getElementById("live");
    var link=bo.getElementsByTagName("abbr");
    var list=document.createElement("dl");
    var tb=document.getElementsByTagName("table");
    var abbr=document.createElement("h2");
    abbr.innerHTML="Abbreviations";
    insertAfter(abbr,tb[0]);
    insertAfter(list,abbr);
    for(var i=0; i<link.length;i++){
        var tit=link[i].getAttribute("title");
        var text=link[i].lastChild.nodeValue;
        var listdt=document.createElement("dt");
        var listdd=document.createElement("dd");
        listdt.innerHTML=text;
        listdd.innerHTML=tit;
        list.appendChild(listdt);
        list.appendChild(listdd);
    }
}
addLoadEvent(displayabbr);
/*Live部分结束*/
/*Contact部分开始*/
function labelFocus(){
    if(document.getElementById("contact")) return false;
    var bo=document.getElementById("contact");
    var link=bo.getElementsByTagName("label");
    for(var i=0;i<link.length;i++){
        if(!link[i].getAttribute("for")) continue;
        link[i].onclick=function(){
            var element=document.getElementById(this.getAttribute("for"));
            if(!element) return false;
            element.focus();
        }
    }
}
addLoadEvent(labelFocus);
function isFilled(element){
    if(!element.value.replace(" ","")) return false;
    var place=element.getAttribute("placeholder");
    return (element.value!=place);
}
function isEmail(element){
    return (element.value.indexOf("@")!=-1&&element.value.indexOf(".")!=-1);
}
function checkForm(which){
    for(var i=0;i<which.elements.length;i++){
        var txt=which.elements[i];
        if(txt.type=="submit") continue;
        if(!isFilled(txt)){
            alert("Please finish the "+txt.name+"!");
            return false;
        }
        if(txt.type=="email"){
            if(!isEmail(txt)){
                alert("Please input the right "+txt.name+"!");
                return false;
            }
        }
    }
    return true;
    //不可以放进循环内，否则只要一次循环实现，则就提出TRUE，导致表单提交，也可以不加
}
function form(){
    var link=document.getElementsByTagName("form");
    for(var i=0;i<link.length;i++){
        link[i].onsubmit=function(){
          return checkForm(this);
           //通过return来判断是否提交表单
        }
    }
}
addLoadEvent(form);
/*Contact部分结束*/
