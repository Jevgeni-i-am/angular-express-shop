const Category = require('../models/Category')
const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')


module.exports.getAll = async function (req, res) {
	try {
		const categories = await category.find({user: req.user.id})
		res.status(200).json(categories)
	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.getById = async function (req, res) {
	try {
		const category = await category.findById(req.params.id)
		res.status(200).json(category)
	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.remove = async function (req, res) {
	try {
		await Category.remove({_id: req.params.id})
		await Positionremove({category: req.params.id})
		res.status(200).json({
			message: 'Категория удалена'
		})
	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.create = async function (req, res) {
	const category = new Category({
		name: req.body.name,
		user: reg.body.id,
		imageSrc: req.file ? req.file.path : ''
	})

	try {
		await category.save()
		res.status(201).json(category, {message: 'Picture uploaded'})
	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.update = async function (req, res) {
	const updated = {
		name: req.body.name
	}
	if (req.file) {
		updated.imageScr = req.file.path
	}
	try {
		const category = await Category.findOneAndUpdate(
			{_id: req.params.id},
			{$set: updated},
			{new: true}
		)
		res.status(200).json(category)
	} catch (e) {
		errorHandler(res, e)
	}
}

