# Developer documentation

## Requirements

- node.js (developed with node version 8.12.0)
- [yarn](https://yarnpkg.com/en/docs/install)


## Set-up

Clone this repository, go to the root folder of this project and run `yarn` to install all dependencies.


## Commands

| Command         | Description
| --------------- | -----------
| `yarn run dev`  | Start app in development mode
| `yarn run test` | Execute tests
| `yarn run dist` | Create executable binaries for Mac and Windows


## Create new release

1. Update the version by executing one of the following commands:
  ```bash
  yarn version --major
  yarn version --minor
  yarn version --patch
  ```

  > This will update the version in **package.json** as well as creating a new **git tag**.

2. Run `git push` to push to master and then `git push --tags` to also include the new tags. Now the new version will be created by [TravisCI](https://travis-ci.org/innogames/dr-json) automatically.

3. When the build is done, add the changelog to the release description of the [latest release here](https://github.com/innogames/dr-json/releases)
(You need to write the changelog manually by checking the commits. There is no automatic solution right now).


## Tech stack

- [Typescript](https://www.typescriptlang.org/) (Typed JavaScript)
- [Electron](https://electronjs.org/) (Creates desktop application using web technologies)
- [Webpack](https://webpack.js.org/) (Bundles source files and assets)
- [React](https://reactjs.org/) (for component based UI)
- [MobX](https://mobx.js.org) (to store application state in observable objects)
- [InversifyJS](http://inversify.io/) (dependency injection container)
- [Jest](https://facebook.github.io/jest) (Testing framework)

## Architecture / Layers

See details about the [Architecture and Layers here](./developer/architecture.md).
