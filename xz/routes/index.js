/*
 * @Description: 
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2018-10-17 10:23:24
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-09-06 10:36:28
 */
const express=require("express")
const router=express.Router()
const pool=require("../pool")

router.get("/getIndexProducts",(req,res)=>{
  var sql="SELECT * FROM xz_index_product  where seq_recommended!=0 order by seq_recommended";
  pool.query(sql,[],(err,result)=>{
    if(err) console.log(err);
    //res.send(result);
    res.writeHead(200,{
      "Content-Type":"application/json;charset=utf-8",
      "Access-Control-Allow-Origin":"*"
    })
    res.write(JSON.stringify(result));
    setTimeout(function(){
      res.end();
    },3000)
  })
})
//接口地址: http://localhost:3000/index/getIndexProducts
module.exports=router;