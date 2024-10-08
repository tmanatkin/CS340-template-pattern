import * as fs from "fs";
// import * as path from "path";
import DirectoryTemplate from "./DirectoryTemplate";

class FileSearch extends DirectoryTemplate {
  private searchRegExp: RegExp;
  private totalMatches: number = 0;

  public static main(): void {
    let fileSearch: FileSearch;

    if (process.argv.length === 5) {
      fileSearch = new FileSearch(process.argv[2], process.argv[3], process.argv[4]);
    } else if (process.argv.length === 6 && process.argv[2].match("-r")) {
      fileSearch = new FileSearch(process.argv[3], process.argv[4], process.argv[5], true);
    } else {
      this.usage();
      return;
    }

    fileSearch.run();
  }

  private static usage(): void {
    console.log(`USAGE: npx ts-node src/FileSearch.ts {-r} <dir> <file-pattern> <search-pattern>`);
  }

  private constructor(
    dirName: string,
    filePattern: string,
    searchPattern: string,
    recurse: boolean = false
  ) {
    super(dirName, filePattern, recurse);
    this.searchRegExp = new RegExp(searchPattern);
  }

  private async run() {
    await this.searchDirectory(this.dirName);
    console.log();
    console.log(`TOTAL MATCHES: ${this.totalMatches}`);
  }

  override async searchFile(filePath: string) {
    let currentCount = 0;

    if (this.fileRegExp.test(filePath)) {
      try {
        const fileContent: string = await fs.promises.readFile(filePath, "utf-8");
        const lines: string[] = fileContent.split(/\r?\n/);
        lines.forEach((line) => {
          if (this.searchRegExp.test(line)) {
            if (++currentCount == 1) {
              console.log();
              console.log(`FILE: ${filePath}`);
            }

            console.log(line);
            this.totalMatches++;
          }
        });
      } catch (error) {
        this.unreadableFile(filePath);
      } finally {
        console.log(`${currentCount} ${filePath}`);
      }
    }
  }
}

FileSearch.main();
