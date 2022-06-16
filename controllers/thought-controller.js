const { Thought, User } = require("../models");

const thoughtController = {
	// get all thoughts
	getAllThoughts(req, res) {
		Thought.find({})
			.populate({ path: "reactions", select: "-__v" })
			.select("-__v")
			.then((dbThoughtData) => res.json(dbThoughtData))
			.catch((err) => res.status(400).json(err));
	},

	// get one thought by id
	getThoughtById({ params }, res) {
		Thought.findOne({ _id: params.id })
			.populate({ path: "reactions", select: "-__v" })
			.select("-__v")
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.status(400));
	},

	// create a thought
	createThought({ body }, res) {
		// example data, replace <thought> with your thought
		// {
		//   "thoughtText": "<thought>",
		//   "username": "<username>",
		//   "userId": "<userId>"
		// }
		Thought.create({ thoughtText: body.thoughtText, username: body.username })
			.then(({ _id }) =>
				User.findOneAndUpdate(
					{ _id: body.userId },
					{ $push: { thoughts: _id } },
					{ new: true }
				)
			)
			.then((dbThoughtData) => res.json(dbThoughtData))
			.catch((err) => res.json(err));
	},

	// update a thought by id
	updateThought({ params, body }, res) {
		Thought.findOneAndUpdate({ _id: params.id }, body, {
			new: true,
			runValidators: true,
		})
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					return res
						.status(404)
						.json({ message: "No thought found with this id!" });
				}
				res.json(dbThoughtData);
			})
			.catch((err) => res.json(err));
	},

	// delete a thought by id
	deleteThought({ params }, res) {
		Thought.findOneAndDelete({ _id: params.id })
			.then((dbThoughtData) => res.json(dbThoughtData))
			.catch((err) => res.json(err));
	},

	// create a reaction
	createReaction({ params, body }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{
				$push: {
					reactions: {
						reactionBody: body.reactionBody,
						username: body.username,
					},
				},
			},
			{ new: true, runValidators: true }
		)
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					return res
						.status(404)
						.json({ message: "No thought found with this id!" });
				}
				res.json(dbThoughtData);
			})
			.catch((err) => res.json(err));
	},

	// remove a reaction
	removeReaction({ params }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $pull: { reactions: { _id: params.reactionId } } },
			{ new: true, runValidators: true }
		)
			.then((dbThoughtData) => res.json(dbThoughtData))
			.catch((err) => res.json(err));
	},
};

module.exports = thoughtController;
