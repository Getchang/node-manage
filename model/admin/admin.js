'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const adminSchema = new Schema({
	user_name: String,
	password: String,
	id: Number,
	email: String,
	create_time: String,
	Phone: Number,
	admin: {type: String, default: '管理员'},
	status: Number,  //1:普通管理、 2:超级管理员
	avatar: {type: String, default: 'default.jpg'},
})

adminSchema.index({id: 1});

const AdminModel = mongoose.model('Admin', adminSchema);


export default AdminModel
