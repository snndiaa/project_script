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




document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.querySelector('.bt');
    const modal = document.getElementById('successModal');

    if (sendBtn && modal) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const msgInput = document.getElementById('question');

        const closeBtn = document.querySelector('.close-modal');
        const okBtn = document.querySelector('.modal-btn-ok');

        const showError = (input) => {
            input.classList.add('error');
            input.addEventListener('input', () => {
                input.classList.remove('error');
            }, { once: true });
        };

        const isValidEmail = (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };

        const isValidPhone = (phone) => {
            const cleanPhone = phone.replace(/[^\d]/g, '');
            return cleanPhone.length >= 10 && /^[\d\+\-\(\)\s]+$/.test(phone);
        };

        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => { modal.style.display = 'none'; }, 300);
        };

        sendBtn.addEventListener('click', (e) => {
            e.preventDefault();

            let isValid = true;

            if (nameInput.value.trim().length < 2) {
                showError(nameInput);
                isValid = false;
            }

            if (!isValidEmail(emailInput.value.trim())) {
                showError(emailInput);
                isValid = false;
            }

            if (!isValidPhone(phoneInput.value.trim())) {
                showError(phoneInput);
                isValid = false;
            }

            if (msgInput.value.trim() === '') {
                showError(msgInput);
                isValid = false;
            }

            if (!isValid) {
                return;
            }

            nameInput.value = '';
            emailInput.value = '';
            phoneInput.value = '';
            msgInput.value = '';

            modal.style.display = 'flex';
            setTimeout(() => { modal.classList.add('show'); }, 10);
        });

        closeBtn.addEventListener('click', closeModal);
        okBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
});




const toggleBtnWrapper = document.getElementById('galleryToggleBtn');

if (toggleBtnWrapper) {
    const btnTextSpan = toggleBtnWrapper.querySelector('.btn-text');
    const btnIconSpan = toggleBtnWrapper.querySelector('.btn-icon i');
    let isExpanded = false;

    toggleBtnWrapper.addEventListener('click', function (e) {
        e.preventDefault();

        const togglableItems = document.querySelectorAll('.gallery-item.gallery-hidden, .gallery-item.gallery-visible');

        if (!isExpanded) {
            togglableItems.forEach((item, index) => {
                item.classList.remove('gallery-hidden');
                item.classList.add('gallery-visible');

                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, index * 100);
            });

            btnTextSpan.textContent = 'Show Less Works';
            btnIconSpan.classList.remove('fa-arrow-down');
            btnIconSpan.classList.add('fa-arrow-up');
            isExpanded = true;

        } else {
            togglableItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
            });

            setTimeout(() => {
                togglableItems.forEach(item => {
                    item.classList.remove('gallery-visible');
                    item.classList.add('gallery-hidden');

                    item.style.opacity = '';
                    item.style.transform = '';
                });
            }, 400);

            btnTextSpan.textContent = 'Show All Works';
            btnIconSpan.classList.remove('fa-arrow-up');
            btnIconSpan.classList.add('fa-arrow-down');
            isExpanded = false;
            toggleBtnWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const mapFrame = document.getElementById('mapFrame');
    const mapTabs = document.querySelectorAll('.map-tab-btn');

    const mapUrls = {
        'odessa': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2747.664673322192!2d30.73262031559868!3d46.48464397912626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c631904a434773%3A0x6334237748438258!2sSadova%20St%2C%203%2C%20Odesa%2C%20Odeska%20oblast%2C%20Ukraine%2C%2065000!5e0!3m2!1sen!2sua!4v1620000000000!5m2!1sen!2sua',

        'tbilisi': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.293308331166!2d44.7833!3d41.7166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cd7e64f626b%3A0x61d084ede2576ea3!2sTbilisi%2C%20Georgia!5e0!3m2!1sen!2sge!4v1620000000000!5m2!1sen!2sge',

        'bucharest': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d365280.9754382103!2d25.928574457782637!3d44.43774010000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f93abf3cad4f%3A0xac0632e37c9ca628!2sBucharest%2C%20Romania!5e0!3m2!1sen!2sro!4v1620000000000!5m2!1sen!2sro'
    };

    if (mapFrame && mapTabs.length > 0) {
        mapTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                mapTabs.forEach(t => t.classList.remove('active'));

                tab.classList.add('active');

                const city = tab.getAttribute('data-city');

                if (mapUrls[city]) {
                    mapFrame.style.opacity = '0.5';

                    setTimeout(() => {
                        mapFrame.src = mapUrls[city];
                        mapFrame.onload = () => {
                            mapFrame.style.opacity = '1';
                        };
                        setTimeout(() => mapFrame.style.opacity = '1', 500);
                    }, 200);
                }
            });
        });
    }
});







