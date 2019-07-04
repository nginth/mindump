const { terminal } = require("terminal-kit");

function setupKeyEvents() {
  terminal.on("key", name => {
    if (name === "CTRL_C") {
      terminal.clear();
      process.exit();
    }
  });
}

module.exports = {
  setupKeyEvents
};
