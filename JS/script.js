window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    // TABS
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');
    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);
    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }
    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // TIMER

    let deadLine = '2020-10-21';
    
    function getTimeRemaining(endtime) {
        let a = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((a/1000) % 60),
            minutes = Math.floor((a/1000/60) % 60),
            hours = Math.floor((a/(1000*60*60)));
        return {
            'total' : a,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }
    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(upDateClock, 1000);
        function upDateClock() {
            let a = getTimeRemaining(endtime);
                let zero = (num) => {
                    if (num <= 9) {
                        return '0' + num;
                    } else return num;
                };
            hours.textContent = zero(a.hours);
            minutes.textContent = zero(a.minutes);
            seconds.textContent = zero(a.seconds);
            if (a.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }
    setClock('timer', deadLine);

    //MODAL

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-cplash');
        document.body.style.overflow = 'hidden';
    });
    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-cplash');
        document.body.style.overflow = '';
    });

    let description = document.querySelector('.description-btn'),
        overBlock = document.querySelector('.overlay'),
        divClose = document.querySelector('.popup-close');
    
    description.addEventListener('click', function() {
        overBlock.style.display = 'block';
        this.classList.add('more-cplash');
        document.body.style.overflow = 'hidden';
    });
    divClose.addEventListener('click', function() {
        overBlock.style.display = 'none';
        description.classList.remove('more-cplash');
        document.body.style.overflow = '';
    });
    // FORM

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо, мы с вами свяжемся',
        failure: 'Ошибка!'
    };
    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        
        let formData = new FormData(form);
        let obj = {};
        
        formData.forEach(function(value, key) {
            obj[key] = value;
        });

        let json = JSON.stringify(obj);

        request.send(json);
        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if(request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });
});

