const express = require('express');
const internController = require('./internController');

const router = express.Router();

router
	.route('/')
	.get(internController.getAllInterns)
	.post(internController.registerIntern);

router
	.route('/:id')
	.get(internController.getIntern)
	.patch(internController.updateIntern)
	.delete(internController.deleteIntern);

router.get('/excel/file', internController.getExcelFile);

router.post('/user/email', internController.sendEmail);

module.exports = router;
