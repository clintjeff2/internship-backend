const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
const APIFeatures = require('./utils/apiFeatures');
const Intern = require('./internModel');
const Exceljs = require('exceljs');

exports.registerIntern = catchAsync(async (req, res, next) => {
	const newIntern = await Intern.create(req.body);

	res.status(201).json({
		status: 'Successful',
		data: {
			intern: newIntern,
		},
	});
});

exports.getAllInterns = catchAsync(async (req, res, next) => {
	const features = new APIFeatures(Intern.find(), req.query)
		.filter()
		.sort()
		.limitFields()
		.paginate();

	const interns = await features.query;

	// SEND RESPONSE
	res.status(200).json({
		status: 'success',
		results: interns.length,
		data: {
			interns,
		},
	});
});

exports.getIntern = catchAsync(async (req, res, next) => {
	const intern = await Intern.findById(req.params.id);

	if (!intern) {
		return next(new AppError('No intern found with this id', 404));
	}

	res.status(200).json({
		stauts: 'success',
		data: {
			intern,
		},
	});
});

exports.updateIntern = catchAsync(async (req, res, next) => {
	const intern = await Intern.findByIdAndUpdate(req.params.id, req.body, {
		runValidators: true,
		new: true,
	});
	if (!intern) {
		return next(new AppError('No intern found with this id', 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			intern,
		},
	});
});

exports.deleteIntern = catchAsync(async (req, res, next) => {
	const intern = await Intern.findByIdAndDelete(req.params.id);

	if (!intern) {
		return next(new AppError('No intern found with that ID', 404));
	}
	res.status(204).json({
		status: 'Successful',
		data: null,
	});
});

exports.getExcelFile = async (req, res) => {
	try {
		// Create a new workbook and worksheet
		const workbook = new Exceljs.Workbook();
		const worksheet = workbook.addWorksheet('LandmarkTech');

		// Define columns
		worksheet.columns = [
			{ header: 'Prefix', key: 'prefix', width: 15 },
			{ header: 'Names', key: 'names', width: 30 },
			{ header: 'Tel', key: 'tel', width: 30 },
		];

		// Style the header row
		worksheet.getRow(1).font = { bold: true };
		worksheet.getRow(1).fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: 'FFD3D3D3' },
		};

		// Fetch all interns from the database
		const interns = await Intern.find().sort({ name: 1 });

		// Map database records to Excel format
		const excelData = interns.map((intern, index) => {
			// Generate prefix with format BC25A001, BC25A002, etc.
			const prefixNum = (index + 1).toString().padStart(3, '0');
			const prefix = `BC25A${prefixNum}`;

			return {
				prefix: prefix,
				names: intern.name,
				tel: intern.phone,
			};
		});

		// Add rows to worksheet
		excelData.forEach((record) => {
			worksheet.addRow(record);
		});

		// Set appropriate headers for file download
		res.setHeader(
			'Content-Type',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		);
		res.setHeader('Content-Disposition', 'attachment; filename="interns.xlsx"');

		// Write workbook to response
		await workbook.xlsx.write(res);
		res.end();
	} catch (err) {
		console.error('Excel file generation error:', err);
		res.status(500).json({
			message: 'Error occurred while generating Excel file',
			error: err.message,
		});
	}
};
