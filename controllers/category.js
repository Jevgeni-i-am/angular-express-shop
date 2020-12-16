const Category = require('../models/Category')
const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')


module.exports.getAll = async function (req, res) {
	try {
		const categories = await Category.find({user: req.user.id})
		res.status(200).json(categories)
		console.log('GET ALL CATEGORIES')
	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.getById = async function (req, res) {
	try {
		const category = await Category.findById(req.params.id)
		res.status(200).json(category)
		console.log('GET CATEGORY BY ID')
	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.remove = async function (req, res) {
	try {

		await Category.remove({_id: req.params.id})
		await Position.remove({category: req.params.id})
		res.status(200).json({message: 'Категория удалена'})
		console.log('REMOVE CATEGORY')
	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.create = async function (req, res) {
	const category = new Category({
		name: req.body.name,
		user: req.user.id,
		imageSrc: req.file ? req.file.path : ''
	})

	try {
		await category.save()
		res.status(201).json(category)
		console.log('CREATE CATEGORY')
	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.update = async function(req, res) {
	const updated = {
		name: req.body.name
	}

	if (req.file) {
		updated.imageSrc = req.file.path
	}

	try {
		const category = await Category.findOneAndUpdate(
			{_id: req.params.id},
			{$set: updated},
			{new: true}
		)
		res.status(200).json(category)
		console.log('CATEGORY WAS UPDATED')
	} catch (e) {
		errorHandler(res, e)
	}
}









