/**
 * Исправьте проблему с таймером: должны выводиться числа от 0 до 9.
 * Доп. задание: предложите несколько вариантов решения.
 */
function timer(logger = console.log) {
  for (let i = 0; i < 10; i++) { /* первое решение */
    setTimeout(() => {
      logger(i);
    }, 100);
  }
/* второе решение -- IIFE

  for (var i = 0; i < 10; i++) {
    (index => {
      setTimeout(() => {
        logger(index);
      }, 100);
    })(i);
  }

  третье решение -- замыкание

  for (var i = 0; i < 10; i++) {
    const user = {
      num: i,
      log: () => {
        logger(user.num);
      }
    };

    setTimeout(user.log, 100);
  }
*/
}


/*= ============================================ */

/**
 * Создайте собственную реализацию функции bind
 * @param {Function} func передаваемая функция
 * @param {any} context контекст
 * @param {Array<any>} args массив аргументов
 * @return {Function} функция с нужным контекстом
 */
function customBind(func, context, ...args) {
  return function(...bindArgs) {
    return func.call(context, ...args, ...bindArgs);
  };
}

/*= ============================================ */

/**
 * Напишите функцию sum, вычисляющую суммы подобным образом:
 * sum(1)(2)( ) // 3
 * sum(1)(2)(3)( ) // 6
 * sum :: Number -> sum
 * sum :: void -> Number
 */
function sum(x) {
  if (x === undefined) {
    return 0;
  }
  return y => y === undefined ? x : sum(x + y);
}

/*= ============================================ */

/**
 * Определите, являются ли строчки анаграммами (например, “просветитель” — “терпеливость”).
 * @param {string} first
 * @param {string} second
 * @return {boolean}
 */
function anagram(first, second) {
  const keys = {};

  if (first.length !== second.length) {
    return false; //  сразу выходим, если длина разная
  }
  for (let i = 0; i < first.length; i++) {
    first[i] in keys ? keys[first[i]]++ : keys[first[i]] = 1;
  }
  for (let i = 0; i < second.length; i++) {
    if (keys[second[i]] > 0) {
      keys[second[i]]--;
    } else {
      return false; //  выйдем раньше, если нет такого ключа или количество таких букв больше во втором массиве
    }
  }
  for (const key in keys) {
    if (keys[key] !== 0) {
      return false;
    }
  }
  return true;
}

/*= ============================================ */

/**
 * Сократите массив до набора уникальных значений
 * [1,1, 2, 6, 3, 6, 2] → [1, 2, 3, 6]
 * @param {Array<number>} исходный массив
 * @return {Array<number>} массив уникальных значений, отсортированный по возрастанию
 */
function getUnique(arr) {
  return [...new Set(arr.sort((x, y) => x - y))];
}

/**
 * Найдите пересечение двух массивов
 * [1, 3, 5, 7, 9] и [1, 2, 3, 4] → [1, 3]
 * @param {Array<number>, Array<number>} first, second исходные массивы
 * @return {Array<number>} массив уникальных значений, отсортированный по возрастанию
 */
function getIntersection(first, second) {
  const keys = {};
  const result = [];

  for (let i = 0; i < first.length; i++) {
    first[i] in keys ? keys[first[i]]++ : keys[first[i]] = 1;
  }
  for (let i = 0; i < second.length; i++) {
    if (keys[second[i]] > 0) {
      result.push(second[i]);
      keys[second[i]]--;
    }
  }
  return result.sort((x, y) => x - y);
}

/* ============================================= */

/**
 * Две строки называются изоморфными, когда в строке A можно заменить
 * конкретный символ на любой другой для получения строки B. (Расстояние Левенштейна, при возможных мутациях
 * ограничивающихся заменой символа - отличается на 1).
 * Отдельно стоит отметить что строка изоморфна самой себе.
 * Порядок символов должен остаться неизменным. Каждый
 * последовательный символ в строке A сравнивается с
 * каждым последовательным символов в строке B.
 *
 * @param  {string} left
 * @param  {string} right
 * @return {boolean}
 */
function isIsomorphic(left, right) {
  let flag = false;

  if (left.length !== right.length) {
    return flag;
  }
  for (let i = 0; i < left.length; i++) {
    if (left[i] !== right[i]) {
      if (flag) {
        return false; //  если второй раз несовпадение, сразу же выходим
      }
      flag = true;
    }
  }
  return true;
}

module.exports = {
  timer,
  customBind,
  sum,
  anagram,
  getUnique,
  getIntersection,
  isIsomorphic
};
