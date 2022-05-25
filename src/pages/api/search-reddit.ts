import type { NextApiRequest, NextApiResponse } from "next";
// @ts-expect-error
import Reddit from "reddit";

const reddit = new Reddit({
  username: "thechiggaman",
  password: "ian123",
  appId: "IIFANysYDgt9jQ",
  appSecret: "eZYJ_e9n73spobWrlu5ob-Mmhn7OpQ",
  userAgent: "MyApp/1.0.0 (http://example.com)"
});

type RedditNode = {
  modhash: String;
  data: {
    dist: Number;
    children: RedditListing[];
    after: any;
    before: any;
  };
};

type RedditListing = {
  kind: String;
  data: RedditListingData;
};

type RedditListingData = {
  selftext: String;
  body: String;
  url: String;
  permalink: string;
  author: String;
  created_utc: number;
  author_flair_css_class: String;
  replies: RedditReply; // can also be empty string
};

type RedditReply = {
  kind: String;
  data: {
    modhash: any;
    dist: Number;
    children: RedditListing[];
    after: any;
    before: any;
  };
};

type ParsedData = {
  comment: String;
  link: String;
  author: String;
  postedAt: Date | String;
  keywords?: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let {
      searchTerm,
      keywords,
      subreddits,
      urls,
      sort = "top",
      timeframe = "year",
      limit = 25
    } = req.body;

    if (subreddits && !Array.isArray(subreddits)) {
      subreddits = [subreddits];
    }

    if (keywords && typeof keywords === "string") {
      keywords = keywords.split(",").map((s) => s.trim());
    }

    if (urls && typeof urls === "string") {
      urls = urls.split(",").map((s) => parseRedditURL(s.trim()));
    }

    const subredditURLs = (subreddits || []).map(
      (subreddit: any) =>
        `/r/${subreddit}?sort=${sort}&t=${timeframe}&limit=${limit}${
          searchTerm && `&q=${searchTerm}`
        }`
    );

    const subRedditThreads = await Promise.all(
      subredditURLs.map((url: string) => fetchRedditThreads(url))
    );

    const redditThreads = [...subRedditThreads, ...urls];

    const redditComments = await Promise.all(
      // The previous promise.all wrapped the results in an array, creating nested array
      // flatten it out so the urls get mapped individually
      redditThreads.flat().map(async (url) => fetchRedditData(url, keywords))
    );

    res.send(redditComments.flat());
  } catch (error) {
    console.error("ERROR", error);
  }
}

async function fetchRedditThreads(url: String) {
  if (!url) {
    throw Error(`Missing url`);
  }

  const response = await reddit.get(url);
  const redditThreads = response?.data?.children || [];
  const threadURLs = redditThreads.map(
    (r: RedditListing) => (r.data && r.data.permalink) || ""
  );

  return threadURLs;
}

async function fetchRedditData(url: string, keywords: string[]) {
  if (!url) {
    throw Error(`Missing url`);
  } else if (!keywords) {
    throw Error(`Missing keywords`);
  }

  try {
    const response = await reddit.get(url);
    let allComments: Array<ParsedData> = [];
    const keywordRegex = createKeywordRegex(keywords);

    response.forEach((redditNode: RedditNode) => {
      const listings = redditNode.data.children;
      const comments = recurseThroughListings(listings, keywordRegex);
      allComments = [...allComments, ...comments];
    });

    return allComments;
  } catch (error) {
    console.error("ERROR fetching reddit data", error);
    return [];
  }
}

function createKeywordRegex(keywords: String | String[]) {
  keywords = Array.isArray(keywords) ? keywords.join(",") : keywords;
  const splitKeywords = keywords.split(",").map((word) => `${word}\\b`); // \b is a word boundary;
  return new RegExp(`${splitKeywords.join("|")}`, "ig");
}

function recurseThroughListings(
  listings: Array<RedditListing>,
  keywordRegex: RegExp
) {
  const allComments: Array<ParsedData> = [];

  function traverseComments(listings: Array<RedditListing>) {
    if (!listings) {
      return;
    }
    listings.forEach((listing: RedditListing) => {
      const { replies } = listing.data;
      const parsedData = parseCommentData(listing.data);
      const entireComment = parsedData.comment || "";

      const keywordMatch = entireComment.match(keywordRegex);

      if (keywordMatch) {
        // filter for unique words
        parsedData.keywords = keywordMatch.filter(
          (value, index, array) => array.indexOf(value) === index
        );
        allComments.push(parsedData);
      }

      if (typeof replies === "object") {
        const replyData = replies.data.children;
        // Structure repeats here
        traverseComments(replyData);
      }
    });

    return;
  }

  traverseComments(listings);

  return allComments;
}

function parseCommentData(reply: RedditListingData): ParsedData {
  const { selftext, body, url, author, created_utc, permalink } = reply;
  const link = url || (permalink && `https://reddit.com${permalink}`) || "";
  const parsedData = {
    comment: selftext || body, // t3 posts use selftext, t1 uses body
    link: link,
    author: author,
    postedAt: created_utc ? new Date(created_utc * 1000).toDateString() : "N/A", // unix timestamp
    searchDate: new Date().toDateString()
  };

  return parsedData;
}

function parseRedditURL(url: string) {
  const subredditIndex = url.indexOf("/r/");
  return subredditIndex !== -1 ? url.slice(subredditIndex) : null;
}
