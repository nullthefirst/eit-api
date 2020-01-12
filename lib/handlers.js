const fs = require('fs');
const path = require('path');

// Get All EITs Controller
exports.read = (req, res) => {
    let parsedEits = readAndParseEits();

    res.json(parsedEits);
};

// Add an EIT Controller
exports.add = (req, res) => {
    const { firstName, lastName, country, age } = req.body;

    if (!firstName) {
        return res.status(400).json({
            reason: 'firstName not found in request body',
        });
    }

    if (!lastName) {
        return res.status(400).json({
            reason: 'lastName not found in request body',
        });
    }

    if (!country) {
        return res.status(400).json({
            reason: 'country not found in request body',
        });
    }

    if (!age) {
        return res.status(400).json({
            reason: 'age not found in request body',
        });
    }

    let parsedEits = readAndParseEits();

    const nextId = parsedEits.length + 1;

    const newEit = { id: nextId, firstName, lastName, country, age };

    const newEits = [...parsedEits, newEit];

    fs.writeFileSync(
        path.resolve(__dirname, 'model/eits.json'),
        JSON.stringify(newEits),
    );

    res.status(201).json(newEit);
};

exports.update = (req, res) => {
    let parsedEits = readAndParseEits();

    const eit = parsedEits.find(eit => eit.id === +req.params.id);

    if (!eit) {
        return res.status(404).json({
            reason: `ID ${req.params.id} can not be found`,
        });
    }

    const restOfEits = parsedEits.filter(eit => eit.id !== +req.params.id);

    const { firstName, lastName, age, country } = req.body;

    if (firstName) {
        eit.firstName = firstName;
    }

    if (lastName) {
        eit.lastName = lastName;
    }

    if (age) {
        eit.age = age;
    }

    if (country) {
        eit.country = country;
    }

    const newEits = [...restOfEits, eit];

    fs.writeFileSync(
        path.resolve(__dirname, 'model/eits.json'),
        JSON.stringify(newEits),
    );

    res.json(eit);
};

exports.del = (req, res) => {
    let parsedEits = readAndParseEits();

    const eit = parsedEits.find(eit => eit.id === +req.params.id);

    if (!eit) {
        return res.status(404).json({
            reason: `ID ${req.params.id} can not be found`,
        });
    }

    const restOfEits = parsedEits.filter(eit => eit.id !== +req.params.id);

    fs.writeFileSync(
        path.resolve(__dirname, 'model/eits.json'),
        JSON.stringify(restOfEits),
    );

    res.json({
        reason: `ID ${req.params.id} has been deleted`,
    });
};

const readAndParseEits = () => {
    let parsedEits;

    try {
        const eits = fs.readFileSync(
            path.resolve(__dirname, 'model/eits.json'),
            {
                encoding: 'utf8',
            },
        );
        parsedEits = JSON.parse(eits);
    } catch (error) {
        parsedEits = [];
    }

    return parsedEits;
};
