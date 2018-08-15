
let request = require('request');
let twemoji = require('twemoji');
let express = require('express');
let glue = require('image-glue');
let fs = require('fs');
let app = express();


let URL = 'https://translate.yandex.net/api/v1/tr.json/translate?id=8fd99472.5b599210.3a30e222-1-0&srv=tr-text&lang=en-emj&reason=cut',
    param = '&text=Hello%20world',
    emoji;


request(URL + param, (err, res, body) => {
    if (err) throw err;
    let result = JSON.parse(body);

    if (result.code === 200) {
        emoji = result.text.toString();
        var images = [];
        twemoji.parse(emoji, function(icon, options, variant) {
            images.push('https://twemoji.maxcdn.com/72x72/'+icon+'.png');
        });


        var downloadImage = function(uri, filename, callback){
            request.head(uri, function(err, res, body){
                console.log('content-type:', res.headers['content-type']);
                console.log('content-length:', res.headers['content-length']);

                request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
            });
        };


        images.forEach((imageUrl, i)=>{
            downloadImage(imageUrl, i+'.png', ()=>{})
        });

        setTimeout(()=> {
            const image1 = fs.readFileSync('./0.png');
            const image2 = fs.readFileSync('./1.png');
            const opts = { format: 'png', background: { r: 150, g: 150, b: 150 }, output: { quality: 100 } }
            glue.merge([image1, image2], opts).then(combinedImage => fs.writeFileSync('./combined-image.jpg', combinedImage))
        }, 1500)

    }
});

app.get('/about', function (req, res) {
    res.send('about');
});
