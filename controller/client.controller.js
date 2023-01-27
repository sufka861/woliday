const {URL} = require("url");
const Path = require("path");
const errorHandler = require("./error.controller");

function loadPage(req, res) {
    let pathName = new URL(req.url, `http://${req.headers.host}`).pathname;

    pathName =
        pathName === "/" || pathName === "/index.html"
            ? "/index.html"
            : pathName;

    res.status(200);
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");

        switch (Path.extname(pathName)) {
            case ".js":
                res.setHeader("Content-Type", "text/javascript");
                break;
            case ".css":
                res.setHeader("Content-Type", "text/css");
                break;
            case ".html":
                res.setHeader("Content-Type", "text/html");
                break;
        }

        res.status(200);
        res.sendFile(Path.join(process.cwd() + "/client" + pathName), (err) => {
            if (err) errorHandler(req, res, err);
        });
    } catch (err) {
        return errorHandler(req, res, err);
    }
}

module.exports = {
    loadPage,
};
