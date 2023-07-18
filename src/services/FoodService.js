import {axiosGet, axiosPost, axiosPut, axiosDelete} from "../httpRequests/axios";

const BACKEND_ENDPOINT = "http://localhost:9200/food"




export async function getAllFood(){
    return await axiosGet(`${BACKEND_ENDPOINT}/getAll`)
}

export async function searchFood(food){
    return await axiosGet(`${BACKEND_ENDPOINT}/search?food=${food}`)
}

export async function addFood(food){
    return await axiosPost(`${BACKEND_ENDPOINT}/add`,food)
}

export async function updateFood(food){
    return await axiosPut(`${BACKEND_ENDPOINT}/update`,food)
}

export async function deleteFood(id){
    return await axiosDelete(`${BACKEND_ENDPOINT}/delete?id=${id}`)
}