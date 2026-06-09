const {
  addition,
  subtraction,
  multiplication,
  division,
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
});

describe("calculate", () => {
  test("supports addition, subtraction, multiplication, and division", () => {
    expect(calculate(5, "+", 4)).toBe(9);
    expect(calculate(5, "-", 4)).toBe(1);
    expect(calculate(5, "*", 4)).toBe(20);
    expect(calculate(8, "/", 4)).toBe(2);
  });

  test("supports x and X multiplication operators", () => {
    expect(calculate(6, "x", 3)).toBe(18);
    expect(calculate(6, "X", 3)).toBe(18);
  });

  test("throws for unsupported operators", () => {
    expect(() => calculate(6, "%", 3)).toThrow("Unsupported operator: %");
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

  test("returns failure and writes usage for missing arguments", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    expect(runCli(["8", "+"])).toBe(1);
    expect(logSpy).toHaveBeenNthCalledWith(
      1,
      "Usage: node src/calculator.js <number1> <operator> <number2>"
    );
    expect(logSpy).toHaveBeenNthCalledWith(2, "Example: node src/calculator.js 8 + 4");
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
});
