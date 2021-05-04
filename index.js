const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = 'YOUR_TG_TOKEN_HERE';

const coinName = 'YOUR_COIN_NAME';
const coinContract = 'YOUR_BSC_CONTRACT";
const slippageTx = '12';
const website = 'YOUR_WEBSITE';
const twitter = 'YOUR_TWITTER_ACCOUNT';
const timeoutAutoDelete = '23000'; // 23000 => 23 seconds
const v1 = false;

const pscBuyLink = 'https://' + ( (v1) ? 'v1' : '' ) + 'exchange.pancakeswap.finance/#/swap?outputCurrency=' + coinContract;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

  const chatId = msg.chat.id;
  var message = "Take a look at the " + coinName +" chart!";

  var options = {
    reply_markup: JSON.stringify({
        inline_keyboard: [ 
          [{
            text: '📈 Chart',
            url: 'https://charts.bogged.finance/?token=' + coinContract
          }]
        ]
   }),
};
  bot.sendMessage(chatId, message, options);

});

bot.onText(/\/buy/, (msg) => {
  const chatId = msg.chat.id;
  var message = "Click the button to join the mission ! Set slippage ' + slippageTx + '% !";

  var options = {
    reply_markup: JSON.stringify({
        inline_keyboard: [ 
          [{
            text: '🚀 Buy ' + coinName + '! 🚀',
            url: pscBuyLink
          }]
        ]
   }),
};
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, message, options);

});

bot.on('new_chat_members', (msg) => { 
  
  const chatId = msg.chat.id; 
  var message = "Hello ";
  message += (msg.new_chat_member.first_name) ? '<b>'+msg.new_chat_member.first_name+'</b>' : '';
  message += " 🖐🏻  Welcome to " + coinName +". \nWe are glad to have you on board in our mission to launch into hyperspace. 🌕 Please follow the links below.  ";

  var options = {
    parse_mode: 'html',
    reply_markup: JSON.stringify({
        inline_keyboard: [
          [{
            text: '🚀  ' + coinName + ' Website',
            url: website
          },{
            text: '👤 TWITTER',
            url: 'https://twitter.com/' + twitterAccount + '/'
          }],
          [{
	    text: '🎁 BUY ( ' + ( (v1) ? 'Switch to V1(old) and ' : ''  ) + 'Slippage ' + slippageTx +'%)',
            url: pscBuyLink
          }],[{
            text: '📈 Chart',
            url: 'https://charts.bogged.finance/?token=' + coinContract
          }],
        ]
   }),
};

   bot.sendMessage(chatId, message,options ).then(sentMessage => {
     setTimeout(function () { bot.deleteMessage(chatId,sentMessage.message_id); }, timeoutAutoDelete);
  });
});




