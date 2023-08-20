import * as uuid from "uuid";
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class FileService {
    static  async  saveFile(file) {
        try{
            const fileName = uuid.v4()+".mp4";
            const filePath=path.resolve(__dirname,'../public/assets/videos/',fileName);
            await file.mv(filePath);
            return fileName;
        }catch(err){
            console.log(err)
        }
    }
}