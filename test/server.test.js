// test/server.test.js
const assert = require('assert');
const http = require('http');
const server = require('../server'); // Import the server instance

const PORT = 8080;

describe('Server', function () {
  // Start the server before running tests
  before(function (done) {
    server.listen(PORT, done);
  });

  // Close the server after running all tests
  after(function (done) {
    server.close(done);
  });

  it('should return 200 status code', function (done) {
    http.get(`http://localhost:${PORT}`, function (res) {
      assert.strictEqual(res.statusCode, 200);
      done();
    });
  });

  it('should say "Hello, world!"', function (done) {
    http.get(`http://localhost:${PORT}`, function (res) {
      let data = '';
      res.on('data', (chunk) => {
         data += chunk;
      });
      res.on('end', () => {
        assert.strictEqual(data, 'Hello, world!');
        done();
      });
    });
  });
});
