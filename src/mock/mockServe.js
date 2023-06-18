//mock模拟假数据
import mock from 'mockjs'
//引入json数据   (json数据格式默认对外暴漏)
//webpack默认对外暴露的：图片、JSON数据格式
import banner from './banner.json'
import floor from './floor.json'

//mock数据:第一个参数请求地址 第二个参数：生成数据
mock.mock('/mock/banner',{code:200,data:banner})
mock.mock('/mock/floor',{code:200,data:floor})