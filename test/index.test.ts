import csvRowLimit from "../index";
import path from "path";

describe("limit filepath csv", () => {
  const filepath = path.resolve(__dirname, "./data/10w.csv");

  test("data length", async () => {
    const rows = await csvRowLimit({
      path: filepath,
      maxRowCount: 1000,
    });
    expect(rows.length).toBe(1000);
  });

  test("data content", async () => {
    const rows = await csvRowLimit({
      path: filepath,
      maxRowCount: 5,
    });
    expect(rows).toEqual([
      ["序号", "ID", "年龄"],
      ["1", "834240029", "97"],
      ["2", "877509446", "15"],
      ["3", "992941048", "83"],
      ["4", "62940864", "61"],
    ]);
  });

  test("wrong filepath will throw error", async () => {
    await expect(
      csvRowLimit({
        path: "wrong/filepath.csv",
        maxRowCount: 5,
      })
    ).rejects.toThrowError();
  });
});

describe("limit http csv", () => {
  const csvPath = "http://localhost:3000/10w.csv";

  test("data length", async () => {
    const rows = await csvRowLimit({
      path: csvPath,
      maxRowCount: 1000,
    });
    expect(rows.length).toBe(1000);
  });

  test("data content", async () => {
    const rows = await csvRowLimit({
      path: csvPath,
      maxRowCount: 5,
    });
    expect(rows).toEqual([
      ["序号", "ID", "年龄"],
      ["1", "834240029", "97"],
      ["2", "877509446", "15"],
      ["3", "992941048", "83"],
      ["4", "62940864", "61"],
    ]);
  });

  test("wrong filepath will throw error", async () => {
    await expect(
      csvRowLimit({
        path: "http://localhost:3000/wrong/filepath.csv",
        maxRowCount: 5,
      })
    ).rejects.toThrowError();
  });
});
