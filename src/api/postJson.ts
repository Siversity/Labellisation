import axios from 'axios';

const url: string = "http://localhost:4300";

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