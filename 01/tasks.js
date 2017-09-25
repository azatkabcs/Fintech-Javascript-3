/**
 * найдите минимум и максимум в любой строке
 * @param  {string} string входная строка(числа отделены от других частей строки пробелами или знаками препинания)
 * @return {{min: number, max: number}} объект с минимумом и максимумом
 * '1 и 6.45, -2, но 8, а затем 15, то есть 2.7 и -1028' => { min: -1028, max: 15 }
 */
function getMinMax(string) {
	let array = [];
	let buffer = string;
	let number_int = null, number_float = null;

	for (let i = 0; i < buffer.length; i++){
		number_float = parseFloat(buffer.slice(i));
		if (!isNaN(number_float)){
			array.push(number_float);
			i += number_float.toString().length ;
		}	
	}	

	sort();

	return {
		min: array[0],
		max: array[array.length - 1]
	}

	function sort(){
		let exit = null;
		let temp;

		while (!exit) 
		{
			exit = true;
			for (let i = 0; i < (array.length - 1); i++) 
				if (array[i] > array[i + 1]) 
    			{
    				temp = array[i];
    				array[i] = array[i + 1];
     				array[i + 1] = temp;
     				exit = false; 
    			}
 		}
	}

}

/* ============================================= */

/**
 * Напишите рекурсивную функцию вычисления чисел Фибоначчи
 * @param {number} x номер числа
 * @return {number} число под номером х
 */
function fibonacciSimple(x) {
	if (x < 0)
		return x % 2 ? fibonacciSimple(-x) : -fibonacciSimple(-x);
	else
		return (x === 0) || (x === 1) ? x : fibonacciSimple(x-1) + fibonacciSimple(x-2);
}

/* ============================================= */

/**
 * Напишите функцию для вычисления числа Фибоначчи с мемоизацией:
 * при повторных вызовах функция не вычисляет значения, а достает из кеша.
 * @param {number} x номер числа
 * @return {number} число под номером х
 */
const memory = (fn) => {
	let cache = {};

	return (n) => {
    	if (n in cache) {
      		//console.log('из кэша', n);
      		return cache[n];
    	}
    	else {
      		//console.log('вычисляем', n);
      		let result = fn(n);
      		cache[n] = result;
      		return result;
    	}
  	}
}

const fibonacciWithCache = memory((x) => {
	if (x < 0)
		return x % 2 ? fibonacciWithCache(-x) : -fibonacciWithCache(-x);
	else
		return (x === 0) || (x === 1) ? x : fibonacciWithCache(x-1) + fibonacciWithCache(x-2);
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
	const rows = parseInt((max+1)/cols) + ((max+1)%cols !== 0);
	let string = '';
	let elem = null;

	for (let i = 0; i < rows; i++){
		elem = i;
		for(let j = 0 ; j < cols; j++){
			if (elem <= max)
				(elem < 10) ? string += ' ' + elem : string += elem;	
			if (j < cols - 1 && elem < max)
				string += ' ';		
			elem += rows;	
		}
		if (i < rows - 1)
			string += '\n';
	}

	return string;
}

/* ============================================= */

/**
 * Реализуйте RLE-сжатие: AAAB -> A3B, BCCDDDEEEE -> BC2D3E4
 * @param  {string} value
 * @return {string}
 */
function rle(input) {
	function zip(match){
		if (match.length > 1) 
			match = match[0]+ match.length;
		return match
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
