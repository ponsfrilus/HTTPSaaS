const { spawn } = require('child_process');
const request = require('request');
const test = require('tape');

// Start the app
const env = Object.assign({}, process.env, {port: 3000});
const child = spawn('node', ['index.js'], {env});

test('responds to requests', (t) => {
  t.plan(3);

  // Wait until the server is ready
  child.stdout.on('data', _ => {
    // Make a request to our app
    request('http://127.0.0.1:'+env.port, (error, response, body) => {
      // stop the server
      child.kill();

      // No error
      t.false(error);
      // Successful response
      t.equal(response.statusCode, 200);
      // Assert content checks
      t.equal(body, 'HTTP Statuses As A Service (HTTPSaaS)');
    });
  });
});