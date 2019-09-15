const express=require("express")
const router=express.Router()
const pool=require("../pool")

router.get("/add",(req,res)=>{
  var lid=req.query.lid;
  var count=req.query.count;
  var uid=req.session.uid;
  pool.query(
    "select * from xz_shoppingcart_item where user_id=? and product_id=?",
    [uid,lid],
    (err,result)=>{
      if(err) console.log(err);
      if(result.length==0){
        pool.query(
          "insert into xz_shoppingcart_item values(null,?,?,?,0)",
          [uid,lid,count],
          (err,result)=>{
            if(err) console.log(err);
            res.end();
          }
        )
      }else{
        pool.query(
          "update xz_shoppingcart_item set count=count+? where user_id=? and product_id=?",
          [count,uid,lid,],
          (err,result)=>{
            if(err) console.log(err);
            res.end();
          }
        )
      }
    }
  )
  
})

router.get("/items",(req,res)=>{
  var uid=req.session.uid;
  var sql=`SELECT *,(
    select md from xz_laptop_pic
    where laptop_id=product_id
    limit 1
  )as md 
  FROM xz_shoppingcart_item 
  inner join xz_laptop on product_id=lid
  where user_id=?`;
  pool.query(sql,[uid],(err,result)=>{
    if(err) console.log(err);
    res.writeHead(200);
    res.write(JSON.stringify(result))
    res.end();
  })
})
//http://localhost:3000/users/signin?uname=dingding&upwd=123456
//http://localhost:3000/cart/update?iid=35&count=新数量
router.get("/update",(req,res)=>{
  var iid=req.query.iid;
  var count=req.query.count;
  if(count>0){
    var sql="update xz_shoppingcart_item set count=? where iid=?";
    var data=[count,iid];
  }else{
    var sql="delete from xz_shoppingcart_item where iid=?";
    var data=[iid];
  }
  pool.query(sql,data,(err,result)=>{
    if(err) console.log(err);
    res.end();
  })
})
module.exports=router;