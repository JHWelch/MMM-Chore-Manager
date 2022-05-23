# MMM-Chore-Manager

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

Integration for [Chore Manager](https://github.com/JHWelch/ChoreManager) web application.

![Screenshot of the application in use.](/images/screenshot.png?raw=true "Screenshot")

## Installation

In ~/MagicMirror/modules
```sh
git clone https://github.com/JHWelch/MMM-Chore-Manager.git
```
Install NPM dependencies
```sh
cd MMM-Chore-Manager
npm install
```

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'MMM-Chore-Manager',
            config: {
                // See below for configurable options
            }
        }
    ]
}
```

## Configuration options

| Option           | Description
|----------------- |-----------
| `apiUrl` | *Required* URL to api, should end without slash. *http://example.com/api*
| `apiKey` | *Required* Api Key for Chore Manager instance.
| `teamId` | *Required* Team for whom to show chores.
| `updateInterval` | *Optional* Resfresh time in milliseconds <br>Default 60000 milliseconds (1 minute)

## Testing
There is a test suite using Jest.
```sh
npm test
```
