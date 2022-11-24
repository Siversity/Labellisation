// GET Image OBSOLETE
import axios from 'axios';
import { url } from './url';


export function getListeNomImages(): any {
    return axios({
        method: 'GET',
        url: url + "/getListeNomImages",
    }).then(response => {
        return response.data.liste;
    });
}