const { User, Thought } = require("../models");

const userController = {
	// get all users
	getAllUsers(req, res) {
		User.find({})
			.populate({ path: "friends", select: "-__v" })
			.populate({ path: "thoughts", select: "-__v" })
			.select("-__v")
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.status(400).json(err));
	},

	// get one user by id
	getUserById({ params }, res) {
		User.findOne({ _id: params.id })
			.populate({ path: "friends", select: "-__v" })
			.populate({
				path: "thoughts",
				select: "-__v",
				populate: { path: "reactions" },
			})
			.select("-__v")
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.status(400));
	},

	// create a user
	createUser({ body }, res) {
		// example data, replace <username> and <email address> with your info
		// {
		//   "username": "<username>",
		//   "email": "<email address>"
		// }
		User.create({ body })
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.json(err));
	},

	// update a user by id
	updateUser({ params, body }, res) {
		User.findOneAndUpdate({ _id: params.id }, body, {
			new: true,
			runValidators: true,
		})
			.then((dbUserData) => {
				if (!dbUserData) {
					return res
						.status(404)
						.json({ message: "No user found with this id!" });
				}
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},

	// remove a user by id
	deleteUser({ params }, res) {
		User.findOneAndDelete({ _id: params.id })
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.json(err));
	},

	// add a new friend
	addFriend({ params, body }, res) {
		User.findOneAndUpdate(
			{ _id: params.userId },
			{ $push: { friends: body } },
			{ new: true, runValidators: true }
		)
			.then((dbUserData) => {
				if (!dbUserData) {
					return res
						.status(404)
						.json({ message: "No user found with this id!" });
				}
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},

	// remove a friend
	removeFriend({ params }, res) {
		User.findOneAndUpdate(
			{ _id: params.userId },
			{ $pull: { friends: { friendId: params.friendId } } },
			{ new: true }
		)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.json(err));
	},
};

module.exports = userController;
