import express from "express";
import mongoose from "mongoose";
import coursesRouter from "./controllers/courses.controller.js";
import usersRouter from "./controllers/users.controller.js";
import rolesRouter from "./controllers/roles.controller.js";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import exphbs from "express-handlebars";
import Handlebars from 'handlebars';
import {allowInsecurePrototypeAccess} from'@handlebars/allow-prototype-access';
import {CourseService} from "./services/courses.service.js";
import authorsRouter from "./controllers/authors.controllers.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import lessonsRouter from "./controllers/lessons.controller.js";
import commentsRouter from "./controllers/comments.controller.js";



const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({}));
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});
app.use(cookieParser());
app.use(cors());


const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});
app.engine("hbs", hbs.engine);

app.set("view engine", "hbs");
app.set("views", "views");



app.use("/courses", coursesRouter);
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/authors", authorsRouter);
app.use("/lessons", lessonsRouter);
app.use("/comments", commentsRouter);


// app.use((err, req, res, next) => {
//     res.status(500).send("Uh oh! An unexpected error occured.")
// });
app.get("/", async(req, res) => {
    const courses = Array.from(await CourseService.getAll()).splice(0,3);
    res.render("start",{
        isMain:true,
        courses
    });
});


const start = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => {
            console.log(`Server listen on port ${PORT}`);
        });
    } catch (err) {
        console.log(err.message);
    }
};

start().catch();