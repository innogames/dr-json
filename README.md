# What is Dr. Json?

Dr. Json is a **JSON file editor**. It lets you manage your JSON files based on your JSON Schemas.

To set it up for your project, you need to:

- Create a folder with all your [JSON Schema files](./docs/json-schema.md).
- Create a [project file (dr.json)](./docs/project-file.md).

# Installation

Just [download it here](https://github.com/innogames/dr-json/releases) and execute it.


# Development

## Requirements:

- node.js (developed with node version 8.5.0)
- [yarn](https://yarnpkg.com/en/docs/install)

## Install dependencies

Go to the root folder of this project and run `yarn` to install all dependencies.

## Run application

- `yarn run dev`:  open app in development mode
- `yarn run dist`: create executable binaries for Mac and Windows



# Tech stack

- [Electron](https://electronjs.org/) (Creates desktop application using web technologies)
- [Webpack](https://webpack.js.org/) (Bundles source files and assets)
- [Typescript](https://www.typescriptlang.org/) (Typed JavaScript)
- [React](https://reactjs.org/) (for component based UI)
- [MobX](https://mobx.js.org) (to store application state in observable objects)
