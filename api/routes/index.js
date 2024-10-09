import fs from 'fs';
import express from 'express';

const app = express();

fs.readdir(__dirname, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      if (file.endsWith('.js') && !file.indexOf('index.js')) return;
      const routeName = file.slice(0, -3).toLowerCase();
      const routeFile = require(`./${file}`).default;
      app.use(`/${routeName}`, routeFile);
    });
  }
});

export default app;