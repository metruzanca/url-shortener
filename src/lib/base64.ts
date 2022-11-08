const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';

// 64^4 = 16_777_216
export default function createBase64(length = 4) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += alphabet[ (Math.floor(Math.random() * alphabet.length)) ];
  }
  return result;
}
