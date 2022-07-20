import { DatasetType } from '../types/model.types';
import { runCommand } from '../utils/common';

const service = () => {
  const store = async (dataset: DatasetType) => {
    return await runCommand('/Users/pipee/.pyenv/versions/3.10.4/bin/python3', [
      '/Users/pipee/Code/alvama/main.py',
      `${JSON.stringify(dataset)}`,
    ]);
  };

  return { store };
};

export const alvamaService = service();
