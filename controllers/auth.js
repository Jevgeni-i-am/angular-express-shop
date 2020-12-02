
//localhost:5000/api/auth/login
module.exports.login = function (req, res) {
	res.status(200).json({
		login: {
			email:req.body.email,
			password:req.body.password
		}
	})
}
//localhost:5000/api/auth/register
module.exports.register = function (req, res) {
	res.status(200).json({
		register: true
	})
}