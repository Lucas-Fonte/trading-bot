import { spawn } from 'child_process';

const ENVIRONMENT = process.env.ENVIRONMENTAL_ACTIONS || 'staged';

const python = {
  run: async (fileName: string, pythonArguments: string[]): Promise<any> => {
    const data: any = {};
    const path = `src/python/${ENVIRONMENT}/${fileName}.py`;
    const pythonProgram = spawn('python', [path, ...pythonArguments]);

    for await (const pythonResponse of pythonProgram.stdout) {
      const parsedResponse = await JSON.parse(pythonResponse.toString());
      Object.assign(data, parsedResponse);
    }

    return data;
  },
};

export { python };
