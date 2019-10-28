import qs from 'qs'

export const statistics = (id: string, params: object) => {
    const queryString = qs.stringify(params)
    const baseUrl = `localhost:1235/${id}`
    const url = queryString ? `${baseUrl}?${queryString}` : baseUrl
    console.log(url)
    fetch(url)
}