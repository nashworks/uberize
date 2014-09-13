/*!
 * UBERIZE v1.0.0
 * https://github.com/nashworks/uberize
 *
 * Copyright 2014 Nash Brooklyn
 * Released under the MIT license
 *
 * LEGEND:
 * lT 	= label text (example/default is 4 labels)
 * iFT 	= input field type (example/default is 4 fields)
 * iBT 	= input button type (example/default is 4 fields)
 * lTC 	= label text color
 * piXY = puck icons XY coordinates (example/default is 4 icons)
 * mBC 	= main background color is made of 3 rgb values (top and bottom colors and opacity)
 * pBC 	= puck background color is made of 3 rgb values (top and bottom colors and opacity)
 * pBBC = puck border color
 * pI 	= puck icons are made of 2 values (background color and path to the sprite)
 * pIBC = puck icon border color
 * lBC 	= line background color is made of 3 rgb values (top and bottom colors and opacity)
 * cBC 	= circle background color is made of 3 rgb values (top and bottom colors and opacity)
 * mW 	= main width
 * iFBC = input field background color
 * iBBC = input button background color
 * iFTC = input field text color
 * iBTC = input button text color
 *
 * USAGE:
 * $('some_div').uberize({name1:'value1',name2:'value2',etc...});
 */
;(function($) {
var defaults = {
lT:['EMAIL','MOBILE','PASSWORD','PHOTO'],
iFT:['email','tel','password','file'],
iBT:['button','button','button','submit'],
lTC:'#CCC',
piXY:['0 0','0 -34px','0 -68px','0 -102px'],
mBC:['26,26,26','1,1,1','1'],
pBC:['26,26,26','1,1,1','1'],
pBBC:'#333',
pI:['#000','icons_white.png'],
pIBC:'#333',
lBC:['26,26,26','26,26,26','1'],
cBC:['26,26,26','26,26,26','1'],
mW:'100%',
iFBC:'#000',
iBBC:'#000',
iFTC:'#CCC',
iBTC:'#CCC'
};
$.fn.uberize = function(options) {
options = $.extend(true,{},defaults,options);
return this.each(function() {
var elem = this, $elem = $(elem);
var maxNumber = options.lT.length;
maxNumber = (maxNumber<1)?1:maxNumber;
var labelWidth = (100/maxNumber)+'%';
$('<div>',{id:'labelTop'}).appendTo(this);
$('<div>',{id:'labelBottom'}).appendTo(this);
$('<div>',{id:'circles'}).appendTo(this);
$('<div>',{id:'puck'}).append($('<div>',{id:'puckPlacer'}).append($('<div>',{id:'puckBgnd'}).append($('<div>',{id:'puckIcon'})))).appendTo(this);
$('<div id=\''+elem.id+'Form\'></div>').insertAfter(this);
$('<form>',{name:'uberForm',id:'uberForm',method:'post',enctype:'multipart/form-data'}).appendTo('#'+elem.id+'Form');
for(var i=0;i<maxNumber;i++) {
$('<div>',{id:'labelTop'+(i+1),class:'uberLabelTop',html:options.lT[i]}).appendTo('#labelTop');
$('<div>',{id:'labelBottom'+(i+1),class:'uberLabelBottom',html:options.lT[i]}).appendTo('#labelBottom');
$('<div>',{id:'circlePlacer'+(i+1),class:'uberCirclePlacer'}).append($('<div>',{id:'circle'+(i+1),class:'uberCircle'}),$('<div>',{id:'line'+(i+1),class:'uberLine'})).appendTo('#circles');
$('<div>',{id:'stepField'+(i+1)}).appendTo('#uberForm');
$('#stepField'+(i+1)).css({display:(((i+1)==1)?'block':'none'),minHeight:'100px',position:'relative'});
if (options.iFT[i]=='file') $('<input>',{name:options.lT[i].toLowerCase(),type:options.iFT[i],accept:'image/*;capture=camera',class:'uberField',style:'background-color:'+options.iFBC+';color:'+options.iFTC+';'}).appendTo('#stepField'+(i+1));
else $('<input>',{name:options.lT[i].toLowerCase(),type:options.iFT[i],placeholder:options.lT[i],class:'uberField',style:'background-color:'+options.iFBC+';color:'+options.iFTC+';'}).appendTo('#stepField'+(i+1));
$('<div>',{id:'stepButton'+(i+1)}).appendTo('#uberForm');
$('#stepButton'+(i+1)).css({display:(((i+1)==1)?'block':'none'),minHeight:'100px',position:'relative'});
$('<button>',{id:'stepok'+(i+1),type:options.iBT[i],text:(((i+1)==maxNumber)?'SUBMIT':'NEXT'),class:'uberButton',style:'background-color:'+options.iBBC+';color:'+options.iBTC+';'}).appendTo('#stepButton'+(i+1));
$('.uberLabelTop,.uberLabelBottom,.uberCirclePlacer,#puckPlacer').css({width:labelWidth});
if ((i+1)==1) $('#line'+(i+1)).css({width:'50%',float:'right'});
if ((i+1)==maxNumber) $('#line'+(i+1)).css({width:'50%',float:'left'});
$('#labelTop'+(i+1)).css({visibility:(((i+1)==1)?'visible':'hidden')});
$('#labelBottom'+(i+1)).css({visibility:(((i+1)==1)?'hidden':'visible')});
(function(j) {
$('#labelBottom'+j+',#circle'+j).click(function(event) {
$('#puck').stop().animate({'left':$('#circle'+j).position().left+'px'},'slow','swing',function(){$('#puckIcon').css({backgroundPosition:options.piXY[j-1]});});
$('#labelTop'+j).css({visibility:'visible'});
$('#labelBottom'+j).css({visibility:'hidden'});
$('#stepField'+j).css({display:'block'});
$('#stepButton'+j).css({display:'block'});
for(var k=1;k<=maxNumber;k++) {
if (k!=j) {
$('#labelTop'+k).css({visibility:'hidden'});
$('#labelBottom'+k).css({visibility:'visible'});
$('#stepField'+k).css({display:'none'});
$('#stepButton'+k).css({display:'none'});
}}
event.preventDefault();
});
})(i+1);
(function(j) {
$('#stepok'+j).click(function(event) {
$('#puck').stop().animate({'left':$('#circle'+(j+1)).position().left+'px'},'slow','swing',function(){$('#puckIcon').css({backgroundPosition:options.piXY[j]});});
$('#labelTop'+(j+1)).css({visibility:'visible'});
$('#labelBottom'+(j+1)).css({visibility:'hidden'});
$('#stepField'+(j+1)).css({display:'block'});
$('#stepButton'+(j+1)).css({display:'block'});
for(var k=1;k<=maxNumber;k++) {
if (k!=(j+1)) {
$('#labelTop'+k).css({visibility:'hidden'});
$('#labelBottom'+k).css({visibility:'visible'});
$('#stepField'+k).css({display:'none'});
$('#stepButton'+k).css({display:'none'});
}}
event.preventDefault();
});
})(i+1);
}
$elem.css({clear:'both',width:options.mW,height:'100px',textAlign:'center',fontFamily:'\'PT Sans Narrow\',sans-serif',fontSize:'100%',boxShadow:'0px 1px 4px 0px rgba(0,0,0,0.5)',background:'linear-gradient(to bottom,rgba('+options.mBC[0]+','+options.mBC[2]+') 0%,rgba('+options.mBC[1]+','+options.mBC[2]+') 100%)',color:options.lTC});
$('#puckBgnd').css({background:'linear-gradient(to bottom,rgba('+options.pBC[0]+','+options.pBC[2]+') 0%,rgba('+options.pBC[1]+','+options.pBC[2]+') 100%)',border:options.pBBC+' 1px solid'});
$('#puckIcon').css({background:options.pI[0]+' url('+options.pI[1]+') 0 0',border:options.pIBC+' 1px solid'});
$('.uberLine').css({background:'linear-gradient(to bottom,rgba('+options.lBC[0]+','+options.lBC[2]+') 0%,rgba('+options.lBC[1]+','+options.lBC[2]+') 100%)'});
$('.uberCircle').css({background:'linear-gradient(to bottom,rgba('+options.cBC[0]+','+options.cBC[2]+') 0%,rgba('+options.cBC[1]+','+options.cBC[2]+') 100%)'});
$('#'+elem.id+'Form').css({clear:'both',width:options.mW,color:options.lTC});
});
return this;
}
})(jQuery);