import axios from "axios";

export const baseurl = "https://bayut.p.rapidapi.com"


export const Fetchapi = async (url) => {
    const { data } = await axios.get((url), {

        headers: {
            'x-rapidapi-host': 'bayut.p.rapidapi.com',
            'x-rapidapi-key': '8058b31a98mshe301da3a4d47d38p1472c7jsn538f0d5b2df0'
        }
    })
    return data;
}