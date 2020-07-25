# NodeJS Youtube API

<div>
<img src="https://img.shields.io/badge/youtubeAPI-v1.0.0-brightgreen" />&nbsp;
<img src="https://img.shields.io/badge/Node-v12.18.2-brightgreen" />
&nbsp;
<img src="https://img.shields.io/badge/NPM-v6.14.6-brightgreen" />
</div>
Node.js API for building a youtube clone. This api is REST based and consists of a number of endpoints.
The basic structure of all the endpoints is like`{protocol}{host}{port}/api/v1/{route}`

The api routes can be found in postman export named **postman.json** file available in the root of this project.

In order to start development follow the following steps.

```
Download ffmpeg & ffprobe executable binaries and put them inside the "FFMPEG" folder in the root of the project.
```

```
Import all the routes in postman from the postman export named "postman.json" in order for fast development and testing.
```

Add the following environment Variables in your system path.

```
DATABASE_URL
JWT_KEY
NODE_ENV
```

### Start Development

open terminal / CMD navigate to the project directory and type the following npm command to start a development server.

```
npm run dev
```

## Technology Stack

The major technologies used in this project are.<br /><br />
**NODE.JS** v12.18.2<br />
**NPM** v6.14.6<br />
**express** v4.17.1<br />
**fluent-ffmpeg** v2.1.2<br />
**sequelize** v6.3.3 with **postgresql**<br />
**json web tokens**<br />

## License

MIT
