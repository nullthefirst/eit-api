const fs = require('fs');
const path = require('path');

// Get All EITs
exports.read = (req, res) => {
    let parsedEits = readAndParseEits();

    const emails = parsedEits.map(eit => eit.email);

    res.json(emails);
};

// Get a Single EIT
exports.readOne = (req, res) => {
    let parsedEits = readAndParseEits();

    const eit = parsedEits.find(eit => eit.email === req.query.email);

    if (!eit) {
        return res.status(404).json({
            reason: `EIT with ${req.query.email} not found`,
        });
    }

    res.json(eit);
};

// Add an EIT
exports.add = (req, res) => {
    const { firstName, lastName, email, country, age } = req.body;

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

    if (!email) {
        return res.status(400).json({
            reason: 'email not found in request body',
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

    const newEit = { firstName, lastName, email, country, age };

    const newEits = [...parsedEits, newEit];

    fs.writeFileSync(
        path.resolve(__dirname, 'model/eits.json'),
        JSON.stringify(newEits),
    );

    res.status(201).json(newEit);
};

// Update an EIT
exports.update = (req, res) => {
    let parsedEits = readAndParseEits();

    const eit = parsedEits.find(eit => eit.email === req.body.email);

    console.log(eit);
    console.log(req.body);

    if (!eit) {
        return res.status(404).json({
            reason: `EIT with ${req.query.email} not found`,
        });
    }

    const restOfEits = parsedEits.filter(eit => eit.email !== +req.body.email);

    const { firstName, lastName, email, country, age } = req.body;

    if (firstName) {
        eit.firstName = firstName;
    }

    if (lastName) {
        eit.lastName = lastName;
    }

    if (email) {
        eit.email = email;
    }

    if (country) {
        eit.country = country;
    }

    if (age) {
        eit.age = age;
    }

    const newEits = [...restOfEits, eit];

    fs.writeFileSync(
        path.resolve(__dirname, 'model/eits.json'),
        JSON.stringify(newEits),
    );

    res.json(eit);
};

// Delete an EIT
exports.del = (req, res) => {
    let parsedEits = readAndParseEits();

    const eit = parsedEits.find(eit => eit.email === req.query.email);

    if (!eit) {
        return res.status(404).json({
            reason: `ID ${req.query.email} can not be found`,
        });
    }

    const restOfEits = parsedEits.find(eit => eit.email === +req.params.email);

    fs.writeFileSync(
        path.resolve(__dirname, 'model/eits.json'),
        JSON.stringify(restOfEits),
    );

    res.json({
        reason: `EIT with ${req.query.email} has been deleted`,
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
