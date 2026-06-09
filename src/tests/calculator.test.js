const {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
  calculate,
  runCli
} = require("../calculator");

describe("calculator operation functions", () => {
  describe("addition", () => {
    test("adds positive integers", () => {
      expect(addition(7, 2)).toBe(9);
    });

    test("matches the image example 2 + 3", () => {
      expect(addition(2, 3)).toBe(5);
    });

    test("adds decimal numbers", () => {
      expect(addition(2.5, 1.5)).toBe(4);
    });
  });

  describe("subtraction", () => {
    test("subtracts positive integers", () => {
      expect(subtraction(7, 2)).toBe(5);
    });

    test("matches the image example 10 - 4", () => {
      expect(subtraction(10, 4)).toBe(6);
    });

    test("subtracts into a negative result", () => {
      expect(subtraction(4, 10)).toBe(-6);
    });
  });

  describe("multiplication", () => {
    test("multiplies positive integers", () => {
      expect(multiplication(7, 2)).toBe(14);
    });

    test("matches the image example 45 * 2", () => {
      expect(multiplication(45, 2)).toBe(90);
    });

    test("returns zero when multiplying by zero", () => {
      expect(multiplication(45, 0)).toBe(0);
    });
  });

  describe("division", () => {
    test("divides positive integers", () => {
      expect(division(8, 2)).toBe(4);
    });

    test("matches the image example 20 / 5", () => {
      expect(division(20, 5)).toBe(4);
    });

    test("returns decimal quotients", () => {
      expect(division(7, 2)).toBe(3.5);
    });

    test("throws for division by zero", () => {
      expect(() => division(8, 0)).toThrow("Division by zero is not allowed.");
    });
  });

  describe("modulo", () => {
    test("returns the remainder for positive integers", () => {
      expect(modulo(10, 3)).toBe(1);
    });

    test("matches the image example 5 % 2", () => {
      expect(modulo(5, 2)).toBe(1);
    });

    test("returns zero when division is even", () => {
      expect(modulo(12, 4)).toBe(0);
    });

    test("preserves JavaScript remainder behavior for negative dividends", () => {
      expect(modulo(-5, 2)).toBe(-1);
    });

    test("throws for modulo by zero", () => {
      expect(() => modulo(8, 0)).toThrow("Modulo by zero is not allowed.");
    });
  });

  describe("power", () => {
    test("raises the base to the exponent", () => {
      expect(power(2, 3)).toBe(8);
    });

    test("matches the image example 2 ^ 3", () => {
      expect(power(2, 3)).toBe(8);
    });

    test("supports negative exponents", () => {
      expect(power(4, -1)).toBe(0.25);
    });

    test("returns one when the exponent is zero", () => {
      expect(power(9, 0)).toBe(1);
    });
  });

  describe("squareRoot", () => {
    test("returns the square root of a perfect square", () => {
      expect(squareRoot(9)).toBe(3);
    });

    test("matches the image example sqrt(16)", () => {
      expect(squareRoot(16)).toBe(4);
    });

    test("returns the square root of zero", () => {
      expect(squareRoot(0)).toBe(0);
    });

    test("throws for negative numbers", () => {
      expect(() => squareRoot(-1)).toThrow(
        "Square root is not defined for negative numbers."
      );
    });
  });
});

describe("calculate", () => {
  test("supports addition, subtraction, multiplication, division, modulo, and power", () => {
    expect(calculate(5, "+", 4)).toBe(9);
    expect(calculate(5, "-", 4)).toBe(1);
    expect(calculate(5, "*", 4)).toBe(20);
    expect(calculate(8, "/", 4)).toBe(2);
    expect(calculate(10, "%", 4)).toBe(2);
    expect(calculate(2, "^", 3)).toBe(8);
    expect(calculate(2, "**", 3)).toBe(8);
  });

  test("supports x and X multiplication operators", () => {
    expect(calculate(6, "x", 3)).toBe(18);
    expect(calculate(6, "X", 3)).toBe(18);
  });

  test("supports square root as a unary operation", () => {
    expect(calculate(16, "sqrt")).toBe(4);
  });

  test("supports the image examples for modulo, power, and square root", () => {
    expect(calculate(5, "%", 2)).toBe(1);
    expect(calculate(2, "^", 3)).toBe(8);
    expect(calculate(16, "sqrt")).toBe(4);
  });

  test("throws for unsupported operators", () => {
    expect(() => calculate(6, "plus", 3)).toThrow("Unsupported operator: plus");
  });
});

describe("runCli", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("returns success and writes the result for valid input", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    expect(runCli(["8", "+", "4"])).toBe(0);
    expect(logSpy).toHaveBeenCalledWith(12);
  });

  test("returns success and writes the result for square root input", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    expect(runCli(["sqrt", "9"])).toBe(0);
    expect(logSpy).toHaveBeenCalledWith(3);
  });

  test("returns success for the image modulo example", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    expect(runCli(["5", "%", "2"])).toBe(0);
    expect(logSpy).toHaveBeenCalledWith(1);
  });

  test("returns success for the image power example", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    expect(runCli(["2", "^", "3"])).toBe(0);
    expect(logSpy).toHaveBeenCalledWith(8);
  });

  test("returns success for the image square root example", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    expect(runCli(["sqrt", "16"])).toBe(0);
    expect(logSpy).toHaveBeenCalledWith(4);
  });

  test("returns failure and writes usage for missing arguments", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    expect(runCli(["8", "+"])).toBe(1);
    expect(logSpy).toHaveBeenNthCalledWith(
      1,
      "Usage: node src/calculator.js <number1> <operator> <number2>"
    );
    expect(logSpy).toHaveBeenNthCalledWith(2, "Example: node src/calculator.js 8 + 4");
    expect(logSpy).toHaveBeenNthCalledWith(3, "Square root: node src/calculator.js sqrt <number>");
  });

  test("returns failure for invalid numbers", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    expect(runCli(["eight", "+", "4"])).toBe(1);
    expect(errorSpy).toHaveBeenCalledWith("The first value must be a valid number.");
  });

  test("returns failure for division by zero", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    expect(runCli(["8", "/", "0"])).toBe(1);
    expect(errorSpy).toHaveBeenCalledWith("Division by zero is not allowed.");
  });

  test("returns failure for square root of a negative number", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    expect(runCli(["sqrt", "-9"])).toBe(1);
    expect(errorSpy).toHaveBeenCalledWith(
      "Square root is not defined for negative numbers."
    );
  });
});
