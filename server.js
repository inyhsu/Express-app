
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');

const cors = require('cors');
app.use(cors());

app.use(express.static(__dirname + '/angular-app/dist'));

const uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/expressapp');
mongoose.connection.on('connected', () => console.log('connected to MongoDB'));
mongoose.Promise = global.Promise;

const { Schema } = mongoose;
const TaskSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Task title is required'],
        minlength: [5, 'Task title length must be greater than 5'],
        unique: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
}, {
        timestamps: true
    });
TaskSchema.plugin(uniqueValidator, { message: '{PATH} must be unique.' });

mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task');

app.get('/tasks', function (req, res) {

    Task.find({})
        .then(tasks => res.json(tasks))
        .catch(error => console.log(error));
})

app.post('/tasks', function (req, res) {
    console.log("This is req.body", req.body);
    Task.create(req.body)
        .then(task => res.json(task))
        .catch(error => console.log(error));
})

app.all("*", (req, res, next) => { res.sendFile(path.resolve("./public/dist/index.html")) });

app.listen(8000, function () {
    console.log("listening on port 8000");
})