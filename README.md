## Usage

```
npm install
npm start
```

Then open [http://localhost:8080/webpack-dev-server/index.html](http://localhost:8080/webpack-dev-server/index.html)

## Project Setup

This basic example follows the [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.z4oi835if) example. The logic is managed in Earth**Container** in the `containers/` directory. The view code,  entitites, etc, live in `components/`.

The logic is separated entirely from react and managed with the **reducer functions** in the `reducers/` folder.

The state is set once per `requesetAnimationFrame` callback in `EarthContainer.js`.

This project use Babel, Webpack, and ESLint for ES6 syntax, asset management and code quality tools.
