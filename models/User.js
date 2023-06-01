const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema(
	{
		username: {
			type: "string",
			unique: true,
			required: true,
			contentMediaType: "application/x-trimmed",
		},
		email: {
			type: "string",
			required: true,
			unique: true,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				"Please use a valid email address",
			],
		},
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: "Thought",
			},
		],
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

userSchema.virtual("friendCount").get(function () {
	return this.friends.length;
});
const User = model("User", userSchema);
module.exports = User;
