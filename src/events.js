const { terminal } = require("terminal-kit");

function setupGlobalKeyEvents() {
  terminal.on("key", name => {
    if (name === "CTRL_C") {
      terminal.clear();
      process.exit();
    }
  });
}

module.exports = {
  setupGlobalKeyEvents
};
