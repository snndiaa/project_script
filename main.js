document.addEventListener('DOMContentLoaded', () => {
    const scrollBtn = document.querySelector('.scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});


const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            }
        });

        item.classList.toggle('active');

        if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = null;
        }
    });
});



const header = document.querySelector('header');

if (header) {
    const tickerWrap = document.createElement('div');
    tickerWrap.className = 'ticker-wrap';

    const tickerMove = document.createElement('div');
    tickerMove.className = 'ticker-move';
    const phrase = "🔥 SPECIAL OFFER: DISCOUNT UP TO 60%  •  BOOK YOUR APPOINTMENT NOW  •  LIMITED TIME ONLY  •  ";
    const content = phrase.repeat(10);

    const item1 = document.createElement('div');
    item1.className = 'ticker-item';
    item1.innerText = content;

    const item2 = document.createElement('div');
    item2.className = 'ticker-item';
    item2.innerText = content;

    tickerMove.appendChild(item1);
    tickerMove.appendChild(item2);
    tickerWrap.appendChild(tickerMove);

    header.parentNode.insertBefore(tickerWrap, header.nextSibling);
}



let snowInterval;
let isSnowing = true;
const snowBtn = document.querySelector('.snow-toggle');
const snowIcon = snowBtn.querySelector('i');

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    const startLeft = Math.random() * window.innerWidth;
    const size = Math.random() * 5 + 2;
    const duration = Math.random() * 5 + 5;
    const opacity = Math.random() * 0.5 + 0.1;

    snowflake.style.left = startLeft + 'px';
    snowflake.style.width = size + 'px';
    snowflake.style.height = size + 'px';
    snowflake.style.animationDuration = duration + 's';
    snowflake.style.opacity = opacity;

    document.body.appendChild(snowflake);

    setTimeout(() => {
        snowflake.remove();
    }, duration * 1000);
}

function startSnow() {
    snowInterval = setInterval(createSnowflake, 200);
    isSnowing = true;
    snowBtn.classList.remove('off');
}

function stopSnow() {
    clearInterval(snowInterval);
    isSnowing = false;
    snowBtn.classList.add('off');

    document.querySelectorAll('.snowflake').forEach(el => el.remove());
    document.querySelectorAll('.snowflake').forEach(el => el.remove());
}

startSnow();

snowBtn.addEventListener('click', () => {
    if (isSnowing) {
        stopSnow();
    } else {
        startSnow();
    }
});