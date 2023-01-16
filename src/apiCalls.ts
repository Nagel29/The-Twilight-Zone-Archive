export const fetchEpisodes = () => {
    return fetch('https://the-twilight-zone-api.vercel.app/episodes')
        .then(response => {
            if (response.status > 400) {
                throw response
            } else {
                return response.json()
            }
        })
}
