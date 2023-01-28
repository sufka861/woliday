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
<!--    <link href="https://mail-service-69zm.onrender.com/Front/404.css" rel="stylesheet">-->
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
<!--    <script type="module" src="https://mail-service-69zm.onrender.com/Front/js/APIpaths.js"></script>-->
<!--    <script type="module" src="https://mail-service-69zm.onrender.com/Front/js/404Script.js"></script>-->


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
    <div class="loaderPoss">
        <div class="loader"></div>
    </div>
</div>
</body>
</html>`;
}

module.exports = function logAndErrorHandler(req, res, err) {
    console.error(err);
    return errorHandler(req, res, err);
};