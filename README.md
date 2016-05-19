# Frontier Client

## Setup

### Setup Using Docker

**Note:** clone frontier-client and frontier-server somewhere as a starting
point.

1) Install dependencies:

```sh
brew update
brew install node docker docker-compose docker-machine imagemagick graphviz
npm install # FIXME: remove dependence on local node_modules
```

2) Install [Virtualbox](https://www.virtualbox.org/wiki/Downloads)

3) Create and start a Docker Machine:

```sh
docker-machine create --driver virtualbox <machine-name>
docker-machine start <machine-name>
```

4) Find out your Docker Machine's IP:

```sh
docker-machine ip <machine-name>
```

5) Update your `/etc/hosts`

```sh
$ sudo vi /etc/hosts
# and then, add this:
<docker-machine-ip>       frontier.dev client server db
```

Optional: add the following to your shell config (`~/.zshrc` or `~/.bashrc`).
This will ensure you can use the Docker command line tools, and will stomp some
annoyances.

```sh
eval "$(docker-machine env <machine-name>)"
```

## Development

### Development Using Docker

1) You need to get your Docker images built and the right Docker containers
running. We make this easier by using `docker-compose`, which uses a yaml file
format to manage Docker images/containers. Similar kinds of yaml files are used
in production/staging too.

**Note:** You need to have cloned frontier-client and frontier-server in adjacent
locations with exactly those directory names for the following to work.

```sh
docker-compose -f ../frontier-server/docker-compose-db.yml up -d
docker-compose -f ../frontier-server/docker-compose-dev.yml build && \
  docker-compose -f ../frontier-server/docker-compose-dev.yml up -d
docker-compose -f docker-compose-dev.yml build && \
  docker-compose -f docker-compose-dev.yml up -d
```

Then, `docker ps -a` will tell you which containers are running. You should have
server, client, and db running (see the last column).

Also, you can kill everything running by using:

```sh
docker kill $(docker ps -q) && docker rm -v $(docker ps -aq)
```

2) You need to ensure migrations/seed data is available in the backend. You
   already have the server running (see `docker ps -a` to confirm). Now, you can
   trigger a full reset of the database, including getting seed data.

```sh
docker run --rm -it frontierserver_server ./do_reset.sh
```

**Note:** you could also go to frontier-server and `bundle install` and use
`rake db:reset` and other things like `rails console`.

3) If you're editing frontend code and want it to watch and compile, in a terminal run this:

```sh
npm run build-dev # FIXME: make this not required
```


### Adding New NPM Packages

**Note:** If you install new node modules you will need to `npm install` so that
it's downloaded in the node_modules directory and shared with the container.

`npm-shrinkwrap.json` is sort of like Gemfile.lock.

When installing Node packages from npmjs.com,

1. `rm npm-shrinkwrap.json`
2. `npm i $new_node_package --save`
3. `npm shrinkwrap`

Otherwise, npm installs the union of `npm-shrinkwrap.json` and `package.json`,
it seems.

Also, remember to kill running containers, rebuild, and relaunch them.


## Testing

The following commands are available for client side testing:

1. `npm test` will run the linter and all mocha tests one time
2. `npm run test-watch` will run only the mocha test but will run it in continuous mode
  - While in continuous mode you can open any browser and run the tests in debug mode.
    to do this go to `http://localhost:9876/` and click on the debug button.  Then open the
    chrome console and refresh the screen.
3. `npm run lint` to only run the linter
4. `npm run test-once` to only run the mocha tests one time

For more background on the webpack/karma/mocha/chai/sinon stack see this [google doc](https://docs.google.com/document/d/1RNL1phoJDsG-2yYgTyEh4HIZdvRev0xW0WXELNKhHlM/edit#)

### What's What

`app/app.jsx` is the entrypoint. This is compiled into `public/static/bundle.js` and
served by the static server via `node static_server.js`.

We use Webpack to build assets, and the config is in `config/webpack.config.js`.

All routes are client-side; we use React Router to do routing. They're defined
in `config/routes.jsx`.

The routes all point to 'views' (see `views/`), which are still React components
except they can be composed of many components themselves. All such views are
rendered inside a layout component (`layouts/StudentApp.jsx`).

All shared components are in `components/`. Anything that could be used by
multiple views can be extracted out into `components/`. You can also keep
components private inside views if you want.
