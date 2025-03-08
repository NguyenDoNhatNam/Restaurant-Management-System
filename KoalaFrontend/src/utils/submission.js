import AxiosInstance from "./Axios";
import { APIendpoint } from "../data/APIendpoint";

const submission = async (route, method = "post", data = {}, headers = {}) => {
    const url = `${APIendpoint}${route}`;

    console.log(APIendpoint);
    try {
        const response = await AxiosInstance({
            method: method.toLowerCase(),
            url: url,
            data: data,
            headers: headers,
        });
        return response.data;
    } catch (error) {
        console.log("Error:", error);
        throw error;
    }
};

export default submission;
