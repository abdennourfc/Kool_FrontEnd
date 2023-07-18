import axios from "axios";

export const axiosGet = async (url) => {

    var response = null;

    await axios.get(url).then(res => {
        response = res;
    }).catch(err => {
        throw err;
    });

    return response;
};



export const axiosPost = async (url, body) => {

    var response = null;

    await axios.post(url, body,{
        method: 'POST',
        headers: { "Content-Type": "application/json", "accept": "*/*"}
    }).then(res => {
        response = res;
    }).catch(err => {
        throw err;
    })

    return response;
}


export const axiosPostDownload = async (url, body) => {

    var response = null;

    await axios.post(url, body,{
        method: 'POST',
        responseType : "blob",
        headers: { "Content-Type": "application/json", "accept": "*/*"}
    }).then(res => {
        response = res;
    }).catch(err => {
        throw err;
    })

    return response;
}


export const axiosPostUpload = async (url, body) => {

    var response = null;

    await axios.post(url, body,{
        method: 'POST',
        headers: { "Content-Type": "multipart/form-data", "accept": "*/*"}
    }).then(res => {
        response = res;
    }).catch(err => {
        throw err;
    })

    return response;
}


export const axiosPut = async (url, body) => {

    var response = null;

    await axios.put(url, body,{
        method: 'PUT',
        headers: { "Content-Type": "application/json", "accept": "*/*"}
    }).then(res => {
        response = res;
    }).catch(err => {
        throw err;
    })

    return response;
}


export const axiosDelete = async (url) => {

    var response = null;

    await axios.delete(url,{
        method : "DELETE",
        headers : {"accept": "*/*"}
    }).then(res => {
        response = res;
    }).catch(err => {
        throw err;
    })

    return response;
};


