import * as fs from "fs";
import * as path from "path";

abstract class DirectoryTemplate {
  protected dirName: string;
  protected fileRegExp: RegExp;
  protected recurse: boolean;

  constructor(dirName: string, filePattern: string, recurse: boolean = false) {
    this.dirName = dirName;
    this.fileRegExp = new RegExp(filePattern);
    this.recurse = recurse;
  }

  // main?

  protected static usage(className: string, params: string): void {
    console.log(`USAGE: npx ts-node src/${className}.ts {-r} ${params}`);
  }

  // dont use

  // public async run(): Promise<void> {
  //   await this.processDirectory(this.dirName);
  //   this.displayResults();
  // }

  // private async processDirectory(dirPath: string) {
  //   if (!this.isDirectory(dirPath)) {
  //     console.log(`${dirPath} is not a directory`);
  //     return;
  //   }

  //   if (!this.isReadable(dirPath)) {
  //     console.log(`Directory ${dirPath} is unreadable`);
  //     return;
  //   }

  //   const files = fs.readdirSync(dirPath);
  //   for (const file of files) {
  //     const fullPath = path.join(dirPath, file);
  //     if (this.isFile(fullPath)) {
  //       if (this.isReadable(fullPath)) {
  //         await this.processFile(fullPath);
  //       } else {
  //         console.log(`File ${fullPath} is unreadable`);
  //       }
  //     }
  //   }

  //   if (this.recurse) {
  //     for (const file of files) {
  //       const fullPath = path.join(dirPath, file);
  //       if (this.isDirectory(fullPath)) {
  //         await this.processDirectory(fullPath);
  //       }
  //     }
  //   }
  // }

  // protected abstract processFile(filePath: string): Promise<void>;

  // protected abstract displayResults(): void;

  // dont use

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
}

export default DirectoryTemplate;
