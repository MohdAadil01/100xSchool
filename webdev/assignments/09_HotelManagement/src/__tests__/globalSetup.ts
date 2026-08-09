export default async function globalSetup() {
  process.env.JWT_SECRET = "test_jwt_secret_123";
  process.env.MONGO_URI = "mongodb://localhost:27017/test";
  process.env.SALT = "10";
  process.env.EMAIL_HOST = "smtp.test.com";
  process.env.EMAIL_PORT = "587";
  process.env.EMAIL_USER = "test@test.com";
  process.env.EMAIL_PASS = "testpassword";
  process.env.EMAIL_FROM_NAME = "Test Hotel";
  process.env.REDIS_HOST = "localhost";
  process.env.REDIS_PORT = "6379";
}
