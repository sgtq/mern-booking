import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true,
	},
	maxPeople: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		default: false
	},
	roomNumbers: [{
		number: Number,
		unavailableDates: {
			type: [Date]
		}
	}],
},
{ 
	timestamps: true,
	collection: 'booking-rooms'
});

export default mongoose.model('Room', roomSchema);