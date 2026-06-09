#!/usr/bin/env node

/**
 * Supported calculator operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 * - modulo
 * - exponentiation
 * - square root
 */

function addition(a, b) {
  return a + b;
}

function subtraction(a, b) {
  return a - b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }

  return a / b;
}

function modulo(a, b) {
  if (b === 0) {
    throw new Error("Modulo by zero is not allowed.");
  }

  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error("Square root is not defined for negative numbers.");
  }

  return Math.sqrt(n);
}

function calculate(a, operator, b) {
  switch (operator) {
    case "+":
      return addition(a, b);
    case "-":
      return subtraction(a, b);
    case "*":
    case "x":
    case "X":
      return multiplication(a, b);
    case "/":
      return division(a, b);
    case "%":
      return modulo(a, b);
    case "^":
    case "**":
      return power(a, b);
    case "sqrt":
      return squareRoot(a);
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

function parseNumber(value, label) {
  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue)) {
    throw new Error(`${label} must be a valid number.`);
  }

  return parsedValue;
}

function printUsage() {
  console.log("Usage: node src/calculator.js <number1> <operator> <number2>");
  console.log("Example: node src/calculator.js 8 + 4");
  console.log("Square root: node src/calculator.js sqrt <number>");
}

function runCli(argv = process.argv.slice(2)) {
  if (argv.length !== 2 && argv.length !== 3) {
    printUsage();
    return 1;
  }

  try {
    let result;

    if (argv.length === 2) {
      const operator = argv[0];

      if (operator !== "sqrt") {
        printUsage();
        return 1;
      }

      const value = parseNumber(argv[1], "The value");
      result = calculate(value, operator);
    } else {
      const firstNumber = parseNumber(argv[0], "The first value");
      const operator = argv[1];
      const secondNumber = parseNumber(argv[2], "The second value");
      result = calculate(firstNumber, operator, secondNumber);
    }

    console.log(result);
    return 0;
  } catch (error) {
    console.error(error.message);
    return 1;
  }
}

if (require.main === module) {
  process.exitCode = runCli();
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
  calculate,
  printUsage,
  runCli
};
