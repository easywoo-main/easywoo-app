import axios from 'axios';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUyNDZlYjYzLTE0ZDgtNDNkMi05NDVjLWMzZWJjMmUxMDYwNCIsImVtYWlsIjoia2F5LndpbnRoZWlzZXIxMEB5YWhvby5jb20iLCJpc1ZlcmlmaWVkIjpmYWxzZSwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTc0NDYxODQ4NCwiZXhwIjoxNzQ0NjIyMDg0fQ.WQDluocDGZvNFqkfHb02khsLy87I2e_-6Qr1Zm-F4s0"
const apiClientV1 = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
});


apiClientV1.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                window.location.href = '/login';
            } else {
                console.error(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
            }
        } else if (error.request) {
            console.error('No response received from server.');
        } else {
            console.error(`Request error: ${error.message}`);
        }
        return Promise.reject(error);
    }
);

export default apiClientV1;