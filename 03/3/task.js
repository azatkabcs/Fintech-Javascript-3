/**
 * Реализовать функцию, поведение которой аналогично поведению Promise.all,
 * которая возвращает в качестве результата rejected промис c первым reject value или resolve с массивом resolveValues,
 * в соответствущих исходному массиву промисов позициях, если не было ни одного промиса с reject.
 * @param {Array<Promise>} promises - массив с исходными промисами
 * @return {Promise}
 */
function promiseAll(promises) {
  const result = [];
  let count = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((current, i) => {
      current
        .then(item => {
          result[i] = item;
          count += 1;
          if (count === promises.length) {
            resolve(result);
          }
        }, reject);
    });
  });
}

module.exports = promiseAll;
