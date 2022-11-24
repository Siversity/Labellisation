// GET Image
import axios from 'axios';
import { url } from './url';


export function getImage(nomImage: string): Promise<string> {
    return axios({
        method: 'GET',
        url: url + "/getImage?nomImage=" + nomImage,
    }).then(response => {
       return response.config.url as string; 
    });
}