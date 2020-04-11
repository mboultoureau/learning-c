var canvas = document.getElementById('clock');
var ctx = canvas.getContext('2d');


function drawArc(radius, color, progression, lineWidth = 30) {
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.arc(250, 250, radius, - 0.5 * Math.PI, progression - 0.5 * Math.PI);
    ctx.strokeStyle = color;
    ctx.stroke();
}

function createSimpleGradient(color1, color2) {
    var gradient = ctx.createLinearGradient(0, 0, 500, 0);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
}

function drawBackground(date) {
    /* BACKGROUND */
    drawArc(145, 'rgb(38, 0, 1)', 2 * Math.PI);
    drawArc(110, 'rgb(0, 35, 0)', 2 * Math.PI);
    drawArc(75, 'rgb(0, 28, 35)', 2 * Math.PI);

    /* OVERLAY */
    var secondsGradient = createSimpleGradient('rgb(255, 0, 130)', 'rgb(243, 0, 0)');
    var minutesGradient = createSimpleGradient('rgb(0, 235, 0)', 'rgb(157, 255, 0)');
    var hoursGradient = createSimpleGradient('rgb(0, 181, 224)', 'rgb(0, 255, 215)');

    drawArc(145, secondsGradient, date.getSeconds() * 2 * Math.PI / 60);
    drawArc(110, minutesGradient, date.getMinutes() * 2 * Math.PI / 60);
    drawArc(75, hoursGradient, date.getHours() * 2 * Math.PI / 24);
}

function drawClockHands(date) {
    // HOURS
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.fillStyle = 'rgb(255, 255, 255)'
    ctx.lineWidth = 10;

    var angle = date.getHours() * Math.PI / 12 - 0.5 * Math.PI;
    var x = Math.cos(angle);
    var y = Math.sin(angle);


    ctx.beginPath();
    ctx.moveTo(x * 25 + 250, y * 25 + 250);
    ctx.lineTo(x  * 100 + 250, y  * 100 + 250);
    ctx.stroke();

    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.lineTo(x * 100 + 250, y * 100 + 250);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(250, 250, 5, 0, 2* Math.PI);
    ctx.stroke();
    ctx.fill();



    // MINUTES
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.fillStyle = 'rgb(255, 255, 255)'
    ctx.lineWidth = 10;

    var angle = date.getMinutes() * Math.PI / 30 - 0.5 * Math.PI;
    var x = Math.cos(angle);
    var y = Math.sin(angle);


    ctx.beginPath();
    ctx.moveTo(x * 25 + 250, y * 25 + 250);
    ctx.lineTo(x  * 150 + 250, y  * 150 + 250);
    ctx.stroke();

    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.lineTo(x * 100 + 250, y * 100 + 250);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(250, 250, 5, 0, 2* Math.PI);
    ctx.stroke();
    ctx.fill();

    
    // SECONDS
    ctx.strokeStyle = 'rgb(248, 147, 0)';
    ctx.fillStyle = 'rgb(0, 0, 0)'
    ctx.lineWidth = 2;

    var angle = date.getSeconds() * Math.PI / 30 - 0.5 * Math.PI;
    var x = Math.cos(angle);
    var y = Math.sin(angle);


    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.lineTo(x  * 175 + 250, y  * 175 + 250);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.lineTo(-x * 25 + 250, -y * 25 + 250);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(250, 250, 5, 0, 2* Math.PI);
    ctx.stroke();
    ctx.fill();
}

var clock = setInterval(() => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 600, 600);  

    var date = new Date();

    drawBackground(date);
    drawClockHands(date);
}, 1000);