// get quotes from api
let apiQuotes=[]
// show new quote function
const container = document.querySelector('#container')
const quoteText =document.querySelector('#quote')
const theAuthor = document.querySelector('#theAuthor')
const theTag=document.querySelector('#tag')
const button = document.querySelector('#new-quote')
const twitterButton = document.querySelector('#twitter')
const loader =document.querySelector('#loader')
const body =document.querySelector("body")
const count =document.querySelector('#count')

let total =0

// show loading
function loading(){
    loader.hidden = false;
    container.hidden =true;
}
// hide loading
function complete (){
    loader.hidden = true;
    container.hidden =false;
}

function newQuote (){
    loading();
    // pick random quote from array
    let r =Math.floor(Math.random()*255);
    let g =Math.floor(Math.random()*255);
    let b =Math.floor(Math.random()*255);
    body.style.backgroundColor=`rgb(${r},${g},${b})`

    total++;
    count.innerHTML=total

    let quote =apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (!quote.author){
        quote.author="Unknown"
    }else { theAuthor.textContent=quote.author
    }
    if (quote.text.length>150){
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
// set quote, hide loader
    quoteText.textContent=quote.text
    theTag.textContent=quote.tag

    complete();
    console.log(quote)
}


async function getQuotes(){
    loading();
    const apiUrl="https://jacintodesign.github.io/quotes-api/data/quotes.json"
    try{
        const res = await fetch(apiUrl);
        apiQuotes =await res.json()
        // console.log(apiQuotes[5])
        newQuote()
        
    }catch(err){
        console.log(err)
        alert(err)
    }
    
}

// to tweet a quote

function tweetQuote(){
        const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${theAuthor.textContent} `;
        window.open(twitterUrl, '_blank');
    }
    
    twitterButton.addEventListener('click', tweetQuote)
    
    
    
    // on load
    button.addEventListener('click', newQuote)
    twitterButton.addEventListener('click', tweetQuote)
    
    getQuotes()
    