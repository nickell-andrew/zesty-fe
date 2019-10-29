## How to run with [Engineering Test FS](https://github.com/zestyai/engineering-test-fs)
1) Clone both repos: `git clone git@github.com:nickell-andrew/zesty-fe`<br/>
`git clone git@github.com:zestyai/engineering-test-fs`
2) Start up API services: `cd engineering-test-fs && docker-compose up`
3) Setup Client in another terminal:
- cd into client dir `cd zesty-fe`
- Setup .env file: create by running `cp .env.example .env` then edit REACT_APP_API_KEY to your google maps API_KEY
- Install Dependencies and Run FE dev mode: `yarn && yarn start`
4) Open localhost:3000 and view

## NOTES
### Features implemented:
#### Visual Search view based on user's current location
- Set Map Zoom very far in order to find relevant geodata
- Set Radius from user location very far in order to find relevant geodata
- Implement `/find` API to find nearby geodata markers
- Implement `/statistics` API to show stats for a location by propertyId
- Implement `/display` API (found out later that it returned images and didn't need it. Oh well)
- Show markers on the map
- Show loader while fetching data
- Implement Info Window showing property image using `/display` as well as relevant property info using `/statistics`
- Implement Click handlers to show and hide Info Windows

### Corners Cut
For various reasons (CORS and Library hunting for a decent google maps API integration lib) I didn't get as far as I would have liked.
- The biggest piece I would have liked to finish would be to finish the docker-compose work rather than using `yarn start`. 
- I would have liked to clean up the map view but it proved troublesome with the library I selected. Given more time I'd ensure that the map doesn't run below the bottom of the view screen thus preventing the render of a useless scrollbar and the inability to use the zoom out button
- Loader should have been full screen but I didn't bother to set the params for it
- Styles for the Info Window are a bit lacking.
- The image is rendered at a small scale, I'd like to implement a click handler to show the full size image
- The property information from /statistics lacks units and includes large trailing decimal points. I'd like to do some processing to show them as more meaningful values to the user (but I'd need to know units for them)

========================================

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
