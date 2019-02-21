module.exports = {
	ENV: process.env.NODE_ENV || 'development',
	PORT: process.env.PORT || 3000,
	URL: process.env.BASE_URL || 'http://localhost:3000',
	MONGO_URI: process.env.MONGODB_URI || 'mongodb://localhost/gallery_photos_db',
	JWT_SECRET: process.env.JWT_SECRET || 'secret1'
}