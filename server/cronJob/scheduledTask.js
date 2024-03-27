module.exports = function runSheduledTask(logger) {
  const pid = process.pid;

  logger.info("PID of cron job", pid);
  logger.info("Running shedueled task every minute");
};
