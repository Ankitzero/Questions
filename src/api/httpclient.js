import axios from 'axios';

const defaultOptions = {
    headers: {},
    queryParams: null
};

export const restClient = axios.create();

const httpClient = async (url = '', options = defaultOptions, noBaseUrl) => {

    const baseUrl =  process.env.REACT_APP_API_BASE_URL;
    let fullPath = noBaseUrl ? (`${url}`) : (`${baseUrl}${url}`);

    return await restClient({
        url: fullPath,
        method: options.method || 'GET',
        cancelToken: options.cancelToken,
        data: options.data
    })
        .then(response => (
            {
                data: response?.data || {},
                errors: response?.data.errors,
                error: response?.data.error,
                message: response?.data.message,
                success: (response?.status === 200
                    || response?.status === 201)
                    && response?.data?.status
            }
        ))
        .catch(err => axios.isCancel(err) ?
            ({
                data: null,
                success: true,
                cancelToken : true
            })
            :
            ({
                data: err,
                success: false,
                message: err?.response?.data?.message
            })
        );
};

export default httpClient;
