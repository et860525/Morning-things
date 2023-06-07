import express, { Express, Request, Response } from 'express';
import Parser from 'rss-parser';

const port = process.env.PORT || 3000;

const app: Express = express();
const parser = new Parser();

const url: string = 'https://www.nasa.gov/rss/dyn/breaking_news.rss';
const url2: string = 'https://news.ltn.com.tw/rss/all.xml';

app.get('/api/rss/v1', async (req: Request, res: Response) => {
  const feed = await parser.parseURL(url);
  console.log(feed.link);

  res.json({ feed: feed });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port} in dev`);
});
