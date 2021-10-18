module.exports = {
  moduleNameMapper: {
    // effectively ignores any css imports within modules
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
  },
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  coverageThreshold: {
    global: {
      // TODO: specify this at some future date
      // branches: 100,
      // functions: 100,
      // lines: 100,
      // statements: 100,
    },
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/index.{js,jsx,ts,tsx}",
  ],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};
