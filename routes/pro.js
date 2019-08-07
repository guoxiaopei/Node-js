const express=require('express');
const pool=require('../pool.js');
let router=express.Router();
//登录接口 get
router.get("/api/v1/login/:uname&:upwd",function(req,res){
	var $uname=req.params.uname;
	var $upwd=req.params.upwd;
	pool.query('select * from xz_user where uname=? and upwd=?',[$uname,$upwd],function(err,result){
		if(err){throw err}
		if(result.length>0){
			res.send('1');
		}else{
			res.send('0');
		}
	});
});
//查询所有用户 get
router.get('/api/v1/userlist',function(req,res){
	pool.query('select * from xz_user',function(err,result){
		res.send(result);
	});
});
//根据uid删除用户 delete
router.delete('/api/v1/deluser/:uid',function(req,res){
	var $uid=req.params.uid;
	pool.query('delete from xz_user where uid=?',[$uid],function(err,result){
		if(result.affectedRows>0){
			res.send('1');
		}else{
			res.send('0');
		}
	});
});
//根据uid查询某个用户 get
router.get('/api/v1/searchuser/:uid',function(req,res){
	var $uid=req.params.uid;
	pool.query('select * from xz_user where uid=?',[$uid],function(err,result){
		if(result.length>0){
			res.send(result);
		}else{
			res.send('0');
		}
	});
});
//注册 post 有请求主体
router.post('/api/v1/register',function(req,res){
	var obj=req.body;
	pool.query('insert into xz_user set ?',[obj],function(err,result){
		if(err){throw err}
		if(result.affectedRows>0){
			res.send('1');
		}else{
			res.send('0');
		}
	});
	//INSERT  INTO  student  VALUES (‘1’,’tom’,’m’,’85’);
});
//修改用户信息 put 有请求主体
router.put('/api/v1/updateuser',function(req,res){
	var obj=req.body;
	var $uid=req.body.uid;
	pool.query('update xz_user set ? where uid=?',[obj,$uid],function(err,result){
		if(err){throw err}
		if(result.affectedRows>0){
			res.send('1');
		}else{
			res.send('0');
		}
	});
	//UPDATE  student  SET  sex=’f’,score=’97’ WHERE sid=’4’;
});
//验证用户可否注册
router.get('/api/v1/check/:uname',function(req,res){
	var $uname=req.params.uname;
	pool.query('select uid,uname from xz_user where uname=?',[$uname],function(err,result){
		if(err){throw err}
		if(result.length>0){
			res.send("0");
		}else{
			res.send("1");
		}
	});
});
module.exports=router;