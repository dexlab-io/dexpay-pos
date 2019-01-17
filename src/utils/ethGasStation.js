const getGASRecommendation = async () => {
    return fetch(`https://ethgasstation.info/json/ethgasAPI.json`)
      .then(response => response.json())
      .then(data => ({
          ...data,
          fast: data.fast / 10,
          fastest: data.fastest / 10,
          safeLow: data.safeLow / 10,
          average: data.average / 10,
        }));
}

export default getGASRecommendation;