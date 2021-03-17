const express = require("express");
const fs = require("fs");

// используется express для удобства

const app = express();

// Отключение cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// для считывания json в нашем случае это объект user

app.use(express.json({ extended: true }));

// обработка запроса по URL createUser

app.post("/createUser", (req, res) => {
    
    // Выводим данные, которые пришли из клиента
    console.log(req.body);
    // создаём файл и записываем в него то что пришло из клиента строкой JSON.stringify(req.body)
    fs.writeFile("users.json", JSON.stringify(req.body), function (error) {
        // если будет ошибка
        if (error) throw error;
    });
    res.json(req.body);
});

// Сервер запускается по порту 3000
app.listen(3000, () => {
    console.log('сервер запущен');
});
