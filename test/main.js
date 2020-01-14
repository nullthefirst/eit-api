const testServer = require('../lib/server');
const { read, add, update, del } = require('../lib/handlers');
const _testing = require('./index');

const PORT = process.env.PORT || 5000;

const testApp = testServer();

testApp.get('/', read);

testApp.post('/add', add);

testApp.put('/update/:id', update);

testApp.delete('/delete/:id', del);

testApp.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
