import superagent from 'superagent';
import { createTweet } from '../model/tweet';

async function getTwitterAccessToken() {
  const urlEncodedK = encodeURIComponent('qpsVJlsTg22FFKr1fwzkzU4Ew');
  const urlEncodedS = encodeURIComponent('kmXPnluTYkl7oH4mRlC1EgthH8KLT9mBpezgK3wBaFQviC23Ru');
  const base64EncodedKS = Buffer.from(`${urlEncodedK}:${urlEncodedS}`).toString('base64');

  return new Promise((resolve, reject) => {
    superagent.post('https://api.twitter.com/oauth2/token')
      .set('Authorization', `Basic ${base64EncodedKS}`)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send('grant_type=client_credentials')
      .end((err, res) => {
        if (err) reject(err);

        resolve(res.body.access_token);
      });
  });
}

export async function getLatestTweetDetails(count) {
  const accessToken = await getTwitterAccessToken();

  return new Promise((resolve, reject) => {
    superagent.get(`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=explorewellcome&count=${count}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .end((err, res) => {
        if (err) reject(err);

        resolve(res.body.map(i => {
          return {
            id: i.id_str,
            text: i.text,
            screenName: i.user.screen_name,
            createdAt: new Date(i.created_at).toLocaleString('en-GB', {year: 'numeric', month: 'long', day: 'numeric'})
          };
        }));
      });
  });
}

export async function getLatestTweets(count = 4) {
  const detailsArray = await getLatestTweetDetails(count);

  return detailsArray.map((details) => {
    // create the markup that the Twitter oEmbed API will convert into an embedded tweet
    const embedTweetHtml = `<blockquote class="twitter-tweet">
      <p lang="en">${details.text}</p>
      <a href="https://twitter.com/${details.screenName}/status/${details.id}">${details.createdAt}</a>
    </blockquote>`;

    return createTweet({html: embedTweetHtml});
  });
}
