/*
 * @Description: 
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2018-10-19 10:48:48
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-09-02 15:52:09
 */
var vm;
$(function(){
  //1. 动态创建link引用header.css
  $("<link rel='stylesheet' href='css/header.css'>").appendTo("head")
  //2. ajax请求header.html片段
  $.ajax({
    url:"http://localhost:3000/header.html",
    type:"get",
    success:function(res){
      $("#header").replaceWith(res);
      vm=new Vue({
        el:"#header",
        data:{
          kword:"",
          islogin:false,
          uname:""
        },
        mounted(){//在new Vue()实例对象创建完自动执行
          if(location.search.indexOf("kwords")!=-1){
            this.kword=decodeURI(
              location.search.split("=")[1]
            )
          }
          $.ajax({
            url:"http://localhost:3000/users/islogin",
            type:"get",
            dataType:"json",
            success:res=>{
              if(res.ok==0){
                this.islogin=false
              }else{
                this.islogin=true
                this.uname=res.uname;
              }
            }
          })
        },
        computed:{
          signin(){
            return `login.html?back=${location.href}`
          }
        },
        methods:{
          search(){//@click   @keyup
            if(this.kword!=="")
              location.href=
                `products.html?kwords=${this.kword}`;
          },
          signout(){
            $.ajax({
              url:"http://localhost:3000/users/signout",
              type:"get",
              success:()=>{       
                this.islogin=false 
              }
            })
          }
        }
      })
    }
  })
})