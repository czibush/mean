var Company = require('./models/company');

module.exports = function (app) {

    // api ---------------------------------------------------------------------

    //--------------------------------------------------- Összes company lekérdezése -------------------------------------------------------
    app.get('/api/company', function (req, res) {
        Company.find(function (err, company) {
            if (err)
                res.send(err);

            res.json(company);
        });
    });



    //------------------------------------------------------ Új company hozzáadása --------------------------------------------------------
    app.post('/api/company', function (req, res) {
        var company = new Company();      // create a new instance of the Company model
        company.name = req.body.name;
        company.address = req.body.address;

        // save the Company and check for errors
        company.save(function (err) {
            if (err)
                res.send(err);

            res.json({
                message: 'Company created: ' + req.body.name
            });
        });
    });


    //----------------------------------------------------- Csak egy elemet lekérni ------------------------------------------------------
    app.get('/api/company/:company_id', function (req, res) {
        Company.findById(req.params.company_id, function (err, company) {
            if (err)
                res.send(err);
            res.json(company);
        });
    });


    //---------------------------------------------------------- Company Törlése --------------------------------------------------------
    app.delete ('/api/company/:company_id', function (req, res) {
        Company.remove({
            _id: req.params.company_id
        }, function (err, company) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


     //-------------------------------------------------------- Company Módosítása --------------------------------------------------------
    app.put('/api/company/:company_id', function (req, res) {

        Company.findById(req.params.company_id, function (err, company) {
            if (err)
                res.send(err);

            company.name = req.body.name;  // update the info
            company.address = req.body.address;

            // save the company
            company.save(function (err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Company updated!' });
            });
        });
    })
  

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendfile('./app/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};