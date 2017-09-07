/**
 * Created by Devendra on 26-Aug-17.
 */

function devkum(hrs){
   var HrList= '<select id="devkumar">';
var k;
for(var i=0;i<60;i+15){
    if(i<10){
        k='0'+i;
    }
    else
        k=i;
    HrList=HrList+"<option value='"+i+"'"+ (i==hrs?'selected':'')+">"+k+"</option>";
}
HrList=HrList+'</select>';
    console.log('The Option is --->'+HrList)
}
devkum(8);