function errorHandler(req, res, err) {
    res.writeHead(404);
    res.write(pageNotFoundHtml(err));
    res.end();
}

function pageNotFoundHtml(error) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>404</title>
</head>
<body>
<div>
    <h1 class="grid-title"><i class="fa fa-inbox"></i>Woliday</h1>
    <div class="container">
        <h2>404 :Page not found</h2>
        <h3>Reason: <br><br>${error}</h3>
    </div>
    <h4>Redirecting to home page...</h4>
    <div>
        <div></div>
    </div>
</div>
</body>
</html>`;
}

module.exports = function logAndErrorHandler(req, res, err) {
    console.error(err);
    return errorHandler(req, res, err);
};