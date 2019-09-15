/*
 * @Description: 
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2018-10-19 10:38:20
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-09-02 19:25:12
 */
new Vue({
  el:'#container',
  data:{
    uname:"dingding",
    upwd:'123456'
  },
  methods:{
    signin(){
      (async ()=>{
        var res=await axios.post("http://localhost:3000/users/signin",
                                 Qs.stringify({uname : this.uname,upwd : this.upwd}));
        res = res.data;
        if(res.ok==0)
          alert(res.msg);
        else{
          alert("登录成功！即将返回来时的页面...")
          if(location.search.startsWith("?back=")){
            var url=location.search.slice(6)
          }else{
            var url="index.html"
          }
          location.href=url;
        }
      })()
    }
  },
})


