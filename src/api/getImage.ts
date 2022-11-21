// GET Image OBSOLETE
import axios from 'axios';

const url: string = "http://localhost:4300";

export function getImage(nomImage: string): Promise<string> {
    return axios({
        method: 'GET',
        url: url + "/testImage"
    }).then(response => {
       return response.config.url as string; 
    });
}