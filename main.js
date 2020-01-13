const server = require('./lib/server');
const config = require('./lib/config');
const { read, add, update, del } = require('./lib/handlers');

const app = server();

app.get('/', read);

app.post('/add', add);

app.put('/update/:id', update);

app.delete('/delete/:id', del);

app.listen(config.port, () => {
    console.log(`Server running on port`, config.port);
});
