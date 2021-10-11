'use strict';

import AdminModel from "../../model/admin/admin";
import formidable from "formidable";
import dtime from 'time-formater'
import BaseComponent from "../../prototype/baseComponent";

class Admin extends BaseComponent{
  constructor(){
		super()
		this.login = this.login.bind(this)
		this.register = this.register.bind(this)
		// this.encryption = this.encryption.bind(this)
		// this.updateAvatar = this.updateAvatar.bind(this)
	}
  async register (req, res, next) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      if (err) {
				res.send({
					status: 0,
					type: 'FORM_DATA_ERROR',
					message: '表单信息错误'
				})
				return
			}
      const {user_name, password, phone, email, status = 1} = fields;
      console.log(fields, files)
			try{
				if (!user_name) {
					throw new Error('用户名错误')
				}else if(!password){
					throw new Error('密码错误')
				}
			}catch(err){
				console.log(err.message, err);
				res.send({
					status: 0,
					type: 'GET_ERROR_PARAM',
					message: err.message,
				})
				return
			}
			try{
				const admin = await AdminModel.findOne({user_name})
				if (admin) {
					console.log('该用户已经存在');
					res.send({
						status: 0,
						type: 'USER_HAS_EXIST',
						message: '该用户已经存在',
					})
				} else {
					const adminTip = status == 1 ? '管理员' : '超级管理员'
					const admin_id = await this.getId('admin_id');
					// const newpassword = this.encryption(password);
					const newAdmin = {
						user_name, 
						password,
						id: admin_id,
						phone,
						email,
						create_time: dtime().format('YYYY-MM-DD'),
						admin: adminTip,
						status,
					}
					await AdminModel.create(newAdmin)
					// req.session.admin_id = admin_id;
					res.send({
						status: 1,
						message: '注册管理员成功',
					})
				}
			}catch(err) {
				console.log('注册管理员失败', err);
				res.send({
					status: 0,
					type: 'REGISTER_ADMIN_FAILED',
					message: '注册管理员失败',
				})
			}
      res.send({code: 1, msg: '成功'})
    })
  }
  async login () {

  }
}
export default new Admin()