import { runCommand } from '../utils/common';
import { datasetService } from './dataset.service';
import { AlvamaType } from '../types/alvama.type';

const service = () => {
  const store = async (datasetId: string): Promise<AlvamaType> => {
    const dataset = await datasetService.showForAlvama(datasetId);

    return await runCommand(process.env.PYTHON_VENV_PATH, [
      process.env.PYTHON_ENTRY_POINT,
      'alvama',
      `${JSON.stringify(dataset)}`,
    ]);
  };

  return { store };
};

export const alvamaService = service();
