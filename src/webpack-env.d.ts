declare namespace NodeJS {
  interface Require {
    context: (directory: string, useSubdirectories: boolean, regExp: RegExp) => {
      keys: () => string[];
      <T>(id: string): T;
    };
  }
}

declare var require: NodeRequire;