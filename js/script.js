

const burgerMenu = document.getElementById('burger-menu');
const menu = document.querySelector('.header-menu');
const menuItems = document.querySelectorAll('.header-menu_item');

burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('open');
  menu.classList.toggle('open');

  // Забороняємо скрол на body при відкритті меню
  if (menu.classList.contains('open')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Додаємо обробник події для кожного елемента меню
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    if (menu.classList.contains('open')) {
      burgerMenu.classList.remove('open');
      menu.classList.remove('open');

      // Відновлюємо скрол після закриття меню
      document.body.style.overflow = '';
    }
  });
});

// Аккордеон
function accordion() {
  const items = document.querySelectorAll('.accordion__item-trigger')
  items.forEach(item => {
    item.addEventListener('click', () => {
      const parent = item.parentNode
      if (parent.classList.contains('accordion__item-active')) {
        parent.classList.remove('accordion__item-active')
      } else {
        document
          .querySelectorAll('.accordion__item')
          .forEach(child => child.classList.remove('accordion__item-active'))
        parent.classList.add('accordion__item-active')
      }
    })
  })
}
accordion()





document.addEventListener('DOMContentLoaded', () => {
  const triggers = document.querySelectorAll('.about-managers_trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const parentBlock = trigger.closest('.about-managers_accordion-block');

      if (parentBlock.classList.contains('active')) {
        parentBlock.classList.remove('active');
      } else {
        // Если нужно закрывать другие блоки при открытии одного, раскомментируйте следующий код:
        // document.querySelectorAll('.about-managers_accordion-block.active').forEach(activeBlock => {
        //   activeBlock.classList.remove('active');
        // });

        parentBlock.classList.add('active');
      }
    });
  });
});

window.scrollTo({
  top: 10, // кількість пікселів зверху
  behavior: 'smooth' // плавність анімації
});



// Отримуємо елементи
const modal = document.querySelector('.modal'); // Модальне вікно
const modalWindow = document.querySelector('.modal_window'); // Вікно всередині модального
const openButtons = document.querySelectorAll('.contact-uss'); // Кнопки для відкриття модалки
const closeButton = document.querySelector('.modal_close'); // Кнопка для закриття модалки
const body = document.querySelector('body'); // Тіло сторінки

// Функція для відкриття модального вікна
function openModal() {
  modalWindow.style.display = 'block';
  modal.style.display = 'block';
  body.style.overflow = 'hidden'; // Блокуємо прокручування сторінки
}

// Функція для закриття модального вікна
function closeModal() {
  modalWindow.style.display = 'none';
  modal.style.display = 'none';
  body.style.overflow = ''; // Відновлюємо прокручування сторінки
}

// Додаємо слухачі подій на кнопки для відкриття модалки
openButtons.forEach(button => {
  button.addEventListener('click', openModal);
});

// Додаємо слухач на кнопку закриття модалки
closeButton.addEventListener('click', closeModal);

// Закриваємо модальне вікно при кліку поза ним
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.querySelector('.modal_form').addEventListener('submit', function (e) {
  e.preventDefault(); // Запобігаємо стандартному відправленню форми

  // Збираємо дані форми
  const messageData = {
    username: this.username.value,
    tel: this.tel.value,
    area: this.area.value,
    text: this.text.value // Отримуємо значення з нового поля text
  };

  // Перевірка, чи всі обов'язкові поля заповнені
  if (!messageData.username || !messageData.tel || !messageData.text) {
    alert('All fields are required.');
    return; // Якщо якийсь з обов\'язкових полів не заповнено, зупиняємо відправку
  }

  // Закриваємо модальне вікно перед відправкою запиту
  closeModal();

  // Очищаємо форму після закриття модального вікна
  this.reset();

  // Використовуємо Axios для відправки запиту на сервер
  axios.post('/api/send-message', messageData)
    .then(response => {
      // Якщо запит успішний
      if (response.data.success) {
        alert('Thank you, we will get in touch with you shortly!');
      } else {
        // Якщо сервер відповідає, але є помилка
        alert('Thank you, we will get in touch with you shortly!');
      }
    })
    .catch(error => {
      // Відображаємо повідомлення про помилку навіть при помилці
      console.error('Error:', error);
      alert('Thank you, we will get in touch with you shortly!');
    });
});







document.addEventListener('DOMContentLoaded', function () {
  const phoneInput = document.getElementById('tel');

  // Маска для телефонного номеру з початком +420
  const phoneMask = new Inputmask({
    mask: '+4999999999999', // Маска для номера
    placeholder: '',        // Прибираємо підкреслення
    showMaskOnHover: false, // Не показувати маску при наведенні
    showMaskOnFocus: true   // Показувати маску лише при фокусі
  });

  phoneMask.mask(phoneInput); // Підключення маски до поля вводу
});


