import { config } from '@vue/test-utils';

export class RequireFilter {
    public axiosFilter: any;
    constructor() {
        this.axiosFilter = this.axiosFilterCallback();
    }
    public axiosFilterCallback() {
        const tempObj = {
            request: (servObj: any, paramObj?: any) => {
                servObj.interceptors.request.use((res: any) => {
                    res.headers.token =
                        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmc3N5amdsaiIsImV4cCI6MTU5MTI4NzUwMCwiaWF0IjoxNTkxMjYyNDE3fQ.ja0Bl0mTb7KTob3y9qVG-59c8eKIi6Irm-BKH1w17tI";
                    res.headers["Content-Type"] = "application/json;charset=UTF-8";
                    return res;
                },
                    (error: any) => {
                        return Promise.reject(error);
                    },
                );
            },
            response: (servObj: any) => {
                servObj.interceptors.response.use((res: any) => {
                    return res.data;
                });
            },
            all: (servObj: any) => {
                tempObj.response(servObj);
                tempObj.request(servObj);
            },
        };
        return tempObj;
    }

}

