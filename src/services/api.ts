export async function fetchHashtagrApi<T>(hashtag: string): Promise<T> {
  return fetch(`http://hashtagr.azurewebsites.net/tweet/api/tweets/${hashtag}`, {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
    },
  })
    .then(response => {
      console.log('-------- reponse: ' + response.json())
      if (!response.ok) {
        console.log('deu ruim man')
        throw new Error(response.statusText)
      }
      return response.json().then(data => data as T);
    })
}