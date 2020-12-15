const multer = require('multer')
const moment = require('moment')


//Конфигурируем местоположение файлов
//Надо создать папку uploads и пустой файл .gitkeep во избежание ошибок
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'uploads/')
	},
	filename(req, file, cb) {
		const date = moment().format('DDMMYYYY-HHmmss_SSS')
		cb(null, `${date}-${file.originalname}`)
	}
})

//функция для фильтрации файлов при загрузке
const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
		cb(null, true)
	} else {
		cb(null, false)
	}
}

// Лимит загружаемого файла.
const limits = {fileSize: 1024 * 1024 * 5}

module.exports = multer({storage, fileFilter, limits})