import { logger } from "./logger";
import { Config } from "./Config";
import { Authentication } from "./auth/Authentication";
import { HgtEndpoint } from "./hgt/HgtEndpoint";
import { LinkEndpoint } from "./link/LinkEndpoint";
import { MessageEndpoint } from "./message/MessageEndpoint";
import { GommetteEndpoint } from "./gommette/GommetteEndpoint";

var express         = require('express');
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var compression     = require('compression');

logger.info("Server is starting ...");

var app = express();

app.use(morgan('combined', { stream : logger.stream }));
app.use(bodyParser.json());
app.use(compression());

logger.info("Creating routes ...");

app.use(Authentication.authenticateUser);

app.get('/messages', MessageEndpoint.index);
app.post('/messages', MessageEndpoint.create);

app.get('/links', LinkEndpoint.index);
app.post('/links', LinkEndpoint.create);

app.get('/scores/hgt/:channel', HgtEndpoint.index);
app.get('/scores/hgt/:channel/:year', HgtEndpoint.byYear);
app.get('/scores/hgt/:channel/:year/:week', HgtEndpoint.byWeek);
app.post('/scores/hgt/:channel', HgtEndpoint.create);

app.get('/scores/gommettes', GommetteEndpoint.index);
app.get('/scores/gommettes/:year', GommetteEndpoint.byYear);
app.get('/scores/gommettes/:year/:userId', GommetteEndpoint.byYearAndUser);
app.post('/scores/gommettes', GommetteEndpoint.create);

logger.info("Routes : ");
for (var r of app._router.stack) {
    if (r.route && r.route.path) {
        logger.info(r.route.path)
    }
}

app.listen(Config.SERVER_PORT);
logger.info("Node server listening on " + Config.SERVER_PORT);