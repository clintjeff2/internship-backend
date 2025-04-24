class APIFeatures {
	constructor(query, queryString) {
		(this.query = query), (this.queryString = queryString);
	}

	filter() {
		// To filter the results based on
		// /getting the query strings passed to the URL in a backup so we don't modisy the original one
		const queryObj = { ...this.queryString };

		// so we sort by level, specialty and supervisor
		const excludedFields = ['name', 'projectTopic'];

		excludedFields.forEach((el) => delete queryObj[el]);

		return this;
	}

	sort() {
		if (this.queryString.sort) {
			const sortBy = this.queryString.sort.split(',').join(' ');
			this.query = this.query.sort(sortBy);
		} else {
			this.query = this.query.sort('-createdAt');
		}

		return this;
	}
	limitFields() {
		if (this.queryString.fields) {
			const fields = this.queryString.fields.split(',').join(' ');
			this.query = this.query.select(fields);
		} else {
			this.query = this.query.select('-__v');
		}
		return this; // to return this so the next method can be chained on it when called
	}

	paginate() {
		const page = this.queryString.page * 1 || 1; // converting the page string to a number and setting default to 1
		const limit = this.queryString.limit * 1 || 1000;
		const skip = (page - 1) * limit;

		// page=3&limit=10, 1-10, page 1, 11-20, page 2
		this.query = this.query.skip(skip).limit(limit);

		/*  if (this.queryString.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exist');
    } */
		return this;
	}
}

module.exports = APIFeatures;
