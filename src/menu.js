const { terminal } = require("terminal-kit");

function singleColumnMenu(actions) {
  return new Promise((resolve, reject) => {
    terminal.singleColumnMenu(
      Object.keys(actions),
      menuCallback(resolve, reject)
    );
  });
}
function singleRowMenu(actions, options = {}) {
  return new Promise((resolve, reject) => {
    terminal.singleRowMenu(
      Object.keys(actions),
      options,
      menuCallback(resolve, reject)
    );
  });
}

function menuCallback(resolve, reject) {
  return (error, response) => {
    if (error) {
      return reject(error);
    }
    resolve({
      selectedText: response.selectedText,
      selectedIndex: response.selectedIndex
    });
  };
}

module.exports = {
  singleColumnMenu,
  singleRowMenu
};
