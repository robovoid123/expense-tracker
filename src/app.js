const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const flash = require("connect-flash");
const { engine } = require("express-handlebars");
const { formatDate, truncateFloat, ifEquals } = require("./helpers/hbs");
const _ = require("dotenv").config();
const { flashMessage } = require("./middleware/flash.middleware");

const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const redisClient = redis.createClient({
  legacyMode: true,
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});
redisClient.connect().catch(console.log);

redisClient.on("error", function (err) {
  console.log("Could not establish a connection with redis. " + err);
});
redisClient.on("connect", function (err) {
  console.log("Connected to redis successfully");
});

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      httpOnly: false,
      maxAge: 1800000,
    },
  })
);

app.use(flash());

app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    helpers: {
      formatDate,
      truncateFloat,
      ifEquals,
    },
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(flashMessage);

// routes
app.use("/", require("./routes"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
