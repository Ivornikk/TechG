import { $authHost, $host } from "."

export const fetchAttributesByGroup = async (groupId) => {
    const {data} = await $host.get('api/attrtibute', {
        params: {groupId}
    })
    return data
}

export const createAttribute = async ({name, groupId}) => {
    const {data} = await $authHost.post('api/attribute', {
        name, groupId
    })
    return data
}