const moment = require('moment')
const Order = require('../models/Order')

const errorHandler = require('../utils/errorHandler')

//localhost:5000/api/auth/overview
module.exports.overview = async function (req, res) {
	try {
		const allOrders = await Order.find({user: req.user.id}).sort({data: 1})
		// создание карты для корректного подсчёта дней, в которые производились действия
		const ordersMap = getOrdersMap(allOrders)
		// заказов ВЧЕРА
		const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || []
		//Количество заказов ВЧЕРА
		const yesterdayOrdersNumbers = yesterdayOrders.length

		//Количество заказов
		const totalOrdersNumber = allOrders.length
		//Всего количество дней
		const daysNumber = Object.keys(ordersMap).length
		//Заказов в день(округляем до 0 знаков после запятой)
		const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(0)
		//Процент для количества заказов ((заказов вчера/кол-во заказов в день )-1)*100
		const ordersPercent = (((yesterdayOrdersNumbers / ordersPerDay) - 1) * 100).toFixed(2)
		//Общая выручка
		const totalGain = calculatePrice(allOrders)
		//Выручка в день
		const gainPerDay = totalGain / daysNumber
		//Выручка за вчера
		const yesterdayGain = calculatePrice(yesterdayOrders)
		//Процент выручки
		const gainPercent = (((yesterdayGain / gainPerDay) - 1) * 100).toFixed(2)
		//Сравнение выручки
		const compareGain = (yesterdayGain - gainPerDay).toFixed(2)
		//Сравнение количества заказов
		const compareNumber = (yesterdayOrdersNumbers - ordersPerDay).toFixed(2)

		res.status(200).json({
			gain: {
				percent: Math.abs(+gainPercent),
				compare: Math.abs(+compareGain),
				yesterday: +yesterdayGain,
				isHigher: gainPercent > 0
			},
			orders: {
				percent: Math.abs(+ordersPercent),
				compare: Math.abs(+compareNumber),
				yesterday: +yesterdayOrdersNumbers,
				isHigher: ordersPercent > 0
			}
		})

	} catch (e) {
		errorHandler(res, e)
	}
}


//localhost:5000/api/auth/analytic
module.exports.analytics = async function (req, res) {
	try {
		const allOrders = await Order.find({user: req.user.id}).sort({date: 1})
		const ordersMap = getOrdersMap(allOrders)
		const average = +(calculatePrice(allOrders) / Object.keys(ordersMap).length).toFixed(2)
		const chart = Object.keys(ordersMap).map(label => {
			//label == 05.05.2021
			const gain = calculatePrice(ordersMap[label])
			const order = ordersMap[label].length
			return {label, order, gain}
		})
		res.status(200).json({average, chart})
	} catch (e) {
		errorHandler(res, e)
	}
}

//const ordersMap
function getOrdersMap(orders = []) {
	const daysOrders = []
	orders.forEach(order => {
		const date = moment(order.date).format('DD.MM.YYYY')
		if (date === moment().format('DD.MM.YYYY')) {
			return
		}
		if (!daysOrders[date]) {
			daysOrders[date] = []
		}
		daysOrders[date].push(order)
	})
	return daysOrders
	/* Получаем объект на выходе
			{
				'12.05.2020':[
					{//order}
					{//order}
					{//order}
					{//order}
				]
			}
	*/
}

//const totalGain
function calculatePrice(orders = []) {
	return orders.reduce((total, order) => {
		const orderPrice = order.list.reduce((orderTotal, item) => {
			return orderTotal += item.cost * item.quantity
		}, 0)
		return total += orderPrice
	}, 0)
}


