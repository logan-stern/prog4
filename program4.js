// See license: https://github.com/erkie/erkie.github.com/blob/master/README

(function(){function Asteroids(){function destroy(){clearInterval(interval);removeEvent(document,"keydown",eventKeydown);removeEvent(document,"keypress",eventKeypress);removeEvent(document,"keyup",eventKeyup);removeEvent(window,"resize",eventResize);isRunning=false;removeStylesheet("ASTEROIDSYEAHSTYLES");removeClass(document.body,"ASTEROIDSYEAH");if(this.highscores)this.highscores.hide();this.gameContainer.parentNode.removeChild(this.gameContainer);this.appstore.parentNode.removeChild(this.appstore)}function removeStylesheet(a){var b=document.getElementById(a);if(b){b.parentNode.removeChild(b)}}function addStylesheet(a,b){var c=document.createElement("style");c.type="text/css";c.rel="stylesheet";c.id="ASTEROIDSYEAHSTYLES";try{c.innerHTML=a+"{"+b+"}"}catch(d){c.styleSheet.addRule(a,b)}document.getElementsByTagName("head")[0].appendChild(c)}function removeClass(a,b){a.className=a.className.replace(new RegExp("(^|\\s)"+b+"(?:\\s|$)"),"$1")}function addClass(a,b){if(a.className.indexOf(b)==-1)a.className=(a.className+" "+b).replace(/\s+/g," ").replace(/^\s+|\s+$/g,"")}function indexOf(a,b,c){if(a.indexOf)return a.indexOf(b,c);var d=a.length;for(var e=c<0?Math.max(0,d+c):c||0;e<d;e++){if(a[e]===b)return e}return-1}function hasOnlyTextualChildren(a){if(a.offsetLeft<-100&&a.offsetWidth>0&&a.offsetHeight>0)return false;if(indexOf(hiddenTypes,a.tagName)!=-1)return true;if(a.offsetWidth==0&&a.offsetHeight==0)return false;for(var b=0;b<a.childNodes.length;b++){if(indexOf(hiddenTypes,a.childNodes[b].tagName)==-1&&a.childNodes[b].childNodes.length!=0)return false}return true}function setScore(){that.points.innerHTML=window.ASTEROIDS.enemiesKilled*10}function addParticles(a){var b=(new Date).getTime();var c=maxParticles;for(var d=0;d<c;d++){that.particles.push({dir:(new Vector(Math.random()*20-10,Math.random()*20-10)).normalize(),pos:a.cp(),cameAlive:b})}}function getElementFromPoint(a,b){applyVisibility("hidden");var c=document.elementFromPoint(a,b);if(!c){applyVisibility("visible");return false}if(c.nodeType==3)c=c.parentNode;applyVisibility("visible");return c}function applyVisibility(a){for(var b=0,c;c=window.ASTEROIDSPLAYERS[b];b++){c.gameContainer.style.visibility=a}}function arrayRemove(a,b,c){var d=a.slice((c||b)+1||a.length);a.length=b<0?a.length+b:b;return a.push.apply(a,d)}function removeEvent(a,b,c){if(a.removeEventListener)a.removeEventListener(b,c,false);else if(a.detachEvent){a.detachEvent("on"+b,a[b+c]);a[b+c]=null;a["e"+b+c]=null}}function addEvent(a,b,c){if(a.addEventListener)a.addEventListener(b,c,false);else if(a.attachEvent){a["e"+b+c]=c;a[b+c]=function(){a["e"+b+c](window.event)};a.attachEvent("on"+b,a[b+c])}}function size(a){var b=a,c=0,d=0;do{c+=b.offsetLeft||0;d+=b.offsetTop||0;b=b.offsetParent}while(b);return{x:c,y:d,width:a.offsetWidth||10,height:a.offsetHeight||10}}function boundsCheck(a){if(a.x>w)a.x=0;else if(a.x<0)a.x=w;if(a.y>h)a.y=0;else if(a.y<0)a.y=h}function code(a){var b={up:38,down:40,left:37,right:39,esc:27};if(b[a])return b[a];return a.charCodeAt(0)}function random(a,b){return Math.floor(Math.random()*(b+1)+a)}function degrees(a){return a*57.2957795}function radians(a){return a*.0174532925}function updateEnemyIndex(){for(var a=0,b;b=that.enemies[a];a++)removeClass(b,"ASTEROIDSYEAHENEMY");var c=document.body.getElementsByTagName("*");that.enemies=[];for(var a=0,d;d=c[a];a++){if(indexOf(ignoredTypes,d.tagName.toUpperCase())==-1&&d.prefix!="g_vml_"&&hasOnlyTextualChildren(d)&&d.className!="ASTEROIDSYEAH"&&d.offsetHeight>0){d.aSize=size(d);that.enemies.push(d);addClass(d,"ASTEROIDSYEAHENEMY");if(!d.aAdded){d.aAdded=true;that.totalEnemies++}}}}function Highscores(){}function Line(a,b){this.p1=a;this.p2=b}function Vector(a,b){if(typeof a=="Object"){this.x=a.x;this.y=a.y}else{this.x=a;this.y=b}}if(!window.ASTEROIDS)window.ASTEROIDS={enemiesKilled:0,startedPlaying:(new Date).getTime()};var BASEPATH="http://kickassapp.com/";Vector.prototype={cp:function(){return new Vector(this.x,this.y)},mul:function(a){this.x*=a;this.y*=a;return this},mulNew:function(a){return new Vector(this.x*a,this.y*a)},add:function(a){this.x+=a.x;this.y+=a.y;return this},addNew:function(a){return new Vector(this.x+a.x,this.y+a.y)},sub:function(a){this.x-=a.x;this.y-=a.y;return this},subNew:function(a){return new Vector(this.x-a.x,this.y-a.y)},rotate:function(a){var b=this.x,c=this.y;this.x=b*Math.cos(a)-Math.sin(a)*c;this.y=b*Math.sin(a)+Math.cos(a)*c;return this},rotateNew:function(a){return this.cp().rotate(a)},setAngle:function(a){var b=this.len();this.x=Math.cos(a)*b;this.y=Math.sin(a)*b;return this},setAngleNew:function(a){return this.cp().setAngle(a)},setLength:function(a){var b=this.len();if(b)this.mul(a/b);else this.x=this.y=a;return this},setLengthNew:function(a){return this.cp().setLength(a)},normalize:function(){var a=this.len();this.x/=a;this.y/=a;return this},normalizeNew:function(){return this.cp().normalize()},angle:function(){return Math.atan2(this.y,this.x)},collidesWith:function(a){return this.x>a.x&&this.y>a.y&&this.x<a.x+a.width&&this.y<a.y+a.height},len:function(){var a=Math.sqrt(this.x*this.x+this.y*this.y);if(a<.005&&a>-.005)return 0;return a},is:function(a){return typeof a=="object"&&this.x==a.x&&this.y==a.y},toString:function(){return"[Vector("+this.x+", "+this.y+") angle: "+this.angle()+", length: "+this.len()+"]"}};Line.prototype={shift:function(a){this.p1.add(a);this.p2.add(a)},intersectsWithRect:function(a){var b=new Vector(a.x,a.y+a.height);var c=new Vector(a.x,a.y);var d=new Vector(a.x+a.width,a.y+a.height);var e=new Vector(a.x+a.width,a.y);if(this.p1.x>b.x&&this.p1.x<e.x&&this.p1.y<b.y&&this.p1.y>e.y&&this.p2.x>b.x&&this.p2.x<e.x&&this.p2.y<b.y&&this.p2.y>e.y)return true;if(this.intersectsLine(new Line(c,b)))return true;if(this.intersectsLine(new Line(b,d)))return true;if(this.intersectsLine(new Line(c,e)))return true;if(this.intersectsLine(new Line(e,d)))return true;return false},intersectsLine:function(a){var b=this.p1,c=this.p2;var d=a.p1,e=a.p2;var f=(e.y-d.y)*(c.x-b.x)-(e.x-d.x)*(c.y-b.y);var g=(e.x-d.x)*(b.y-d.y)-(e.y-d.y)*(b.x-d.x);var h=(c.x-b.x)*(b.y-d.y)-(c.y-b.y)*(b.x-d.x);if(f==0){return false}var i=g/f;var j=h/f;return i>=0&&i<=1&&j>=0&&j<=1}};Highscores.prototype={build:function(){var self=this;var w=document.clientWidth||window.innerWidth||document.documentElement.clientWidth;var h=document.clientHeight||window.innerHeight||document.documentElement.clientHeight;this.container=document.createElement("div");this.container.className="ASTEROIDSYEAH";with(this.container.style){position="fixed";top=parseInt(h/2-250,10)+"px";left=parseInt(w/2-250,10)+"px";width="500px";height="500px";boxShadow=MsBoxShadow=OBoxShadow=MozBoxShadow=WebkitBoxShadow="0 0 25px #000";zIndex="1000002";background="#222"}document.body.appendChild(this.container);this.iframe=document.createElement("iframe");this.iframe.className="ASTEROIDSYEAH";this.iframe.width=this.iframe.height=500;this.iframe.frameBorder=0;this.container.appendChild(this.iframe);this.close=document.createElement("a");this.close.href="#";this.close.onclick=function(){self.hide();return false};this.close.innerHTML="X";with(this.close.style){position="absolute";display="block";padding="2px 6px";top="-12px";right="-12px";background="#222";border="3px solid #fff";boxShadow="1px 1px 5px #000";color="#fff";textAlign="center";borderRadius="24px";outline="none";textDecoration="none";fontFamily="Verdana";fontSize="16px";fontWeight="bold";zIndex="10003"}this.container.appendChild(this.close);this.hide();document.body.appendChild(this.container)},show:function(){this.build();this.container.style.display="block";var a=this;setTimeout(function(){},50);this.sendScore()},hide:function(){if(this.container&&this.container.parentNode)this.container.parentNode.removeChild(this.container)},sendScore:function(){var a=(new Date).getTime()-window.ASTEROIDS.startedPlaying;this.iframe.src=highscoreURL+"?asd="+(window.ASTEROIDS.enemiesKilled*10).toString()+"&sad="+escape(document.location.href)+"&das="+a}};var that=this;var isIE=!!window.ActiveXObject;var isIEQuirks=isIE&&document.compatMode=="BackCompat";var w=document.documentElement.clientWidth,h=document.documentElement.clientHeight;if(isIEQuirks){w=document.body.clientWidth;h=document.body.clientHeight}var playerWidth=20,playerHeight=30;var playerVerts=[[-1*playerHeight/2,-1*playerWidth/2],[-1*playerHeight/2,playerWidth/2],[playerHeight/2,0]];var ignoredTypes=["HTML","HEAD","BODY","SCRIPT","TITLE","META","STYLE","LINK"];if(window.ActiveXObject)ignoredTypes=["HTML","HEAD","BODY","SCRIPT","TITLE","META","STYLE","LINK","SHAPE","LINE","GROUP","IMAGE","STROKE","FILL","SKEW","PATH","TEXTPATH","INS"];var hiddenTypes=["BR","HR"];var FPS=50;var acc=300;var maxSpeed=600;var rotSpeed=360;var bulletSpeed=700;var particleSpeed=400;var timeBetweenFire=150;var timeBetweenBlink=250;var timeBetweenEnemyUpdate=isIE?1e4:2e3;var bulletRadius=2;var maxParticles=isIE?20:40;var maxBullets=isIE?10:20;var highscoreURL=BASEPATH+"highscores/";this.flame={r:[],y:[]};this.toggleBlinkStyle=function(){if(this.updated.blink.isActive){removeClass(document.body,"ASTEROIDSBLINK")}else{addClass(document.body,"ASTEROIDSBLINK")}this.updated.blink.isActive=!this.updated.blink.isActive};addStylesheet(".ASTEROIDSBLINK .ASTEROIDSYEAHENEMY","outline: 2px dotted red;");this.pos=new Vector(100,100);this.lastPos=false;this.vel=new Vector(0,0);this.dir=new Vector(0,1);this.keysPressed={};this.firedAt=false;this.updated={enemies:false,flame:(new Date).getTime(),blink:{time:0,isActive:false}};this.scrollPos=new Vector(0,0);this.bullets=[];this.enemies=[];this.dying=[];this.totalEnemies=0;this.particles=[];updateEnemyIndex();var createFlames;(function(){var a=playerWidth,b=playerWidth*.1,c=playerWidth*.6,d=c*.2,e=a/2,f=c/2,g=playerHeight/2;createFlames=function(){that.flame.r=[[-1*g,-1*e]];that.flame.y=[[-1*g,-1*f]];for(var h=0;h<a;h+=b){that.flame.r.push([-random(2,7)-g,h-e])}that.flame.r.push([-1*g,e]);for(var h=0;h<c;h+=d){that.flame.y.push([-random(2,7)-g,h-f])}that.flame.y.push([-1*g,f])}})();createFlames();this.gameContainer=document.createElement("div");this.gameContainer.className="ASTEROIDSYEAH";document.body.appendChild(this.gameContainer);this.canvas=document.createElement("canvas");this.canvas.setAttribute("width",w);this.canvas.setAttribute("height",h);this.canvas.className="ASTEROIDSYEAH";with(this.canvas.style){width=w+"px";height=h+"px";position="fixed";top="0px";left="0px";bottom="0px";right="0px";zIndex="10000"}if(typeof G_vmlCanvasManager!="undefined"){this.canvas=G_vmlCanvasManager.initElement(this.canvas);if(!this.canvas.getContext){alert("So... you're using IE?  Please join me at http://github.com/erkie/erkie.github.com if you think you can help")}}else{if(!this.canvas.getContext){alert("This program does not yet support your browser. Please join me at http://github.com/erkie/erkie.github.com if you think you can help")}}addEvent(this.canvas,"mousedown",function(a){a=a||window.event;var b=document.createElement("span");b.style.position="absolute";b.style.border="1px solid #999";b.style.background="white";b.style.color="black";b.innerHTML="Press Esc to quit";document.body.appendChild(b);var c=a.pageX||a.clientX+document.documentElement.scrollLeft;var d=a.pageY||a.clientY+document.documentElement.scrollTop;b.style.left=c-b.offsetWidth/2+"px";b.style.top=d-b.offsetHeight/2+"px";setTimeout(function(){try{b.parentNode.removeChild(b)}catch(a){}},1e3)});var eventResize=function(){if(!isIE){that.canvas.style.display="none";w=document.documentElement.clientWidth;h=document.documentElement.clientHeight;that.canvas.setAttribute("width",w);that.canvas.setAttribute("height",h);with(that.canvas.style){display="block";width=w+"px";height=h+"px"}}else{w=document.documentElement.clientWidth;h=document.documentElement.clientHeight;if(isIEQuirks){w=document.body.clientWidth;h=document.body.clientHeight}that.canvas.setAttribute("width",w);that.canvas.setAttribute("height",h)}forceChange=true};addEvent(window,"resize",eventResize);this.gameContainer.appendChild(this.canvas);this.ctx=this.canvas.getContext("2d");this.ctx.fillStyle="black";this.ctx.strokeStyle="black";if(!document.getElementById("ASTEROIDS-NAVIGATION")){this.navigation=document.createElement("div");this.navigation.id="ASTEROIDS-NAVIGATION";this.navigation.className="ASTEROIDSYEAH";with(this.navigation.style){fontFamily="Arial,sans-serif";position="fixed";zIndex="10001";bottom="0px";right="10px";textAlign="left";background="#fff";color="#222";padding="2px";border="1px solid #e1e1e1";boxShadow="-2px -2px 15px #333";borderRadius="3px"}this.gameContainer.appendChild(this.navigation);this.points=document.createElement("span");this.points.id="ASTEROIDS-POINTS";with(this.points.style){font="28pt Arial, sans-serif";fontWeight="bold";position="relative";left="20px"}this.points.className="ASTEROIDSYEAH";this.navigation.appendChild(this.points);this.highscoreLink=document.createElement("a");this.highscoreLink.className="ASTEROIDSYEAH";var css={fontFamily:"Arial",fontSize:"15px",fontWeight:"normal",color:"#fff",background:"#333",textDecoration:"none",display:"inline",padding:"2px",borderRadius:"5px",position:"relative",left:"30px",top:"-3px"};for(var key in css)if(css.hasOwnProperty(key))this.highscoreLink.style[key]=css[key];this.highscoreLink.href="#";this.highscoreLink.innerHTML="Submit highscore";this.navigation.appendChild(this.highscoreLink);this.appstore=document.createElement("div");with(this.appstore.style){position="fixed";top="10px";right="10px";zIndex="9999999"}this.appstore.className="ASTEROIDSYEAH";this.appstore.innerHTML='<a class="ASTEROIDSYEAH" target="_blank" href="http://itunes.apple.com/us/app/kick-ass-destroy-the-web/id436623109?mt=8&ls=1"><img src="http://erkie.github.com/appstore.png" class="ASTEROIDSYEAH" style="border: none" alt="Get the mobile version" /></a>';this.appstore.getElementsByTagName("a")[0].onclick=function(){this.parentNode.removeChild(this)};document.body.appendChild(this.appstore);this.fbLike=document.createElement("div");this.fbLike.innerHTML='
<iframe width="560" height="315" src="http://www.youtube.com/embed/myavj78jfTQ" frameborder="0" allowfullscreen></iframe>';this.navigation.appendChild(this.fbLike);if(document.location.href==="http://erkie.github.com/"){this.appstore.style.display="none"}this.highscoreLink.onclick=function(){if(!that.highscores){that.highscores=new Highscores}that.highscores.show();return false}}else{this.navigation=document.getElementById("ASTEROIDS-NAVIGATION");this.points=document.getElementById("ASTEROIDS-POINTS")}if(isIEQuirks){this.gameContainer.style.position=this.canvas.style.position=this.navigation.style.position="absolute"}setScore();if(typeof G_vmlCanvasManager!="undefined"){var children=this.canvas.getElementsByTagName("*");for(var i=0,c;c=children[i];i++)addClass(c,"ASTEROIDSYEAH")}var eventKeydown=function(a){a=a||window.event;if(a.ctrlKey||a.shiftKey)return;that.keysPressed[a.keyCode]=true;switch(a.keyCode){case code(" "):that.firedAt=1;break}if(indexOf([code("up"),code("down"),code("right"),code("left"),code(" "),code("B"),code("W"),code("A"),code("S"),code("D")],a.keyCode)!=-1){if(a.ctrlKey||a.shiftKey)return;if(a.preventDefault)a.preventDefault();if(a.stopPropagation)a.stopPropagation();a.returnValue=false;a.cancelBubble=true;return false}};addEvent(document,"keydown",eventKeydown);var eventKeypress=function(a){a=a||window.event;if(indexOf([code("up"),code("down"),code("right"),code("left"),code(" "),code("W"),code("A"),code("S"),code("D")],a.keyCode||a.which)!=-1){if(a.ctrlKey||a.shiftKey)return;if(a.preventDefault)a.preventDefault();if(a.stopPropagation)a.stopPropagation();a.returnValue=false;a.cancelBubble=true;return false}};addEvent(document,"keypress",eventKeypress);var eventKeyup=function(a){a=a||window.event;that.keysPressed[a.keyCode]=false;if(indexOf([code("up"),code("down"),code("right"),code("left"),code(" "),code("B"),code("W"),code("A"),code("S"),code("D")],a.keyCode)!=-1){if(a.preventDefault)a.preventDefault();if(a.stopPropagation)a.stopPropagation();a.returnValue=false;a.cancelBubble=true;return false}};addEvent(document,"keyup",eventKeyup);this.ctx.clear=function(){this.clearRect(0,0,w,h)};this.ctx.clear();this.ctx.drawLine=function(a,b,c,d){this.beginPath();this.moveTo(a,b);this.lineTo(c,d);this.lineTo(c+1,d+1);this.closePath();this.fill()};this.ctx.tracePoly=function(a){this.beginPath();this.moveTo(a[0][0],a[0][1]);for(var b=1;b<a.length;b++)this.lineTo(a[b][0],a[b][1]);this.closePath()};var THEPLAYER=false;if(window.KICKASSIMG){THEPLAYER=document.createElement("img");THEPLAYER.src=window.KICKASSIMG}this.ctx.drawPlayer=function(){if(!THEPLAYER){this.save();this.translate(that.pos.x,that.pos.y);this.rotate(that.dir.angle());this.tracePoly(playerVerts);this.fillStyle="white";this.fill();this.tracePoly(playerVerts);this.stroke();this.restore()}else{this.save();this.translate(that.pos.x,that.pos.y);this.rotate(that.dir.angle()+Math.PI/2);this.drawImage(THEPLAYER,-THEPLAYER.width/2,-THEPLAYER.height/2);this.restore()}};var PI_SQ=Math.PI*2;this.ctx.drawBullets=function(a){for(var b=0;b<a.length;b++){this.beginPath();this.arc(a[b].pos.x,a[b].pos.y,bulletRadius,0,PI_SQ,true);this.closePath();this.fill()}};var randomParticleColor=function(){return["red","yellow"][random(0,1)]};this.ctx.drawParticles=function(a){var b=this.fillStyle;for(var c=0;c<a.length;c++){this.fillStyle=randomParticleColor();this.drawLine(a[c].pos.x,a[c].pos.y,a[c].pos.x-a[c].dir.x*10,a[c].pos.y-a[c].dir.y*10)}this.fillStyle=b};this.ctx.drawFlames=function(a){if(THEPLAYER)return;this.save();this.translate(that.pos.x,that.pos.y);this.rotate(that.dir.angle());var b=this.strokeStyle;this.strokeStyle="red";this.tracePoly(a.r);this.stroke();this.strokeStyle="yellow";this.tracePoly(a.y);this.stroke();this.strokeStyle=b;this.restore()};try{window.focus()}catch(e){}addParticles(this.pos);addClass(document.body,"ASTEROIDSYEAH");var isRunning=true;var lastUpdate=(new Date).getTime();var forceChange=false;this.update=function(){var a=(new Date).getTime();var b=(a-lastUpdate)/1e3;lastUpdate=a;var c=false;if(a-this.updated.flame>50){createFlames();this.updated.flame=a}this.scrollPos.x=window.pageXOffset||document.documentElement.scrollLeft;this.scrollPos.y=window.pageYOffset||document.documentElement.scrollTop;if(this.keysPressed[code("up")]||this.keysPressed[code("W")]){this.vel.add(this.dir.mulNew(acc*b));c=true}else{this.vel.mul(.96)}if(this.keysPressed[code("left")]||this.keysPressed[code("A")]){forceChange=true;this.dir.rotate(radians(rotSpeed*b*-1))}if(this.keysPressed[code("right")]||this.keysPressed[code("D")]){forceChange=true;this.dir.rotate(radians(rotSpeed*b))}if(this.keysPressed[code(" ")]&&a-this.firedAt>timeBetweenFire){this.bullets.unshift({dir:this.dir.cp(),pos:this.pos.cp(),startVel:this.vel.cp(),cameAlive:a});this.firedAt=a;if(this.bullets.length>maxBullets){this.bullets.pop()}}if(this.keysPressed[code("B")]){if(!this.updated.enemies){updateEnemyIndex();this.updated.enemies=true}forceChange=true;this.updated.blink.time+=b*1e3;if(this.updated.blink.time>timeBetweenBlink){this.toggleBlinkStyle();this.updated.blink.time=0}}else{this.updated.enemies=false}if(this.keysPressed[code("esc")]){destroy.apply(this);return}if(this.vel.len()>maxSpeed){this.vel.setLength(maxSpeed)}this.pos.add(this.vel.mulNew(b));if(this.pos.x>w){window.scrollTo(this.scrollPos.x+50,this.scrollPos.y);this.pos.x=0}else if(this.pos.x<0){window.scrollTo(this.scrollPos.x-50,this.scrollPos.y);this.pos.x=w}if(this.pos.y>h){window.scrollTo(this.scrollPos.x,this.scrollPos.y+h*.75);this.pos.y=0}else if(this.pos.y<0){window.scrollTo(this.scrollPos.x,this.scrollPos.y-h*.75);this.pos.y=h}for(var d=this.bullets.length-1;d>=0;d--){if(a-this.bullets[d].cameAlive>2e3){this.bullets.splice(d,1);forceChange=true;continue}var e=this.bullets[d].dir.setLengthNew(bulletSpeed*b).add(this.bullets[d].startVel.mulNew(b));this.bullets[d].pos.add(e);boundsCheck(this.bullets[d].pos);var f=getElementFromPoint(this.bullets[d].pos.x,this.bullets[d].pos.y);if(f&&f.tagName&&indexOf(ignoredTypes,f.tagName.toUpperCase())==-1&&hasOnlyTextualChildren(f)&&f.className!="ASTEROIDSYEAH"){didKill=true;addParticles(this.bullets[d].pos);this.dying.push(f);this.bullets.splice(d,1);continue}}if(this.dying.length){for(var d=this.dying.length-1;d>=0;d--){try{if(this.dying[d].parentNode)window.ASTEROIDS.enemiesKilled++;this.dying[d].parentNode.removeChild(this.dying[d])}catch(g){}}setScore();this.dying=[]}for(var d=this.particles.length-1;d>=0;d--){this.particles[d].pos.add(this.particles[d].dir.mulNew(particleSpeed*b*Math.random()));if(a-this.particles[d].cameAlive>1e3){this.particles.splice(d,1);forceChange=true;continue}}if(isIEQuirks){this.gameContainer.style.left=this.canvas.style.left=document.documentElement.scrollLeft+"px";this.gameContainer.style.top=this.canvas.style.top=document.documentElement.scrollTop+"px";this.navigation.style.right="10px";this.navigation.style.top=document.documentElement.scrollTop+document.body.clientHeight-this.navigation.clientHeight-10+"px"}if(forceChange||this.bullets.length!=0||this.particles.length!=0||!this.pos.is(this.lastPos)||this.vel.len()>0){this.ctx.clear();this.ctx.drawPlayer();if(c)this.ctx.drawFlames(that.flame);if(this.bullets.length){this.ctx.drawBullets(this.bullets)}if(this.particles.length){this.ctx.drawParticles(this.particles)}}this.lastPos=this.pos;forceChange=false};var updateFunc=function(){that.update.call(that)};var interval=setInterval(updateFunc,1e3/FPS);}if(!window.ASTEROIDSPLAYERS)window.ASTEROIDSPLAYERS=[];if(window.ActiveXObject&&!document.createElement("canvas").getContext){try{var xamlScript=document.createElement("script");xamlScript.setAttribute("type","text/xaml");xamlScript.textContent='<?xml version="1.0"?><Canvas xmlns="http://schemas.microsoft.com/client/2007"></Canvas>';document.getElementsByTagName("head")[0].appendChild(xamlScript)}catch(e){}var script=document.createElement("script");script.setAttribute("type","text/javascript");script.onreadystatechange=function(){if(script.readyState=="loaded"||script.readyState=="complete"){if(typeof G_vmlCanvasManager!="undefined")window.ASTEROIDSPLAYERS[window.ASTEROIDSPLAYERS.length]=new Asteroids}};script.src="http://erkie.github.com/excanvas.js";document.getElementsByTagName("head")[0].appendChild(script)}else window.ASTEROIDSPLAYERS[window.ASTEROIDSPLAYERS.length]=new Asteroids;var trackingFrame=document.createElement("iframe");trackingFrame.src="http://erkie.github.com/tracking.html";trackingFrame.frameborder="0";trackingFrame.style.position="absolute";trackingFrame.style.top="-1000px";trackingFrame.style.height="0px";trackingFrame.style.width="0px";document.getElementsByTagName("body")[0].appendChild(trackingFrame)})()