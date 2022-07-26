import { runCommand } from '../utils/common';
import { datasetService } from './dataset.service';
import { AlvamaType } from '../types/alvama.type';

const service = () => {
  const store = async (datasetId: string): Promise<AlvamaType> => {
    const dataset = await datasetService.showForAlvama(datasetId);

    return await runCommand(process.env.ALVAMA_BINARY, [
      'alvama',
      `${JSON.stringify(dataset)}`,
    ]);
  };

  return { store };
};

export const alvamaService = service();
