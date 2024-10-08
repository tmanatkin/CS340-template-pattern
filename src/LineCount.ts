import * as fs from "fs";
// import * as path from "path";
import DirectoryTemplate from "./DirectoryTemplate";

class LineCount extends DirectoryTemplate {
  private totalLineCount: number = 0;

  public static main(): void {
    let lineCount: LineCount;

    if (process.argv.length === 4) {
      lineCount = new LineCount(process.argv[2], process.argv[3]);
    } else if (process.argv.length === 5 && process.argv[2].match("-r")) {
      lineCount = new LineCount(process.argv[3], process.argv[4], true);
    } else {
      this.usage();
      return;
    }

    lineCount.run();
  }

  private static usage(): void {
    console.log(`USAGE: npx ts-node src/LineCount.ts {-r} <dir> <file-pattern>`);
  }

  private constructor(dirName: string, filePattern: string, recurse: boolean = false) {
    super(dirName, filePattern, recurse);
  }

  private async run() {
    await this.searchDirectory(this.dirName);
    console.log(`TOTAL: ${this.totalLineCount}`);
  }

  override async searchFile(filePath: string) {
    if (this.fileRegExp.test(filePath)) {
      let currentLineCount = 0;

      try {
        const fileContent: string = await fs.promises.readFile(filePath, "utf-8");

        const lines: string[] = fileContent.split(/\r?\n/);
        currentLineCount = lines.length;
        this.totalLineCount += currentLineCount;
      } catch (error) {
        console.log(`File ${filePath} is unreadable`);
      } finally {
        console.log(`${currentLineCount} ${filePath}`);
      }
    }
  }
}

LineCount.main();
