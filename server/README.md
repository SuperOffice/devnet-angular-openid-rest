# SuperOffice DevNet Example Node Server

An example node server that demonstrates receiving webhook messages from [NGROK](https://ngrok.com/), and making them available for listening clients on the local dev machine.

## Build

Clone the repository on to your machine, then open the folder using a code editor such as Visual Studio Code. Open a terminal/console window in the same folder and then type the following to have gulp transpile the typescript into javascript into the dist folder:

    gulp build

To run the example, type the following in the terminal/console window to run the application:

    npm start

Finally, in a ngrok console, oberve that the tunnel has completed a tunnel to this local server.

## Dislaimer

This is a first attempt at creating a NodeJs application and may have some inconsistancies. It is not production ready and should not be used as such. Use at your own risk!!!

This id **not** a NodeJs or TypeScript tutorial, just an example application that demonstrates how to leverage NGROK to pass webhook data to a local dev machine.
