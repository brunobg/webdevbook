# Scraping and crawlers

This chapter is almost an appendix. It will talk a bit about scraping data from the internet. Maybe you need to pull data from sites that don't have an API, maybe you are migrating from a site that is so awful that there's no way to get structured data from the database itself. This is a short and rough overview of how you can write a simple crawler to do that, and strategies to make it work well.

There are many, many services online these days that not only crawl for you, but do data processing too, with a lot of code ready for you in simple web interfaces. It's quite possible that they will be easier and faster to use than writing code.

If you are going to follow the code route, [Scrapy](https://docs.scrapy.org) is a well known open source crawler. There is a good [tutorial](https://docs.scrapy.org/en/latest/intro/tutorial.html).

Creating a crawler is easy:

```shell
$ scrapy startproject mycrawler
New Scrapy project 'mycrawler', using template directory '/usr/lib64/python3.6/site-packages/scrapy/templates/project', created in:
    /home/corollarium/git/Corollarium/vinarium/mycrawler

You can start your first spider with:
    cd mycrawler
    scrapy genspider example example.com
```

Next you create classes in `spiders`. We won't get into code here.

## Extracting data 101

Crawling is the easy part: you download HTML and follow links. How do you extract data?

Many sites these days use [a standard structured data schema](https://schema.org). This makes them get higher ranking in search engines, so there's a good stimulus for them to use it. Schema.org is quite common these days, and it was designed exactly for atuomatic data retrieval.

[Extruct](https://github.com/scrapinghub/extruct) can be used with Scrapy to easily get structured data.

Many times you need to scrap data that is not structured, however. This means that you need to write code that finds the parts of the HTML page that you want, with CSS or XPath expressions. Scrapy has good documentation on that, so here are pointers to designing the expressions themselves.

Your browser Developer Tools will be your friend. Open the page you need to crawl there and inspect the elements you want to extract. With a bit of luck they'll have a unique id or a unique class. This makes extracting them trivial and robust. If not, try to build an expression that is simple and robust. `div > div > div > ul > li` is a bad example: any changes to the layout will break it, or any other HTML that fits this very general pattern will give you false data. Prefer to use classes and ids as much as possible and keep your expressions simple and robust.

## Feeding data to your backend

There are a couple of main strategies here. One is to save all crawled data to a file in JSON format and similar. The crawler does not talk to your web backend at all, and you write a small script that loads the JSON and stores it in the database, either through GraphQL/REST requests, or directly using the backend code. Avoid sending it to the database, since you'll lose your backend data validation -- a must from data that comes from external sources.

The other is to integrate into your crawler code to send it to the backend. As soon as data is crawled it's sent to your backend. It makes things a little tighter -- your crawler can break because your web server changed something. But you don't need to worry with a third process to link the backend and the crawler.

### Merge strategies

Sometimes you are crawling data just once -- to pull data from an older site that is being replaced. But often you'll need to recrawl the same sites and merge it with data you crawled before. This is typical for price comparison websites, for example, or with aggregators that will crawl data that was already parsed before while looking for new data. This means you need a merge strategy.

Does your data ever change? If not just check the unicity of a key. The page URL works great as a key. If the key is in your database, skip it. If possible, make your crawler skip it too to avoid consuming useless traffic.

Does your data change? Then you need not only a unique key, but the code that access your database needs to be capable of updating it and not only inserting. Upsert operations are your friend here. The most basic idea is to always upsert, overwriting previous data. A bit more involved, but necessary in a few cases, is to create new entries for new data, perhaps only pieces of it. In the case of our price comparison example, that means that you want to store the prices with the dates they were crawled, so you can have a history.

## Testing and when things break

They say the only certainties in life are death and taxes, but you can pretty much add that crawlers will break as a third one. Since you are fetching data from third parties that you have no control of, some day they will change their website and break your crawler. Also, like any code, crawlers need to be tested. How to ensure they work and how to detect when things break?

Like all other software, automatic testing is the best option we have. There's the [autounit](https://github.com/scrapinghub/scrapy-autounit) package for Scrapy, which generates the automatic tests for you.
