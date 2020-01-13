const server = require('./lib/server');
const { read, add, update, del } = require('./lib/handlers');

const PORT = process.env.PORT || 5000;

const app = server();

app.get('/', read);

app.post('/add', add);

app.put('/update/:id', update);

app.delete('/delete/:id', del);

app.listen(PORT, () => {
    console.log(`Server running on port`, PORT);
});
