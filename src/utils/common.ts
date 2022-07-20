import { spawn } from 'child_process';

export const runCommand = (command: string, args: string[]) =>
  new Promise((resolve, reject) => {
    const py = spawn(command, args);

    py.stderr.on('data', (data: string) => {
      reject(data);
    });

    py.stdout.on('data', (data: string) => {
      resolve(JSON.parse(data.toString()));
    });
  });
