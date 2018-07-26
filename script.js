const request = require('request');
const twemoji = require('twemoji');

let URL = 'https://translate.yandex.net/api/v1/tr.json/translate?id=8fd99472.5b599210.3a30e222-1-0&srv=tr-text&lang=en-emj&reason=cut';
let param = '&text=Hello%20world';
let emoji = '';


request(URL + param, (err, res, body) => {
    if (err) throw err;
    let result = JSON.parse(body);

    if (result.code === 200) {
        emoji = result.text.toString();
        console.log(
            twemoji.parse(emoji)
        );
    }
});

