import mongoose from "mongoose";

const connect = async () => {
	try {
		mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to DB");
	} catch (err) {
		console.error(err);
		throw err;
	}
};

mongoose.connection.on('disconnected', () => {
	console.log('DB disconnected!');
});
mongoose.connection.on('connected', () => {
	console.log('Connected to Db!');
});

export default connect;