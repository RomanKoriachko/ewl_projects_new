// export async function getDataFromServer(link: string) {
//     try {
//         const response = await fetch(link, {
//             method: 'GET',
//             headers: {
//                 accept: 'application/json;odata.metadata=minimal;odata.streaming=true',
//                 ApiKey: process.env.REACT_APP_DATA_API_KEY,
//                 mode: 'no-cors',
//             },
//         })

//         const responseData = await response.json()
//         return responseData
//     } catch (error) {
//         console.error('Error:', error)
//     }
// }

// // 'https://corsproxy.io/?https://platform-dev.ewl.com.pl/job-advertisements/external-job-advertisements',

export async function getDataFromServer(link: string) {
    try {
        const response = await fetch('/.netlify/functions/myFunction', {
            method: 'GET',
            body: JSON.stringify({ link }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const responseData = await response.json()
        return responseData
    } catch (error) {
        console.error('Error:', error)
    }
}
