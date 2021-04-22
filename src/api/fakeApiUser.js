//example api request: replace with your API request here in folder API

const getFeedList = async () => {
  try {
    let response = await fetch(
      'https://api.jsonbin.io/b/5fce7e1e2946d2126fff85f0'
    );
    let json = await response.json();
    console.log("getfoddlist response======", json.categories);
    return json.categories;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getFeedList,
}


