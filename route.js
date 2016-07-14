var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads');
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});
var upload = multer({
    storage: storage
}).single('userFile');



module.exports = function(app) {

    app.get('/', function(req, res) {
        res.sendFile(process.cwd() + '/index.html');
    });

    app.post('/file', function(req, res) {
        upload(req, res, function(err) {
            if (err) {
                return res.end("error uploading files");
            }
            var size = req.file.size;
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                size
            }));
        });
    });
};