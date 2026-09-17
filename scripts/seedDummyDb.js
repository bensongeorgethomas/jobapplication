const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const User = require('../models/User');
const Job = require('../models/Job');
const { users, jobs } = require('../data/dummyDatabase');

dotenv.config();

const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
const shouldClearOnly = process.argv.includes('--clear');

const getDummyUserEmails = () => users.map((user) => user.email);

const clearDummyData = async () => {
  const dummyUserEmails = getDummyUserEmails();
  const dummyUsers = await User.find({ email: { $in: dummyUserEmails } }).select('_id');
  const dummyUserIds = dummyUsers.map((user) => user._id);

  const deletedJobs = dummyUserIds.length
    ? await Job.deleteMany({ user: { $in: dummyUserIds } })
    : { deletedCount: 0 };
  const deletedUsers = await User.deleteMany({ email: { $in: dummyUserEmails } });

  return {
    jobs: deletedJobs.deletedCount,
    users: deletedUsers.deletedCount,
  };
};

const seedDummyData = async () => {
  const cleared = await clearDummyData();
  const userIdByEmail = new Map();

  for (const user of users) {
    const password = await bcrypt.hash(user.password, 10);
    const createdUser = await User.create({
      name: user.name,
      email: user.email,
      password,
      avatar: user.avatar,
    });

    userIdByEmail.set(user.email, createdUser._id);
  }

  const jobDocuments = jobs.map(({ userEmail, ...job }) => ({
    ...job,
    user: userIdByEmail.get(userEmail),
  }));

  const createdJobs = await Job.insertMany(jobDocuments);

  return {
    cleared,
    createdUsers: users.length,
    createdJobs: createdJobs.length,
  };
};

const run = async () => {
  if (!mongoUri) {
    throw new Error('Missing MONGO_URI or MONGODB_URI. Add one to .env before seeding.');
  }

  await mongoose.connect(mongoUri);

  if (shouldClearOnly) {
    const cleared = await clearDummyData();
    console.log(`Cleared ${cleared.users} dummy user(s) and ${cleared.jobs} dummy job(s).`);
    return;
  }

  const result = await seedDummyData();
  console.log(
    `Seeded ${result.createdUsers} dummy user(s) and ${result.createdJobs} dummy job(s).`
  );
  console.log(
    `Removed previous dummy data first: ${result.cleared.users} user(s), ${result.cleared.jobs} job(s).`
  );
  console.log('Login with demo.student@example.com / password123');
};

run()
  .catch((error) => {
    console.error(`Seed failed: ${error.message}`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
