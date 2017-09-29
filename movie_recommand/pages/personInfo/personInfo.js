var app = getApp()
Page({
  data:{
    cells: []
  },
  onLoad:function(options){
    var that = this
    let data = app.globalData.userDataInfo;
    var cells = [[],[],[]]
    cells[0].push({title: '姓名', text: data.userName == '' ? '未填写' : data.userName, access: false, fn: ''})
    cells[0].push({title: '昵称', text: data.nickName == null ? '未填写' : data.nickName, access: false, fn: ''})
    cells[0].push({title: '性别', text: data.sex == 0 ? '男' : '女', access: false, fn: ''})
    cells[0].push({title: '年龄', text: data.age == 0 ? '未填写' : data.age, access: false, fn: ''})
    cells[0].push({title: '生日', text: data.birthday == '0000-00-00' ? '未填写' : data.birthday, access: false, fn: ''})
    cells[0].push({title: '星座', text: data.star == '' ? '未填写' : data.star, access: false, fn: ''})
    cells[1].push({title: '公司', text: data.company == '' ? '未填写' : data.company, access: false, fn: ''});
    cells[1].push({title: '学校', text: data.school == '' ? '未填写' : data.school, access: false, fn: ''});
    cells[1].push({title: '手机号码', text: data.iphone == 0 ? '未填写' : data.iphone, access: false, fn: ''});
    cells[1].push({title: '邮箱', text: data.email == '' ? '未填写' : data.email, access: false, fn: ''});
    cells[2].push({title: '个性签名', text: data.sign == '' ? '未填写' : data.sign, access: false, fn: ''});
    console.log("cells",cells);
    that.setData({
      cells: cells
    })
  }
})