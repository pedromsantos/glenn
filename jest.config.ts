module.exports = {
  moduleNameMapper: {
    // effectively ignores any css imports within modules
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],

  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/index.{js,jsx,ts,tsx}',
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
