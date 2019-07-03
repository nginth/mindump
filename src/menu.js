const { terminal } = require("terminal-kit");

function showMenu(items) {
  terminal.clear();
  return new Promise((resolve, reject) => {
    terminal.singleColumnMenu(items, (error, response) => {
      if (error) {
        return reject(error);
      }
      resolve(response.selectedIndex);
    });
  });
}

module.exports = {
  showMenu
};
