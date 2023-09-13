const express = require('express');
const app = express();

let validCode = '';

app.get('/videoStream', (req, res) => {
    const videoUrl = 'https://live.katun24.ru:8082/18ed1c64-2ec7-4c8c-bf52-14bea4ead6d0';

    request(videoUrl).pipe(res);
});

app.get('/getCode', (req, res) => {
    const currentDate = new Date();
    const expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

    if (currentDate <= expirationDate) {
        validCode = generateCode();
        res.send(validCode);
    } else {
        res.send('Код больше не действителен');
    }
});

app.get('/checkCode/:code', (req, res) => {
    const code = req.params.code;

    if (code === validCode) {
        res.send('Код действителен');
    } else {
        res.send('Неверный код');
    }
});

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});

function generateCode() {
    let code = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const codeLength = 6;

    for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }

    return code;
}