import { getFormattedDate } from "./getFormattedTime";

describe("getFormattedTime", () => {
  it("displays correct time with defined arg", () => {
    expect(getFormattedDate(new Date("11/27/2020").getTime())).toEqual(
      "11/27/2020"
    );
  });

  it("displays correct time with not-defined arg", () => {
    expect(getFormattedDate(undefined)).toEqual("none");
  });
});
