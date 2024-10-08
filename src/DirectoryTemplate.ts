import * as fs from "fs";
import * as path from "path";

abstract class DirectoryTemplate {
  protected dirName: string;
  protected fileRegExp: RegExp;
  protected recurse: boolean;

  // protected searchRegExp: RegExp;
  // protected totalCount: number = 0;

  constructor(dirName: string, filePattern: string, recurse: boolean = false) {
    this.dirName = dirName;
    this.fileRegExp = new RegExp(filePattern);
    this.recurse = recurse;
  }

  // protected static usage(className: string, params: string): void {
  //   console.log(`USAGE: npx ts-node src/${className}.ts {-r} ${params}`);
  // }

  // protected async run() {
  //   await this.searchDirectory(this.dirName);
  //   console.log(`TOTAL: ${this.totalCount}`);
  // }

  // protected async searchDirectory(filePath: string) {
  //   if (!this.isDirectory(filePath)) {
  //     this.nonDirectory(filePath);
  //     return;
  //   }

  //   if (!this.isReadable(filePath)) {
  //     this.unreadableDirectory(filePath);
  //     return;
  //   }
  //   const files = fs.readdirSync(filePath);

  //   for (let file of files) {
  //     const fullPath = path.join(filePath, file);
  //     if (this.isFile(fullPath)) {
  //       if (this.isReadable(fullPath)) {
  //         await this.searchFile(fullPath);
  //       } else {
  //         this.unreadableFile(fullPath);
  //       }
  //     }
  //   }

  //   if (this.recurse) {
  //     for (let file of files) {
  //       const fullPath = path.join(filePath, file);
  //       if (this.isDirectory(fullPath)) {
  //         await this.searchDirectory(fullPath);
  //       }
  //     }
  //   }
  // }

  // protected async searchFile(filePath: string) {
  //   let currentMatchCount = 0;

  //   if (this.fileRegExp.test(filePath)) {
  //     try {
  //       const fileContent: string = await fs.promises.readFile(filePath, "utf-8");
  //       const lines: string[] = fileContent.split(/\r?\n/);

  //       lines.forEach((line) => {
  //         if (this.searchRegExp.test(line)) {
  //           if (++currentMatchCount == 1) {
  //             console.log();
  //             console.log(`FILE: ${filePath}`);
  //           }

  //           console.log(line);
  //           this.totalCount++;
  //         }
  //       });
  //     } catch (error) {
  //       this.unreadableFile(filePath);
  //     } finally {
  //       if (currentMatchCount > 0) {
  //         console.log(`MATCHES: ${currentMatchCount}`);
  //       }
  //     }
  //   }
  // }

  protected isDirectory(path: string): boolean {
    try {
      return fs.statSync(path).isDirectory();
    } catch (error) {
      return false;
    }
  }

  protected isFile(path: string): boolean {
    try {
      return fs.statSync(path).isFile();
    } catch (error) {
      return false;
    }
  }

  protected isReadable(path: string): boolean {
    try {
      fs.accessSync(path, fs.constants.R_OK);
      return true;
    } catch (error) {
      return false;
    }
  }

  protected nonDirectory(dirName: string): void {
    console.log(`${dirName} is not a directory`);
  }

  protected unreadableDirectory(dirName: string): void {
    console.log(`Directory ${dirName} is unreadable`);
  }

  protected unreadableFile(fileName: string): void {
    console.log(`File ${fileName} is unreadable`);
  }
}

export default DirectoryTemplate;
