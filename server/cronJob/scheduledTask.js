module.exports = function runSheduledTask(logger) {
  const pid = process.pid;

  logger.info("PID of cron job", pid);
  logger.info("Running shedueled task every minute");

  const UserData = require("../mongo");

  async function getAllUsers() {
    var allUsers = [];
    //query for all items in userdata collection
    const cursor = await UserData.find({});

    await cursor.forEach((item) => {
      allUsers.push(item);
    });

    return allUsers;
  }

  users = getAllUsers();

  console.log("ALL USERS!!!", users);
};
