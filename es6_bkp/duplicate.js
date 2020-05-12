/*****************Filter Based On user id *****************/
var data=[
    {
      "email": "Vasu@gmail.com",
      "message": "hlooo",
      "name": "Vasudev",
      "time": 1505224869596,
      "type": "anoynomous",
      "userid": "1"
    },
    {
      "email": "raghav@gmail.com",
      "message": "hello",
      "name": "Vasudev",
      "time": 1505223925715,
      "type": "anoynomous",
      "userid": "1"
    },
     {
      "email": "shivam@gmail.com",
      "message": "hello",
      "name": "Shivam",
      "time": 1505223925715,
      "type": "anoynomous",
      "userid": "3"
    }
   ]
   
   
   var temp=[ ]
   data=data.filter((item)=>{
   if(!temp.includes(item.userid)){
     temp.push(item.userid)
     return true;
   }
   })
   
   
   document.getElementById('output').innerHTML=JSON.stringify(data);
   