const bcrypt = require('bcryptjs')// password protect
const jwt = require('jsonwebtoken')// password token generations
const keys = require('../config/keys')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')


//localhost:5000/api/auth/login
module.exports.login = async function (req, res) {
	const candidate = await User.findOne({email: req.body.email})


	if (candidate) {
		//Пользователь существует, проверяем пароль на хеш
		const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
		if (passwordResult) {
			//Генерация токена, пароли совпали. 1.данные юзера, 2.Ключ, 3.Время экспирации токена
			const token = jwt.sign({
				email: candidate.email,
				userId: candidate._id
			}, keys.jwt, {expiresIn: 60 * 60})
			res.status(200).json({
				token: `Bearer ${token}`
			})
		} else {
			//ответ клиенту, пароли не совпали
			res.status(401).json({
				message: "Something goes wrong, try again"
			})

		}

	} else {
		//Пользователя нет, ошибка
		res.status(404).json({
			message: "Email not found"
		})
	}


}


//localhost:5000/api/auth/register
module.exports.register = async function (req, res) {
//email, password
	const candidate = await User.findOne({email: req.body.email})


	if (candidate) {
		//Пользователь существует, нужно отправить ощибку
		res.status(409).json({
			message: 'Такой имейл уже занят. Попробуйте другой'
		})

	} else {
		//Нужно создать пользователя
		const salt = bcrypt.genSaltSync(10)
		const password = req.body.password
		const user = new User({
			email: req.body.email,
			password: bcrypt.hashSync(password, salt)
		})


		try {
			await user.save()
			res.status(201).json(user)
		} catch (e) {
			//Обработать ошибку
			errorHandler(res, e)

		}

	}
}