//slider
let slider = document.querySelector('.slider'),
  sliderList = slider.querySelector('.slider-list'),
  sliderTrack = slider.querySelector('.slider-track'),
  slides = slider.querySelectorAll('.slide'),
  arrows = slider.querySelector('.slider-arrows'),
  prev = arrows.children[0],
  next = arrows.children[1],
  slideWidth = slides[0].offsetWidth,
  slideIndex = 0,
  posInit = 0,
  posX1 = 0,
  posX2 = 0,
  posY1 = 0,
  posY2 = 0,
  posFinal = 0,
  isSwipe = false,
  isScroll = false,
  allowSwipe = true,
  transition = true,
  nextTrf = 0,
  prevTrf = 0,
  lastTrf = --slides.length * slideWidth,
  posThreshold = slides[0].offsetWidth * 0.35,
  trfRegExp = /([-0-9.]+(?=px))/,
  swipeStartTime,
  swipeEndTime,
  getEvent = function () {
    return (event.type.search('touch') !== -1) ? event.touches[0] : event;
  },
  slide = function () {
    if (transition) {
      sliderTrack.style.transition = 'transform .5s';
    }
    sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

    prev.classList.toggle('disabled', slideIndex === 0);
    next.classList.toggle('disabled', slideIndex === --slides.length);
  },
  swipeStart = function () {
    let evt = getEvent();

    if (allowSwipe) {

      swipeStartTime = Date.now();

      transition = true;

      nextTrf = (slideIndex + 1) * -slideWidth;
      prevTrf = (slideIndex - 1) * -slideWidth;

      posInit = posX1 = evt.clientX;
      posY1 = evt.clientY;

      sliderTrack.style.transition = '';

      document.addEventListener('touchmove', swipeAction);
      document.addEventListener('mousemove', swipeAction);
      document.addEventListener('touchend', swipeEnd);
      document.addEventListener('mouseup', swipeEnd);

      sliderList.classList.remove('grab');
      sliderList.classList.add('grabbing');
    }
  },
  swipeAction = function () {

    let evt = getEvent(),
      style = sliderTrack.style.transform,
      transform = +style.match(trfRegExp)[0];

    posX2 = posX1 - evt.clientX;
    posX1 = evt.clientX;

    posY2 = posY1 - evt.clientY;
    posY1 = evt.clientY;

    if (!isSwipe && !isScroll) {
      let posY = Math.abs(posY2);
      if (posY > 7 || posX2 === 0) {
        isScroll = true;
        allowSwipe = false;
      } else if (posY < 7) {
        isSwipe = true;
      }
    }

    if (isSwipe) {
      if (slideIndex === 0) {
        if (posInit < posX1) {
          setTransform(transform, 0);
          return;
        } else {
          allowSwipe = true;
        }
      }

      // запрет ухода вправо на последнем слайде
      if (slideIndex === --slides.length) {
        if (posInit > posX1) {
          setTransform(transform, lastTrf);
          return;
        } else {
          allowSwipe = true;
        }
      }

      if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
        reachEdge();
        return;
      }

      sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
    }

  },
  swipeEnd = function () {
    posFinal = posInit - posX1;

    isScroll = false;
    isSwipe = false;

    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);

    sliderList.classList.add('grab');
    sliderList.classList.remove('grabbing');

    if (allowSwipe) {
      swipeEndTime = Date.now();
      if (Math.abs(posFinal) > posThreshold || swipeEndTime - swipeStartTime < 300) {
        if (posInit < posX1) {
          slideIndex--;
        } else if (posInit > posX1) {
          slideIndex++;
        }
      }

      if (posInit !== posX1) {
        allowSwipe = false;
        slide();
      } else {
        allowSwipe = true;
      }

    } else {
      allowSwipe = true;
    }

  },
  setTransform = function (transform, comapreTransform) {
    if (transform >= comapreTransform) {
      if (transform > comapreTransform) {
        sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
      }
    }
    allowSwipe = false;
  },
  reachEdge = function () {
    transition = false;
    swipeEnd();
    allowSwipe = true;
  };

sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
sliderList.classList.add('grab');

sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
slider.addEventListener('touchstart', swipeStart);
slider.addEventListener('mousedown', swipeStart);

arrows.addEventListener('click', function () {
  let target = event.target;

  if (target.classList.contains('next')) {
    slideIndex++;
  } else if (target.classList.contains('prev')) {
    slideIndex--;
  } else {
    return;
  }

  slide();
});