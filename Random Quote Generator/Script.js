const projectName = "random-quote-machine";


var quotes = [{quote: "To be, or not to be?", author: "Abraham Lincoln"}, {quote: "There are those who hold guns, and there are those who dig", author: "Albert Einstein"}, {quote: "*hand gestures*", author: "Charlie Chaplin"}, {quote: "Shuddup. Teehee.", author: "A second grader"},{quote: "Either admit that the chicken came before the egg or I'll, like, tell on you", author: "Christopher Columbus"},{quote: "I bet I can hop over those three barrels without a running start", author: "Marie Antoinette"},{quote: "One fish two fish, red fish poop fish", author: "Doctor Suess"},{quote: "Mom's spaghetti", author: "Eminem"},{quote: "My milkshake brings all the boys to the yard", author: "Queen Victoria"},{quote: "Anyone who must say, 'I am the king', is no true king", author: "George Regina Roxanne Martin"},{quote: "You used to call me on my cellphone", author: "Dr Dre"},{quote: "Let's put the X in seX", author: "Jeans Simmones"},{quote: "One ring to rule them all", author: "Jonathan Kevin Rowling"}];

function inIframe () { try { return window.self !== window.top; } catch (e) { return true; } }

var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857", "#121212", "#212156", '#DD0056', '#00DD56', '#5600DD', '#2D4', '#EBE'];

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

let quote = '';
let author = '';
let tempQuote = '';
let tempAuthor = '';

function getQuote() {
  do {
    tempQuote = getRandomQuote().quote;
  } while (tempQuote == quote);
  
  do {
    tempAuthor = getRandomQuote().author;
  } while (tempAuthor == author);
  
  quote = tempQuote;
  author = tempAuthor;
  
    $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet');

    $('#tumblr-quote').attr('href', 'https://www.tumblr.com/');
  
  
  $(".quote-text").animate(
    { opacity: 0 },
    500,
    function() {
      $(this).animate({ opacity: 1}, 1000);
      $('#text').text(quote);
    }
  );

  $(".quote-author").animate(
    { opacity: 0 },
    500,
    function() {
      $(this).animate({ opacity: 1}, 2000);
      $('#author').html(author);
    }
  );

  var color = Math.floor(Math.random() * colors.length);
  $("html body").animate(
    {
      backgroundColor: colors[color],
      color: colors[color]
    }, 
    1000 
  );
  $(".button").animate(
    { 
      backgroundColor: colors[color] 
    }, 
    1000 
  );
}

window.onload = getQuote;
 

  $('#new-quote').on('click', getQuote);
