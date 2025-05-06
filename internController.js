const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
const APIFeatures = require('./utils/apiFeatures');
const Intern = require('./internModel');
const Exceljs = require('exceljs');
const {
	transporter,
	createWelcomeEmailText,
	createWelcomeEmailHTML,
} = require('./utils/sendEmail');

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

exports.sendManyEmails = async (req, res) => {
	try {
		const { users } = req.body;

		// Validate request
		if (!users || !Array.isArray(users) || users.length === 0) {
			return res.status(400).json({
				error:
					'Please provide an array of user objects with email and name properties',
			});
		}

		// Track successful and failed email sends
		const results = {
			success: [],
			failed: [],
		};

		// Send emails to each user
		for (const user of users) {
			if (!user.email) {
				results.failed.push({ user, error: 'Missing email address' });
				continue;
			}

			try {
				await transporter.sendMail({
					from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
					to: user.email,
					subject: 'Welcome to Our Platform!',
					text: createWelcomeEmailText(user.name),
					html: createWelcomeEmailHTML(user.name),
				});

				results.success.push(user);
			} catch (error) {
				console.error(`Failed to send email to ${user.email}:`, error);
				results.failed.push({ user, error: error.message });
			}
		}

		return res.json({
			message: `Successfully sent ${results.success.length} emails, ${results.failed.length} failed`,
			results,
		});
	} catch (error) {
		console.error('Error sending welcome emails:', error);
		return res.status(500).json({ error: 'Failed to send welcome emails' });
	}
};

exports.sendEmail = async (req, res) => {
	try {
		const { email, name } = req.body;

		if (!email) {
			return res.status(400).json({ error: 'Please provide an email address' });
		}

		await transporter.sendMail({
			from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
			to: email,
			subject: 'Welcome to Our Platform!',
			text: createWelcomeEmailText(name, 'General'),
			html: createWelcomeEmailHTML(name, 'General'),
		});

		return res.json({ message: 'Test welcome email sent successfully' });
	} catch (error) {
		console.error('Error sending test welcome email:', error);
		return res.status(500).json({ error: 'Failed to send test welcome email' });
	}
};
