/**
 * найдите минимум и максимум в любой строке
 * @param  {string} string входная строка(числа отделены от других частей строки пробелами или знаками препинания)
 * @return {{min: number, max: number}} объект с минимумом и максимумом
 * '1 и 6.45, -2, но 8, а затем 15, то есть 2.7 и -1028' => { min: -1028, max: 15 }
 */
function getMinMax(string) {
  const array = [];
  const buffer = string;
  let numberFloat = null;

  for (let i = 0; i < buffer.length; i++) {
    numberFloat = parseFloat(buffer.slice(i));
    if (!isNaN(numberFloat)) {
      array.push(numberFloat);
      i += numberFloat.toString().length;
    }
  }

  const sort = () => {
    let exit = null;
    let temp;

    while (!exit) {
      exit = true;
      for (let i = 0; i < (array.length - 1); i++) {
        if (array[i] > array[i + 1]) {
          temp = array[i];
          array[i] = array[i + 1];
          array[i + 1] = temp;
          exit = false;
        }
      }
    }
  };

  sort();

  return {
    min: array[0],
    max: array[array.length - 1]
  };
}

/* ============================================= */

/**
 * Напишите рекурсивную функцию вычисления чисел Фибоначчи
 * @param {number} x номер числа
 * @return {number} число под номером х
 */
function fibonacciSimple(x) {
  if (x < 0) {
    if (x % 2) {
      return fibonacciSimple(-x);
    }
    return -fibonacciSimple(-x);
  }
  if (x === 0 || x === 1) {
    return x;
  }
  return fibonacciSimple(x - 1) + fibonacciSimple(x - 2);
}


/* ============================================= */

/**
 * Напишите функцию для вычисления числа Фибоначчи с мемоизацией:
 * при повторных вызовах функция не вычисляет значения, а достает из кеша.
 * @param {number} x номер числа
 * @return {number} число под номером х
 */
const memory = fn => {
  const cache = { 0: 0, 1: 1 };

  return n => {
    if (n in cache) {
      // console.log('из кэша', n);
      return cache[n];
    }
    // console.log('вычисляем', n);
    const result = fn(n);

    cache[n] = result;
    return result;
  };
};

const fibonacciWithCache = memory(x => {
  if (x < 0) {
    if (x % 2) {
      return fibonacciSimple(-x);
    }
    return -fibonacciSimple(-x);
  }
  if (x === 0 || x === 1) {
    return x;
  }
  return fibonacciSimple(x - 1) + fibonacciSimple(x - 2);
});

/* ============================================= */

/**
 * Напишите функцию printNumbers, выводящую числа в столбцах
 * так, чтобы было заполнено максимальное число столбцов при
 * минимальном числе строк.
 * Разделитель межу числами в строке - один пробел,
 * на каждое число при печати - отводится 2 символа
 * Пример работы: printNumbers(11, 3)
 *  0  4  8
 *  1  5  9
 *  2  6 10
 *  3  7 11
 * @param  {number} max  максимальное число (до 99)
 * @param  {number} cols количество столбцов
 * @return {string}
 */
function printNumbers(max, cols) {
  const rows = parseInt((max + 1) / cols, 10) + ((max + 1) % cols !== 0);
  const array2 = [];
  let elem = null;
  let array1;

  for (let i = 0; i < rows; i++) {
    elem = i;
    array1 = [];

    for (let j = 0; j < cols; j++) {
      if (elem <= max) {
        array1.push((' ' + elem.toString()).slice(-2));
      }
      elem += rows;
    }
    array2.push(array1.join(' '));
  }

  return array2.join('\n');
}

/* ============================================= */

/**
 * Реализуйте RLE-сжатие: AAAB -> A3B, BCCDDDEEEE -> BC2D3E4
 * @param  {string} value
 * @return {string}
 */
function rle(input) {
  function zip(match) {
    if (match.length > 1) {
      match = match[0] + match.length;
    }
    return match;
  }

  return input.replace(/(\w)\1*/gi, zip);
}

module.exports = {
  getMinMax,
  rle,
  printNumbers,
  fibonacciSimple,
  fibonacciWithCache
};
