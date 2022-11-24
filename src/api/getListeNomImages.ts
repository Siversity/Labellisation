// GET Image OBSOLETE
import axios from 'axios';

const url: string = "http://localhost:4300";

export function getListeNomImages(): any {
    return axios({
        method: 'GET',
        url: url + "/getListeNomImages",
    }).then(response => {
        return response.data.liste;
    });
}