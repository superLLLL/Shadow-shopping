/*
 * @Description: 
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2018-10-22 17:29:02
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-09-06 10:17:08
 */
new Vue({
  el:'#main>div:nth-child(2)>h3:first-child',
  data:{ 
    res:[
      {price:0},   //保证首屏不出错(初始化不报错)
      {price:0},
      {price:0}
    ]
   },
  mounted(){
     //this-vm
       axios.get('http://localhost:3000/index/getIndexProducts' )
            .then(res=>this.res = res.data);
  },
})
