import mongoose from 'mongoose';
import { loadEnvFile } from 'node:process';

try {
    loadEnvFile();
} catch (error) {
    if (error.code !== 'ENOENT') {
        throw new Error('Não foi possível carregar o arquivo .env.', { cause: error });
    }
}

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error('Configuração ausente: defina a variável de ambiente MONGODB_URI.');
}

mongoose.connect(uri);

const DB = mongoose.connection;

export default DB;
