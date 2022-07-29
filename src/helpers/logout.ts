import axios from "axios";

const logout = async () => {
    let data = {};
    let error;

    const url = `https://cloud.shannews.local/cgi-bin/filemanager/wfm2Logout.cgi`;

    await axios.get(url).then((response) => {
        data = JSON.stringify(response.data);
    }).catch((err) => {
        error = err;
    });

    return {data, error}
}

export default logout;