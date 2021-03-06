const path = require("path");

module.exports = {
    stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: ["@storybook/addon-actions", "@storybook/addon-links", "@storybook/preset-scss"],
};
