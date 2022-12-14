// GET Image
import axios from 'axios';
import { EtiquetteJSON } from 'src/Etiquette';
import { url } from './url';


export function getJson(nomImage: string) {
    return axios({
        method: 'GET',
        url: url + "/getJson?nomImage=" + nomImage,
    }).then(response => {
        console.log(response.data)
        if (response.data.length == 0) {
            return [] as EtiquetteJSON[]; 
        }
       return response.data as EtiquetteJSON[]; 
    });
}