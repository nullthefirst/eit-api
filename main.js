const server = require('./lib/server');
const { read, readOne, add, update, del } = require('./lib/handlers');

const PORT = process.env.PORT || 5000;

const app = server();

app.get('/', read); // works

app.get('/', readOne);

app.post('/', add); // works

app.put('/', update); // works

app.delete('/', del);

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
