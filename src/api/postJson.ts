import axios from 'axios';
import { url } from './url';


export function postJson(json: string, nomImage: string): any {
    console.log("TEST", json)
    return axios({
        method: 'POST',
        url: url + "/postJson?nomImage=" + nomImage ,
        headers : {
            'Content-Type' : 'text/plain'
        },
        data : json,
    }).then(response => {
       return;
    });
}