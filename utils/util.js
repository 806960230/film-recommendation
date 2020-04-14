const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function convertToStarsArray(stars){
  var num=stars.toString().substring(0,1);
  var arr=[];
  for(var i=1;i<=5;i++){
    if(i<=num){
      arr.push(1);
    }else{
      arr.push(0);
    }
  }
  return arr;
}

function convertToCastString(casts){
    var castsjoin="";
    for(var idx in casts){
      castsjoin=castsjoin+casts[idx].name+" / ";

    }
    return castsjoin.substring(0,castsjoin.length-2)
}

function convertToCastInfos(casts){
   var castsArray=[]
   for(var idx in casts){
     var cast={
       img:casts[idx].avatars?casts[idx].avatars.large:"",
       name:casts[idx].name

     }
     castsArray.push(cast);
   }
   return castsArray;
}
function http(url,callback){
  
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "application/xml"//不要写json否则请求不到
    },
    success: function (res) {
      console.log(res.data)
      callback(res.data);
    },
    fail: function (error) {
      console.log(error)
    },
    complete: function () {

    }
  })
}


module.exports = {
  formatTime: formatTime,
  convertToStarsArray:convertToStarsArray,
  http:http,
  convertToCastInfos: convertToCastInfos,
  convertToCastString: convertToCastString
}



