import * as fs from "fs";
import * as path from "path";
import DirectoryTemplate from "./DirectoryTemplate";

class LineCount extends DirectoryTemplate {
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

  protected static usage(): void {
    console.log(`USAGE: npx ts-node src/LineCount.ts {-r} <dir> <file-pattern>`);
  }

  private constructor(dirName: string, filePattern: string, recurse: boolean = false) {
    super(dirName, filePattern, recurse);
  }

  private async run() {
    await this.countLinesInDirectory(this.dirName);
    console.log(`TOTAL: ${this.totalCount}`);
  }

  private async countLinesInDirectory(filePath: string) {
    if (!this.isDirectory(filePath)) {
      this.nonDirectory(filePath);
      return;
    }

    if (!this.isReadable(filePath)) {
      this.unreadableDirectory(filePath);
      return;
    }
    const files = fs.readdirSync(filePath);

    for (let file of files) {
      const fullPath = path.join(filePath, file);
      if (this.isFile(fullPath)) {
        if (this.isReadable(fullPath)) {
          await this.countLinesInFile(fullPath);
        } else {
          this.unreadableFile(fullPath);
        }
      }
    }

    if (this.recurse) {
      for (let file of files) {
        const fullPath = path.join(filePath, file);
        if (this.isDirectory(fullPath)) {
          await this.countLinesInDirectory(fullPath);
        }
      }
    }
  }

  private async countLinesInFile(filePath: string) {
    let currentCount = 0;

    if (this.fileRegExp.test(filePath)) {
      try {
        const fileContent: string = await fs.promises.readFile(filePath, "utf-8");
        const lines: string[] = fileContent.split(/\r?\n/);
        currentCount = lines.length;
        this.totalCount++;
      } catch (error) {
        this.unreadableFile(filePath);
      } finally {
        console.log(`${currentCount} ${filePath}`);
      }
    }
  }
}

LineCount.main();
