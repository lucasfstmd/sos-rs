FROM node:16-alpine

# Create web-app directory
RUN mkdir -p /usr/src/web-app
WORKDIR /usr/src/web-app

# Copy app source
COPY . /usr/src/web-app

# Install dependencies and Build project
RUN npm install ;\
    export REACT_APP_LS_SECRET_KEY=REACT_APP_LS_SECRET_KEY_VALUE ;\
    export REACT_APP_ISSUER=REACT_APP_ISSUER_VALUE ;\
    export REACT_APP_JWT_PUBLIC_KEY=REACT_APP_JWT_PUBLIC_KEY_VALUE ;\
    export REACT_APP_TITLE=REACT_APP_TITLE_VALUE ;\
    export REACT_APP_DESCRIPTION=REACT_APP_DESCRIPTION_VALUE ;\
    npm run build ;\
    npm uninstall package.json ;\
    rm -rf node_modules/ src/ ;\
    npm install -g serve

# Start Web-app
ENTRYPOINT sed -i -e "s@REACT_APP_LS_SECRET_KEY_VALUE@${REACT_APP_LS_SECRET_KEY}@g" \
           -e "s@REACT_APP_ISSUER_VALUE@${REACT_APP_ISSUER}@g" \
           -e "s@REACT_APP_JWT_PUBLIC_KEY_VALUE@${REACT_APP_JWT_PUBLIC_KEY}@g" \
           -e "s@REACT_APP_TITLE_VALUE@${REACT_APP_TITLE}@g" \
           -e "s@REACT_APP_DESCRIPTION_VALUE@${REACT_APP_DESCRIPTION}@g" build/static/js/*.js build/index.html ;\
            if test -f "$SSL_CERT_PATH" && test -f "$SSL_KEY_PATH";\
            then serve -s -n -l 443 --ssl-cert $SSL_CERT_PATH --ssl-key $SSL_KEY_PATH build;\
            else serve -s -n -l 80 build;fi;
