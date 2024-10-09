import fs from 'fs';
import express from 'express';
import Token from '../helpers/token'

const app = express();

fs.readdir(__dirname, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      if (file.endsWith('.js') && !file.indexOf('index.js')) return;
      const routeName = file.slice(0, -3).toLowerCase();
      const routeFile = require(`./${file}`).default;
      if (routeName === "auth") {
        app.use(`/${routeName}`, routeFile);
      } else {
        // app.use(`/${routeName}`, Token.verifyToken, routeFile);
        app.use(`/${routeName}`, routeFile);

      }
    });
  }
});

export default app;