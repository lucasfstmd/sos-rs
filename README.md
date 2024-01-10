# Web-App - SEFAZ Collection

<div align="center">

[![React][react-bagde]][react-url]
[![Material UI][mui-badge]][mui-url]
[![Redux][redux-badge]][redux-url]
[![Typescript][typescript-badge]][typescript-url]

</div>

#### Features:

- Auth using JWT;
- Responsive layout;
- Internationalization with i18n.
- Redux Tolkit

## Prerequisites

- [Node 16.20.2](https://nodejs.org/en/download/)
- [ReactJS 17.0.2](https://pt-br.reactjs.org/)
- [Npm 7.8.0](https://www.npmjs.com) or  [Yarn 1.22.15](https://yarnpkg.com)

---

## Cloning the Project

```
https://github.com/SEFAZ-Arrecadacao/web-app.git
```

## Set the environment variables

Application settings are defined by environment variables. To define the settings, make a copy of the `.env.example`
file, naming for `.env`. After that, open and edit the settings as needed. The following environments variables are
available:

| VARIABLE                  | DESCRIPTION                                                        | DEFAULT                  |
|---------------------------|--------------------------------------------------------------------|--------------------------|
| `REACT_APP_LS_SECRET_KEY` | Encryption key used to encrypt data stored in localStorage.        | `s3cr3tk3y`              |
| `PORT`               | Port used by the application to listen to HTTP requests in a development environment. | `3000`                     |
| `REACT_APP_ISSUER` | Issuer used to generate the JWT token.        | `issuer`              |
| `REACT_APP_JWT_PUBLIC_KEY` | Public key for validating the jwt token.        | `-----BEGIN RSA PUBLIC KEY----------END RSA PUBLIC KEY-----`              |
| `REACT_APP_TITLE` | Application title.        | `Template Web-app`              |
| `REACT_APP_DESCRIPTION` | Application description.        | `Projeto base para criação de aplicações web usando react+mui+redux toolkit+i18next.`              |
| `SSL_KEY_PATH` | Private key for SSL certificate.        | `.certs/server_key.pem`              |
| `SSL_CERT_PATH` | Certificate for SSL certificate.        | `.certs/server_cert.pem`              |

## Available Scripts

In the project directory, you can run:

### Install dependencies

```
npm install
```

or

```
yarn install
```

### Run development mode

```
npm run start
```

or

```
yarn start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Building of project

```
npm run build
```

or

```
yarn build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Using Docker

To generate your own docker image, run the following command:

```sh
docker build -t image_name:tag .
```

Considering an image generated with the name `template/web-app`. You can create a container by passing the
settings that are desired by the environment variables. The supported settings are the same as those defined
in ["Set the environment variables"](#set-the-environment-variables). See the following example:

#### HTTPS
```sh
docker run --rm \
  -v $(pwd)/.certs:/etc \
  -e SSL_KEY_PATH=/etc/server_key.pem \
  -e SSL_CERT_PATH=/etc/server_cert.pem \
  -e REACT_APP_ENV=development \
  -e REACT_APP_LS_SECRET_KEY="s3cr3tk3y" \
  -e REACT_APP_ISSUER="issuer" \
  -e REACT_APP_JWT_PUBLIC_KEY=/etc/jwt.key.pub \
  -e REACT_APP_TITLE="Application title." \
  -e REACT_APP_DESCRIPTION="Application description." \
  -p 443:443 \
  --name template_web_app \
  template/web-app
```

To view the front-end in the browser, simply access the address: [https://localhost](https://localhost)

#### HTTP
```sh
docker run --rm \
  -v $(pwd)/jwt.key.pub:/etc/jwt.key.pub \
  -e REACT_APP_ENV=development \
  -e REACT_APP_LS_SECRET_KEY="s3cr3tk3y" \
  -e REACT_APP_ISSUER="issuer" \
  -e REACT_APP_JWT_PUBLIC_KEY=/etc/jwt.key.pub \
  -e REACT_APP_TITLE="Application title." \
  -e REACT_APP_DESCRIPTION="Application description." \
  -p 80:80 \
  --name template_web_app \
  template/web-app
```

To view the front-end in the browser, simply access the address: [http://localhost](http://localhost)

[//]: # (These are reference links used in the body of this note.)

[node-badge]: https://shields.io/badge/-Node-gray?style=plastic&logo=node.js

[node-url]: https://nodejs.org

[typescript-badge]: https://shields.io/badge/-Typescript-lightblue?style=plastic&logo=typescript

[typescript-url]: https://www.typescriptlang.org/

[react-bagde]: https://shields.io/badge/-React-20232A?style=plastic&logo=react

[react-url]: https://pt-br.reactjs.org/

[redux-badge]: https://shields.io/badge/-Redux-purple?style=plastic&logo=redux

[redux-url]: https://redux.js.org/

[mui-badge]:https://shields.io/badge/-MaterialUI-white?style=plastic&logo=mui

[mui-url]: https://material-ui.com/pt/
