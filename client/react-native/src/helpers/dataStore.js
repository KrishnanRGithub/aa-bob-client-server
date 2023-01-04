
import { storeSession,getSession } from "./sessionHandler"
import config from "../../config";
const key =  {
    transaction:"transaction",
    equity:"equity",
    mutualfund:"mutual_fund"
}


export async function fetchDataAA(mobileNumber,type){
    let url = "http://"+config.server_url + "/data/aa/"+mobileNumber+"/"+type;
    console.log(url);
    const response = await fetch(url,  {headers: {
      'Content-Type': 'application/json'
    }});
    // console.log("Response fetched from AA");
    const reply = await response.json();
    return reply
}
  

export async function storeTransaction(value){
    return await storeSession(key.transaction, value);
}

export async function storeEquity(value){
    return await storeSession(key.equity, value);
}

export async function storeMutalF(value){
    return await storeSession(key.transaction, value)   ;
}


export async function getTransaction(value){
    return await getSession(key.transaction);
}

export async function getEquity(value){
    return await getSession(key.equity);
}

export async function getMutalF(value){
    return await getSession(key.transaction)   ;
}