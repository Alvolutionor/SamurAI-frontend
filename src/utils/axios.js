import axios from 'axios';
const baseURL = "http://localhost:3000"
const sendFiles = async (chunk) => {
    const data = { };
    try {
        const response = await axios.post(baseURL + '/uploadFile', chunk);
    } catch (error) {
        console.error('Error sending files:', error);
    }
};

const viewOnline = async (fileName) => {
    
    try {
        const response = await axios.get(baseURL + '/view-online', {
            params: {fileName:fileName},
        });
        return response
    } catch (error) {
        console.error('Error downloading files:', error);
    }
    
}
export {sendFiles, viewOnline, }