document.addEventListener('DOMContentLoaded', () => {


    const prizes = [
        { label: '5%', code: 'BEAUTY5', color: '#1a1a1a', text: '#d4a574' },
        { label: '10%', code: 'BEAUTY10', color: '#d4a574', text: '#1a1a1a' },
        { label: 'Try Again', code: null, color: '#1a1a1a', text: '#ffffff' },

        { label: '15%', code: 'BEAUTY15', color: '#d4a574', text: '#1a1a1a' },
        { label: '20%', code: 'BEAUTY20', color: '#1a1a1a', text: '#d4a574' },
        { label: 'FREE SPA', code: 'FREESPA', color: '#d4a574', text: '#1a1a1a' }
    ];

    const canvas = document.getElementById('wheelCanvas');
    const spinBtn = document.getElementById('spinBtn');
    const prizeModal = document.getElementById('prizeModal');



    const prizeValueEl = document.getElementById('prizeValue');
    const promoInput = document.getElementById('promoInput');
    const copyBtn = document.getElementById('copyBtn');



    const modalIcon = document.querySelector('.modal-icon i');
    const modalTitle = document.querySelector('.prize-content h3');
    const modalText = document.querySelector('.prize-content p');

    const promoText = document.querySelector('.prize-content p:nth-of-type(2)');

    const promoBox = document.querySelector('.promo-box');

    if (canvas && spinBtn) {
        const ctx = canvas.getContext('2d');
        let currentRotation = 0;
        let isSpinning = false;
        const slices = prizes.length;
        const sliceDeg = 360 / slices;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = canvas.width / 2;



        function drawWheel() {
            prizes.forEach((prize, i) => {
                const startAngle = (i * sliceDeg * Math.PI) / 180;
                const endAngle = ((i + 1) * sliceDeg * Math.PI) / 180;

                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, startAngle, endAngle);
                ctx.fillStyle = prize.color;
                ctx.fill();
                ctx.stroke();

                ctx.save();
                ctx.translate(centerX, centerY);
                ctx.rotate(startAngle + (sliceDeg * Math.PI) / 360);
                ctx.textAlign = "right";
                ctx.fillStyle = prize.text;
                ctx.font = "bold 28px Montserrat";
                ctx.fillText(prize.label, radius - 20, 10);
                ctx.restore();
            });
        }
        drawWheel();



        spinBtn.addEventListener('click', () => {
            if (isSpinning) return;
            isSpinning = true;
            spinBtn.style.opacity = '0.5';


            const randomDeg = Math.floor(1800 + Math.random() * 360);
            currentRotation += randomDeg;
            canvas.style.transform = `rotate(${currentRotation}deg)`;

            setTimeout(() => {
                isSpinning = false;
                spinBtn.style.opacity = '1';
                showResult(currentRotation);
            }, 4000);
        });



        function showResult(rotation) {
            const actualDeg = rotation % 360;
            const index = Math.floor((360 - (actualDeg % 360)) / sliceDeg);
            const winningPrize = prizes[index % prizes.length];

            if (prizeModal) {


                if (winningPrize.code) {
                    modalIcon.className = 'fas fa-trophy';

                    modalTitle.textContent = 'Congratulations!';
                    modalText.textContent = 'You won a discount:';
                    prizeValueEl.textContent = winningPrize.label + " OFF";



                    promoText.style.display = 'block';
                    promoBox.style.display = 'flex';
                    promoInput.value = winningPrize.code;
                }


                else {
                    modalIcon.className = 'fas fa-star-half-alt';

                    modalTitle.textContent = 'So Close!';
                    modalText.textContent = 'Luck is saving itself for next time!';
                    prizeValueEl.textContent = "Try Again";



                    promoText.style.display = 'none';
                    promoBox.style.display = 'none';
                }



                prizeModal.style.display = 'flex';
                setTimeout(() => { prizeModal.classList.add('show'); }, 10);
            }
        }
    }



    if (prizeModal) {
        const closePrize = () => {
            prizeModal.classList.remove('show');
            setTimeout(() => { prizeModal.style.display = 'none'; }, 300);
        };

        const closeBtn = document.querySelector('.close-prize');
        const okBtn = document.querySelector('.close-prize-btn');

        if (closeBtn) closeBtn.addEventListener('click', closePrize);
        if (okBtn) okBtn.addEventListener('click', closePrize);
        window.addEventListener('click', (e) => {
            if (e.target == prizeModal) closePrize();
        });



        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                promoInput.select();
                document.execCommand('copy');
                const originalHTML = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => { copyBtn.innerHTML = originalHTML; }, 2000);
            });
        }
    }



    const fortuneBtn = document.querySelector('.fortune-scroll-btn');
    if (fortuneBtn) {
        fortuneBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const section = document.getElementById('fortuneSection');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});