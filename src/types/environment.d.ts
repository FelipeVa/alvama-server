declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPRESS_SERVER_PORT: string;
      DATABASE_URL: string;
      DATABASE_USER: string;
      DATABASE_PASSWORD: string;
      DATABASE_NAME: string;
      DATABASE_HOST: string;
      DATABASE_PORT: string;
      PYTHON_VENV_PATH: string;
      PYTHON_ENTRY_POINT: string;
      ALVAMA_BINARY: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
