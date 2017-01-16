const express = require("express");
const routes = require("./routes/routes");
const app = express();


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(routes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`);
});
