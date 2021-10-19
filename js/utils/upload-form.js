const photoModal = document.querySelector('.img-upload__overlay');
const formModal = document.querySelector('#upload-select-image');
const siteBody = document.querySelector('body');
const openModalButton = document.querySelector('#upload-file');
const closeModalButton = document.querySelector('#upload-cancel');
const userCommentInput = document.querySelector('.text__description');
const reHashtags =  /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const userHashtagInput = document.querySelector('.text__hashtags');
const MAX_HASHTEG_LENGTH = 5;

const isEscKey = (evt) => evt.key === 'Escape';

const onModalEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closePhotoModal ();
  }
};

function openPhotoModal () {
  photoModal.classList.remove('hidden');
  siteBody.classList.add('.modal-open');

  document.addEventListener('keydown', onModalEscKeydown);
}

function closePhotoModal () {
  photoModal.classList.add('hidden');
  siteBody.classList.remove('.modal-open');

  document.addEventListener('keydown', onModalEscKeydown);
  openModalButton.value = null;
  formModal.value.remove();
}

openModalButton.addEventListener('change', () => {
  openPhotoModal ();
});

closeModalButton.addEventListener('click', () => {
  closePhotoModal ();
});

const stopEscEvent = (evt) => {
  if (isEscKey(evt)) {
    evt.stopPropagation();
  }
};

userCommentInput.addEventListener('keydown', (evt) => {
  stopEscEvent(evt);
});

userHashtagInput.addEventListener('keydown', (evt) => {
  stopEscEvent(evt);
});

// userHashtagInput.addEventListener('input', () => {

//   const hashtagsArray = userHashtagInput.value.split(' ');

//   for (let hashtag = 0; hashtag < hashtagsArray.length; hashtag++) {
//     if (reHashtags.test(hashtagsArray[hashtag])) {
//       userHashtagInput.setCustomValidity('');
//     } else {
//       userHashtagInput.setCustomValidity('хэш-тег начинается с символа "#", строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д., хеш-тег не может состоять только из одной решётки, максимальная длина одного хэш-тега 20 символов, включая решётку, хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом, хэш-теги разделяются пробелами');
//       break;
//     }
//   }

//   if (hashtagsArray.length > MAX_HASHTEG_LENGTH) {
//     userHashtagInput.setCustomValidity(`Удалите лишние ${  hashtagsArray.length - MAX_HASHTEG_LENGTH } хештега.`);
//   } else {
//     userHashtagInput.setCustomValidity('');
//   }

//   userHashtagInput.reportValidity();
// });


const testHashtagsArray = (hashtagsArray) => {
  for (let hashtag = 0; hashtag < hashtagsArray.length; hashtag++) {
    if (!reHashtags.test(hashtagsArray[hashtag])) {
      return false;
    }
  }
  return true;
};

userHashtagInput.addEventListener('input', () => {
  const hashtagsArray = userHashtagInput.value.split(' ');
  if (!testHashtagsArray(hashtagsArray)) {
    userHashtagInput.setCustomValidity('ошибка в оформлении');
  } else if (hashtagsArray.length > MAX_HASHTEG_LENGTH) {
    userHashtagInput.setCustomValidity('нельзя указать больше пяти хэш-тегов');
  } else {
    userHashtagInput.setCustomValidity('');
  }
  userHashtagInput.reportValidity();
});
