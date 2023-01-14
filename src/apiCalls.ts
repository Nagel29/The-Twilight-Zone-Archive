export const fetchEpisodes = () => {
    return fetch('https://the-twilight-zone-api.vercel.app/episode')
        .then(response => {
            if (response.status > 400) {
                throw response
            } else {
                return response.json()
            }})
}
