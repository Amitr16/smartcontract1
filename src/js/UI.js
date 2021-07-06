import * as App from './app.js'
// console.log(await App.getPropAddress(1));
var arrObj=new Array();
var strDet1=0;
 function numberWithCommas(x)  {  
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
await ShowPropDetails();

async function ShowPropDetails(){
  
  
  let accotype=["Studio","1B1T","2B1T","3B2T","4B3T"];
  var DistID = ["01","01","01","01","01","02","02","02","04","04","05","05","05","03","03","03","06","07","07","08","08","09","09","10","10","10","10","11","11","11","12","12","12","13","13","13","13","14","14","14","14","15","15","15","15","16","16","16","17","17","18","18","19","19","19","20","20","21","21","22","22","22","22","22","23","23","23","23","24","24","24","25","25","25","27","27","26","26","28","28","17","19"];
 
  try{
  var strDet=document.getElementById("PropDet").innerHTML;
 strDet1=strDet;
  
  
  document.getElementById("PropDet").innerHTML="";
  
var FullDetails = JSON.parse(localStorage.getItem('FullProp'));
var detaillen =0;

for (var i=0; i<await App.GetPropCount() ;i++){

console.log(FullDetails);

if(FullDetails!=null){
  detaillen=FullDetails.length;
}


if ((detaillen!=await App.GetPropCount()) &&((i+1)>detaillen &&(i+1)<=await App.GetPropCount())){
  
  var state = await App.getPropState(i);
 
  var PropType =await App.getInstanceProptype(i);


  var locout = await App.getPropAddress(i);
  var pin =await App.getPropZIP(i);

  var firsttwo =String(pin).slice(2);
  var  district = DistID[firsttwo-1];
  // var lastupdate=await App.getLastOpsTime(i);
  
  // var lastdate= new Date(lastupdate*1000);
  var blockentry= await App.getInstanceBlockEntry(i);
  var Statusout = await App.getPropState(i);
  var price =(await App.getPropPrice(i));
  var area =( await App.getInstancePropArea(i));
  var price1 =numberWithCommas(price);
  var area1 =numberWithCommas( area);

  var acco = await App.getInstanceAcco(i);
  var url = blockentry.split("%")[4];
  
  var obj ={Index:i,Pin:pin,Location:locout,blockentry:blockentry,Price:price,Acco:acco,State:state,PropType:PropType,Area:area};
  arrObj.push(obj);
  if(state!=0)
  continue;
}
else{
  
  var state = FullDetails[i].State;
 
  var PropType =FullDetails[i].PropType;


  var locout = FullDetails[i].Location;

  // var lastupdate=await App.getLastOpsTime(i);
  
  // var lastdate= new Date(lastupdate*1000);
  var firsttwo =String(FullDetails[i].Pin).slice(2);
  var  district = DistID[firsttwo-1];
  var blockentry= FullDetails[i].blockentry;
  var price =Number(FullDetails[i].Price);
  var price1=numberWithCommas(price);
  var area =Number(FullDetails[i].Area);
  var area1 =numberWithCommas(area);
  var acco = FullDetails[i].Acco;
  var psf = price/area;
  var url = blockentry.split("%")[4];
// console.log(i);
  var obj ={Index:i,Pin:pin,Location:locout,blockentry:blockentry,Price:price,Acco:acco,State:state,PropType:PropType,Area:area};
  arrObj.push(obj);
  
  if(state!=0)
  continue;

}
    document.getElementById("PropDet").innerHTML+= strDet.replace("xxx",locout).replace("yyy",district).replace("zzz",price1).replace("aaa",accotype[acco-1]).replace("bbb",area1).replace("ccc",psf).replace("ddd",i).replace("jjj",url).replace("ppp",i);
  

}


if (detaillen!=await App.GetPropCount()){
localStorage.setItem('FullProp', JSON.stringify(arrObj));

}

}catch (e){console.log("no local storage")};

}
// catch (e){console.log("no form object")};
// }

try{
  document.getElementById("FilterBtn").addEventListener('click', GetFilteredView);
  // $(document).on('click','#ShowInterest',function(e){ShowInterest()});

  }
  catch (e){console.log("no form object")};

// cleancache();
function cleancache()
{

  arrObj =[];
  localStorage.setItem('FullProp', JSON.stringify(arrObj));
}
async function GetFilteredView(){

  var proptypefilter=Number(document.getElementById("ProptypeFilter").value);
  var districtfilter=document.getElementById("DistrFilter").value;
  var accofilter=Number(document.getElementById("AccoFilter").value);
  var Pxfilter=(document.getElementById("PriceFilter").value).split(" ");
  var lowPxFilter = Number(Pxfilter[0]);
  var highPxFilter = Number(Pxfilter[1]);


  let accotype=["Studio","1B1T","2B1T","3B2T","4B3T"];
  var DistID = ["01","01","01","01","01","02","02","02","04","04","05","05","05","03","03","03","06","07","07","08","08","09","09","10","10","10","10","11","11","11","12","12","12","13","13","13","13","14","14","14","14","15","15","15","15","16","16","16","17","17","18","18","19","19","19","20","20","21","21","22","22","22","22","22","23","23","23","23","24","24","24","25","25","25","27","27","26","26","28","28","17","19"];
 
  
  document.getElementById("PropDet").innerHTML="";
  
 var FullDetails = JSON.parse(localStorage.getItem('FullProp'));




for (var i=0; i<await App.GetPropCount() ;i++){
  
  var state = FullDetails[i].State;
  var PropType =FullDetails[i].PropType;
 
  var firsttwo =String(FullDetails[i].Pin).slice(2);
  var  district = DistID[firsttwo-1];
  var price =Number(FullDetails[i].Price);
  var acco = FullDetails[i].Acco;
  
  if(state!=0 || (PropType!=proptypefilter&&proptypefilter!=-1)|| (district!=districtfilter&&districtfilter!="00")|| (acco!=accofilter&&accofilter!=0)|| !(price>lowPxFilter&&price<=highPxFilter))
   continue;
 
  var locout = FullDetails[i].Location;

  // var lastupdate=await App.getLastOpsTime(i);
  
  // var lastdate= new Date(lastupdate*1000);

  var blockentry= FullDetails[i].blockentry;
  
  var area = numberWithCommas(Number(FullDetails[i].Area));
  var px =numberWithCommas(price); 
  var psf = price/area;
  var url = blockentry.split("%")[4];
  // console.log(document.getElementById("PropDet").innerHTML);
    document.getElementById("PropDet").innerHTML+= strDet1.replace("xxx",locout).replace("yyy",district).replace("zzz",px).replace("aaa",accotype[acco-1]).replace("bbb",area).replace("ccc",psf).replace("ddd",i).replace("jjj",url).replace("ppp",i);;


}




}
window.ShowInterest = async function(index)
{

  await App.ShowInterest(index);
  window.location.href = "http://127.0.0.1:5500/src/purchase_property.html";

}