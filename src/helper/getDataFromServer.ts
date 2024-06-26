export async function getDataFromServer(link: string) {
    try {
        const response = await fetch(link, {
            method: 'GET',
            headers: {
                accept: 'application/json;odata.metadata=minimal;odata.streaming=true',
                ApiKey: process.env.REACT_APP_DATA_API_KEY
                    ? process.env.REACT_APP_DATA_API_KEY
                    : '',
            },
        })

        const responseData = await response.json()
        return responseData
    } catch (error) {
        console.error('Error:', error)
    }
}
