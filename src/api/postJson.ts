import axios from 'axios';

const url: string = "http://localhost:4300";

export function postJson(json: string, nomImage: string): any {
    return axios({
        method: 'POST',
        url: url + "/postJson?nomImage="+nomImage ,
        data : json,
        headers : {
            'Content-Type' : 'text/plain'
        }
    }).then(response => {
       return response.config.url as string; 
    });
}