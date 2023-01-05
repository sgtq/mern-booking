import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	country: {
		type: String,
		required: true,
	},
	img: {
		type: String,
	},
	city: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
},
{ 
	timestamps: true,
	collection: 'booking-users'
});

export default mongoose.model('User', userSchema);