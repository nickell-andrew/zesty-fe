import qs from 'qs'

export const getStatistics = async (id: string, distance: number) => {
    const url = `/statistics/${id}?distance=${distance}`
    console.log(url)
    const response = await fetch(url)
    if (response.ok) {
        return response.json()
    } else {
        console.error('Something went wrong')
        console.error(response)
    }
}