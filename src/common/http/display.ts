import qs from 'qs'

// /display/:id?(overlay=yes(&parcel=:parcelColor)(&building=:buildingColor))
export const getDisplay = async (id: string, params: object = {}) => {
    const queryString = qs.stringify(params)
    const baseUrl = `/display/${id}`
    const url = queryString ? `${baseUrl}?${queryString}` : baseUrl
    console.log(url)
    const response = await fetch(url)
    if (response.ok) {
        return response
    } else {
        console.error('Something went wrong')
        console.error(response)
    }
}