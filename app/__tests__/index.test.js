const sum = require('../public/js/index');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

        //"test": "start-server-and-test start http://127.0.0.1:3000 cypress:open"