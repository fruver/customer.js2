declare namespace NodeJS {
  // Merge the existing `ProcessEnv` definition with ours
  // https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    DEBUG: string;
    PORT: string;
    VERSION: string;
    SECRET_KEY: string;
    DBURI: string;
    DBNAME: string;
    SENDGRID_API_KEY: string;
  }
}
