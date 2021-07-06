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
  let proptypes=['HDB','Condo','Landed'];

  var strbuyer="";
  var strseller="";
  var strlawyer="";


  
 var lenbuyer=0;
 var lenseller =0;
 var lenlawyer=0;


for (var i=0; i<await App.GetPropCount() ;i++){

  var state = await App.getPropState(i);
  console.log(i);
  console.log(state);
  if(state==0)
  continue;
  var arrStatus=["Awaiting Seller Signature","Awaiting Buyer Deposit","Awaiting OTP Exercise and payment","Awaiting review by Lawyer","Awaiting Final payment and closure","Deal Finalized"];
  
 
  var PropType =await App.getInstanceProptype(i);


  var locout = await App.getPropAddress(i);
  var pin =await App.getPropZIP(i);

  var firsttwo =String(pin).slice(2);
  var  district = DistID[firsttwo-1];
  // var lastupdate=await App.getLastOpsTime(i);
  
  // var lastdate= new Date(lastupdate*1000);
  var blockentry= await App.getInstanceBlockEntry(i);

  var price =(await App.getPropPrice(i));
  var area =( await App.getInstancePropArea(i));

  var area1 =numberWithCommas( area);

  var acco = await App.getInstanceAcco(i);
  console.log(blockentry);
  var WalletAdd=await App.GetWalletAccount();
  var SellerAdd=await App.getPropSellerAddress(i);
  var BuyerAdd=await App.getPropBuyerAddress(i);
  var lawyerAdd=await App.getPropAgentAddress(i);
  var url = blockentry.split("%")[4];
  if(BuyerAdd==WalletAdd){
    if (lenbuyer==0){
      strbuyer=  document.getElementById("myactivity").innerHTML.replace("aaa","My Purchase Activities")+'<div class="row row-cols-1 row-cols-md-3 mb-3 text-center"  >';
    }
    lenbuyer+=1;
    
    if (!(state==2||state==3||state==5))
    {
      strbuyer+=document.getElementById("myfields").innerHTML.replace("bbb",arrStatus[state-1]).replace("ccc",locout).replace("ddd",pin).replace("eee",proptypes[PropType]).replace("jjj",url).replace("xxx",i).replace("yyy",state).replace("rrr","disabled");
    } 
    else{
      strbuyer+=document.getElementById("myfields").innerHTML.replace("bbb",arrStatus[state-1]).replace("ccc",locout).replace("ddd",pin).replace("eee",proptypes[PropType]).replace("jjj",url).replace("xxx",i).replace("yyy",state);
    }
  }
  
  
  if(SellerAdd==WalletAdd){
    if (lenseller==0){
      strseller=  document.getElementById("myactivity").innerHTML.replace("aaa","My Selling Activities")+'<div class="row row-cols-1 row-cols-md-3 mb-3 text-center"  >';
    }
    lenseller+=1;
    
    if (!(state==1))
    {
      strseller+=document.getElementById("myfields").innerHTML.replace("bbb",arrStatus[state-1]).replace("ccc",locout).replace("ddd",pin).replace("eee",proptypes[PropType]).replace("jjj",url).replace("xxx",i).replace("yyy",state).replace("rrr","disabled");
    } 
    else{
      strseller+=document.getElementById("myfields").innerHTML.replace("bbb",arrStatus[state-1]).replace("ccc",locout).replace("ddd",pin).replace("eee",proptypes[PropType]).replace("jjj",url).replace("xxx",i).replace("yyy",state);
    }

  }
  if(lawyerAdd==WalletAdd){
    if (lenlawyer==0){
      strlawyer=  document.getElementById("myactivity").innerHTML.replace("aaa","My Lawyer Activities")+'<div class="row row-cols-1 row-cols-md-3 mb-3 text-center"  >';
    }
    lenlawyer+=1;
    
    if (!(state==4))
    {
      strlawyer+=document.getElementById("myfields").innerHTML.replace("bbb",arrStatus[state-1]).replace("ccc",locout).replace("ddd",pin).replace("eee",proptypes[PropType]).replace("jjj",url).replace("xxx",i).replace("yyy",state).replace("rrr","disabled");
    }   
    else{
      strlawyer+=document.getElementById("myfields").innerHTML.replace("bbb",arrStatus[state-1]).replace("ccc",locout).replace("ddd",pin).replace("eee",proptypes[PropType]).replace("jjj",url).replace("xxx",i).replace("yyy",state);
    }
  }

}

document.getElementById("maintag").innerHTML=strbuyer+'</div>'+strseller+'</div>'+strlawyer+'</div>';
  


}

window.Approve = async function(index,status)
{
if(status==1)
  await App.sellerSignContract(index);
if(status==2)
  await App.buyerSignContractAndPayDeposit(index);
if(status==3)
  await App.buyerPaysOTPAmount(index);
if(status==4)
  await App.AgentReviewedClosingConditions(index);
if(status==5)
  await App.buyerFinalizeTransaction(index);
}