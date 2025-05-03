import User from './models/User.js';

(async () => {
  await User.drop(); // This deletes the "users" table
  console.log('Users table deleted');
})();
