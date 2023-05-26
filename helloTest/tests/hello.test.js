describe("check hello", () => {
  it("check hello", async () => {
    expect("hello").toBe("hello");
  });

  it("test mock functions", () => {
    const mockFun = jest
      .fn()
      .mockReturnValue(10)
      .mockReturnValueOnce("Salam")
      .mockReturnValueOnce("Bye");
    console.log(`${new Array(100).fill("-").join("")}`);
    console.log(mockFun());
    console.log(mockFun());
    console.log(mockFun());
    console.log(mockFun());
    console.log(mockFun());
    console.log(mockFun());
    console.log(`${new Array(100).fill("-").join("")}`);
  });
});
