var TelegramBot = require('node-telegram-bot-api');

var mp = 0;

var express = require("express");
var app = express();
app.use(express.logger());

var adminId = 550660165;

var orderString = [];

var token = '1073413761:AAGc-sg9fCmfyO1kGCa5dqLZw2xo5gGNcsU';
// Включить опрос сервера. Бот должен обращаться к серверу Telegram, чтобы получать актуальную информацию
// Подробнее: https://core.telegram.org/bots/api#getupdates
var bot = new TelegramBot(token, { polling: true });

// Написать мне ... (/echo Hello World! - пришлет сообщение с этим приветствием, то есть "Hello World!")
bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Доброго времени суток! Этот бот поможет вам совершить заказ наших товаров, и  также будет освидомлять вас о наших новостях. Оставайтесь с нами. Введите команду /buy, чтобы заказать товар.');
    //openKlava(chatId);
    console.log(chatId);
  });

bot.onText(/\/buy/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Укажите пожалуйста ваше ФИО');
    mp = 1;
  });

  function openKlava(chatId) {
    bot.sendMessage(chatId, 'Выбери интересующий пункт меню', {
     reply_markup: {
       keyboard: [
         [
           {
             text: 'Купить товар',
             callback_data: 'buytovar'
           }, 
         ]        
       ],
       one_time_keyboard: true
     }  
   }) 
 }

bot.on( " polling_error " , ( err ) => inputFIO());


app.get('/', function(request, response) {
  response.send('Hello World!');
});
/*function inputPhone(){
    bot.sendMessage(chatId, 'Укажите пожалуйста ваш номер телефона');
    mp = 2;
}

function inputCity(){
    bot.sendMessage(chatId, 'Укажите ваш город');
    mp = 3;
}

function inputPost(){
    bot.sendMessage(chatId, 'Отделение почты');
    mp = 4;
}
*/
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
 if(mp == 1){
  orderString.push(msg.text);
  bot.sendMessage(chatId, 'Укажите пожалуйста ваш номер телефона');
  plusMp();
}
 else if(mp == 2){
  orderString.push(msg.text); 
  bot.sendMessage(chatId, 'Укажите ваш город');
  plusMp();
}
else if(mp == 3){
  orderString.push(msg.text);
  bot.sendMessage(chatId, 'Введите название почты');
  plusMp();
} 
else if(mp == 4){
  orderString.push(msg.text);
  bot.sendMessage(chatId, 'Отделение почты');
  plusMp();
}
else if(mp == 5){
  orderString.push(msg.text);
  bot.sendMessage(chatId, 'Спасибо, мы скоро свяжемся с вами!!!');
  bot.sendMessage(adminId, orderString.join(","));
  console.log(orderString.join(","));
  mp = 0;
}
});

bot.on('callback_query', (query) => {
const chatId = query.message.chat.id;
if (query.data == 'buytovar') {

}

});

function plusMp(){
  mp++;
}

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});