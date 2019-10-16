const express = require('express');

const server = express();

server.use(express.json());

const projects = [];
let reqs = 0;

server.use((req, res, next) => {
    reqs++;
    console.log(reqs);
    next();
});

function checkProjectInArray(req, res, next){
    const project = projects[req.params.index];
    if(!project){
        res.status(400).json({error: "project does not exists"})
    }
    return next();
}

server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.get('/projects/:index', checkProjectInArray, (req, res) => {
    const { index } = req.params;

    return res.json(projects[index]);
});

server.post('/projects', (req, res) => {
    const {id, title, tasks} = req.body;

    

    projects.push({id, title, tasks});

    return res.json(req.body);
});

server.put('/projects/:index', checkProjectInArray, (req, res) => {
    const { index } = req.params;
    const { id, title} = req.body;

    projects[index].id = id;
    projects[index].title = title;

    return res.json(projects[index]);
});

server.delete('/projects/:index', checkProjectInArray, (req, res) => {
    const { index } = req.params;

    projects.splice(index, 1);

    return res.send();
});

server.post('/projects/:index/tasks', checkProjectInArray, (req, res) => {
    const { index } = req.params;
    const { title } = req.body;

    projects[index].tasks.push(title);

    return res.json(projects[index]);
});

server.listen(3000);