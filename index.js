var TelegramBot = require('node-telegram-bot-api');

var mp = 0;

var timer1;
var timer2;

var options = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Купить', callback_data: '1' }],
      [{ text: 'Про  товар', callback_data: '2' }]
    ]
  })
};

var adminId = 550660165;

var orderString1 = [];
var orderString2 = [];

var token = '1073413761:AAGc-sg9fCmfyO1kGCa5dqLZw2xo5gGNcsU';
// Включить опрос сервера. Бот должен обращаться к серверу Telegram, чтобы получать актуальную информацию
// Подробнее: https://core.telegram.org/bots/api#getupdates
var bot = new TelegramBot(token, { polling: true });

// Написать мне ... (/echo Hello World! - пришлет сообщение с этим приветствием, то есть "Hello World!")
bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Доброго времени суток! Этот бот поможет вам совершить заказ наших товаров, и  также будет освидомлять вас о наших новостях. Оставайтесь с нами..', options);
    //openKlava(chatId);
    console.log(chatId);
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

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
 if(mp == 1){
  if(chanel == 1){
    orderString1.push(msg.text);
    timer1 = setTimeout(clear1(), 300000);
  }
  else {
    orderString2.push(msg.text);
    timer2 = setTimeout(clear2(), 300000);
  }
  bot.sendMessage(chatId, 'Укажите пожалуйста ваш номер телефона');
  plusMp();
}
 else if(mp == 2){
  if(chanel == 1){
    orderString1.push(msg.text);
  }
  else {
    orderString2.push(msg.text);
  }
  bot.sendMessage(chatId, 'Укажите ваш город');
  plusMp();
}
else if(mp == 3){
  if(chanel == 1){
    orderString1.push(msg.text);
  }
  else {
    orderString2.push(msg.text);
  }
  bot.sendMessage(chatId, 'Введите название почты');
  plusMp();
} 
else if(mp == 4){
  if(chanel == 1){
    orderString1.push(msg.text);
  }
  else {
    orderString2.push(msg.text);
  }
  bot.sendMessage(chatId, 'Отделение почты');
  plusMp();
}
else if(mp == 5){
  if(chanel == 1){
    orderString1.push(msg.text);
  }
  else {
    orderString2.push(msg.text);
  }
  bot.sendMessage(chatId, 'Спасибо, мы скоро свяжемся с вами!!!');
  bot.sendMessage(chatId, options)
  if(chanel == 1){
    bot.sendMessage(adminId, orderString1.join(","));
    orderString1 = []
    console.log("First chanel is clear");
    clearTimeout(timer1);
  }
  else {
    bot.sendMessage(adminId, orderString2.join(","));
    orderString2 = []
    console.log("Second chanel is clear");
    clearTimeout(timer2);
  }
}
});

bot.on('callback_query', (query) => {
const chatId = query.message.chat.id;
if (query.data == '1') {
  bot.sendMessage(chatId, 'Укажите пожалуйста ваше ФИО');
  if(orderString1[0] == undefined){
    chanel = 1;
    console.log("First chanel is working")
  }
  else {
    chanel = 2;
    console.log("Second chanel is working")
  }
  mp = 1;
}
else if(query.data == '2'){
  bot.sendMessage(chatId, 'AbiOma Aider One - это универсальное устройство которое поможет вам списать экзамен. Электронная шпаргалка это просто, легко, быстро.', options);
}

});

function plusMp(){
  mp++;
}

function clear1(){
  orderString1 = [];
  bot.sendMessage(chatId, 'Ой!, время ввода данных истекло! Попробуйте снова!', options);
}

function clear2(){
  orderString2 = [];
  bot.sendMessage(chatId, 'Ой!, время ввода данных истекло! Попробуйте снова!', options);
}