#!/usr/bin/env node

import { select, input } from '@inquirer/prompts';
import cipher from './cipher.js';

let cipherMethod, key1, key2, message;

function info() {
  console.log(`
    HOW TO USE
    Choose a method [Encrypt or Decrypt].
    Supply two keys with number between 1-13.
    Supply message no longer than 70 characters.
  `);
}

async function getMethod() {
  const method = await select({
    message: 'Would you like to Encrypt or Decrypt?',
    choices: [
      {
        name: 'Encrypt',
        value: 'encrypt',
      },
      {
        name: 'Decrypt',
        value: 'decrypt',
      },
    ],
  });

  cipherMethod = method;
}

async function getFirstKey() {
  const key = await input({
    message: 'First key:',
    validate: (input) => {
      if (!input) {
        return 'Please enter a number between 1-13';
      }
      return true;
    },
  });

  key1 = validateKey(key);
}

async function getSecondKey() {
  const key = await input({
    message: 'Second key:',
    validate: (input) => {
      if (!input) {
        return 'Please enter a number between 1-13';
      }
      return true;
    },
  });

  key2 = validateKey(key);
}

function validateKey(val) {
  const result = Number(val);
  if (isNaN(result) || result < 1 || result > 13) {
    console.log('keys must be a number between 1-13');
    process.exit(1);
  }
  return result;
}

async function getMessage() {
  const msg = await input({
    message: 'Enter a message:',
    validate: (input) => {
      if (!input) {
        return 'Please enter a message';
      }
      return true;
    },
  });

  message = validateMessage(msg);
}

function validateMessage(text) {
  if (text.length > 70) {
    console.log('Message must be between 1-70 characters');
    process.exit(1);
  }
  return text.toLowerCase().trim();
}

function results() {
  let msg;
  cipherMethod === 'encrypt'
    ? (msg = cipher.encrypt({ key1, key2, message }))
    : (msg = cipher.decrypt({ key1, key2, message }));

  console.log(`
    cipher text: ${msg}
  `);
}

info();
await getMethod();
await getFirstKey();
await getSecondKey();
await getMessage();
results();
