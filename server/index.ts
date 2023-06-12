import express, { Express, Request, Response } from 'express';
import Parser, { type Item } from 'rss-parser';

const port = process.env.PORT || 3000;

const app: Express = express();
const parser = new Parser();

const MAX_POST: number = 5;

const urls: string[] = [
  'https://www.nasa.gov/rss/dyn/breaking_news.rss',
  'https://news.ltn.com.tw/rss/all.xml',
  'https://spacenews.com/feed/',
];

app.get('/api/v1/rss', async (req: Request, res: Response) => {
  let feeds: Item[] = [];
  // Don't use forEach, forEach not wait await

  for (let i = 0; i < urls.length; i++) {
    const rss = await parser.parseURL(urls[i]);

    // If items < 5, then get all elements
    if (rss.items.length < MAX_POST) {
      rss.items.forEach((item) => {
        item.origin_title = rss.title;
        item.origin_link = rss.link;
        feeds.push(item);
      });
    }

    // Get 5 posts from every rss feed
    for (let i = 0; i < MAX_POST; i++) {
      rss.items[i].origin_title = rss.title;
      rss.items[i].origin_link = rss.link;

      feeds.push(rss.items[i]);
    }
  }

  // return post like: [1,2,3,1,2,3,1,2,3]
  res.json({ feeds: feeds });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port} in dev`);
});
