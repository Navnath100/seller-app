import axios from 'axios';
import { Observable } from 'rxjs';
import { APIs } from './apiList';

/**
 * Http post request
 * 
 * @param {string} url 
 * @param {{}} params 
 * @param {{}} [headers] 
 * @returns 
 */
const post = (url: string, params: {}, headers?: {}) => {
    try {
        return new Observable((observer: any) => {
            axios.post(url, params, headers)
                .then((response) => {
                    observer.next(response);
                    observer.complete();
                })
                .catch((error) => {
                    observer.error(error);
                    observer.complete();
                }
                )
        })
    } catch (err) {
        console.log('catched err', err)
    }
};

/**
 * Http put request
 * 
 * @param {string} url 
 * @param {{}} params 
 * @param {{}} [headers] 
 * @returns 
 */
const put = (url: string, params: {}, headers?: {}) => {
    try {
        return new Observable((observer: any) => {
            axios.put(url, params, headers)
                .then((response) => {
                    observer.next(response);
                    observer.complete();
                })
                .catch((error) => {
                    observer.error(error);
                    observer.complete();
                }
                )
        });
    } catch (err) {
        // console.log('catch err', err)
    }
}

/**
 * Http get request
 * 
 * @param {string} url 
 * @param {{}} params 
 * @param {{}} [headers] 
 * @param {*} [cancelToken] 
 * @returns 
 */
const get = (url: string, params: {}, headers?: {}, cancelToken?: any) => {
    try {
        // console.log("url ",url);
        // console.log("params ",params);
        return new Observable((observer: any) => {
            const _params = cancelToken ? { params: params, headers, cancelToken: cancelToken } : { params: params, headers };
            axios.get(url, _params,)
                .then((response) => {
                    observer.next(response);
                    observer.complete();
                })
                .catch((error) => {
                    observer.error(error);
                    observer.complete();
                }
                )
        });
    } catch (err) {
        console.log('catch err', err)
    }
}

/**
 * Http delete request
 * 
 * @param {string} url 
 * @param {{}} params 
 * @param {{}} [headers] 
 * @returns 
 */
const deleteApi = (url: string, params: {}, headers?: {}) => {
    try {
        return new Observable((observer: any) => {
            axios.delete(url, { params, headers })
                .then((response: any) => {
                    observer.next(response);
                    observer.complete();
                }).catch((error) => {
                    observer.error(error);
                    observer.complete();
                }
                )
        });
    } catch (err) {
        console.log('catch err', err)
    }
}




export const API = {
    post,
    get,
    put,
    deleteApi,
};