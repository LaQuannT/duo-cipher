const specialCharacters = /[\s`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

function encrypt({ key1, key2, message }) {
  let encryptedMsg = '',
    value = 0;

  for (let i = 0; i < message.length; i++) {
    value = message.charCodeAt(i);

    if (specialCharacters.test(message[i])) {
      encryptedMsg += message[i];
    } else if (i % 2 == 0) {
      value -= key1;
      if (value < 97) {
        value = 123 - (97 - value);
      }
      encryptedMsg += String.fromCharCode(value);
    } else {
      value += key2;
      if (value > 122) {
        value = value - 122 + 96;
      }
      encryptedMsg += String.fromCharCode(value);
    }
  }
  return encryptedMsg;
}

function decrypt({ key1, key2, message }) {
  let decryptedMsg = '',
    value = 0;

  for (let i = 0; i < message.length; i++) {
    value = message.charCodeAt(i);

    if (specialCharacters.test(message[i])) {
      decryptedMsg += message[i];
    } else if (i % 2 == 0) {
      value += key1;
      if (value > 122) {
        value = value - 122 + 96;
      }
      decryptedMsg += String.fromCharCode(value);
    } else {
      value -= key2;
      if (value < 97) {
        value = 123 - (97 - value);
      }
      decryptedMsg += String.fromCharCode(value);
    }
  }
  return decryptedMsg;
}

export default { encrypt, decrypt };
