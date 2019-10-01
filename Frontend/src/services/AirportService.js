import { DOMAIN } from './CONSTANTS';

import * as RequestController from './RequestController';

import RequestResult from './request-result';

export function getById(id) {
    return new Promise(
        async resolve => {
            try {
                var response = await fetch(
                    `${DOMAIN}/api/airports/${id}`,
                    {
                        method: "GET",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );
    
                resolve(RequestController.formResult(response));
            } catch {
                const errorInfo = RequestController.getErrorInfo(500);
                resolve(new RequestResult(false, errorInfo));
            }
        }
    );
}

export function add(airport) {
    return new Promise(
        async resolve => {
            try {
                var response = await fetch(
                    `${DOMAIN}/api/airports`,
                    {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(airport)
                    }
                );
    
                resolve(RequestController.formResult(response));
            } catch {
                const errorInfo = RequestController.getErrorInfo(500);
                resolve(new RequestResult(false, errorInfo));
            }
        }
    );
}

export function update(airport) {
    return new Promise(
        async resolve => {
            try {
                var response = await fetch(
                    `${DOMAIN}/api/airports/${airport.id}`,
                    {
                        method: "PUT",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(airport)
                    }
                );
    
                resolve(RequestController.formResult(response));
            } catch {
                const errorInfo = RequestController.getErrorInfo(500);
                resolve(new RequestResult(false, errorInfo));
            }
        }
    );
}

export async function search(params) {
    return new Promise(
        async resolve => {
            try {
                var response = await fetch(
                    `${DOMAIN}/api/airports/searches`,
                    {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(params)
                    }
                );
    
                resolve(RequestController.formResult(response));
            } catch {
                const errorInfo = RequestController.getErrorInfo(500);
                resolve(new RequestResult(false, errorInfo));
            }
        }
    );
}