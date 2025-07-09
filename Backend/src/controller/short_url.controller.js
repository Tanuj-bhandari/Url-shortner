import { getShortUrl } from "../dao/short_url.js";
import {
  createshortUrlWithUser,
  createshortUrlWithoutUser,
} from "../services/short_url.service.js";
import { generateNanoId } from "../utils/helper.js";
import wrapAsync from "../utils/trycatchwrapper.js";

export const createShortUrl = wrapAsync(async (req, res, next) => {
  const data = req.body;
  let shortUrl;
  if (req.user) {
    shortUrl = await createshortUrlWithUser(data.url, req.user._id,data.slug);
  } else {
     shortUrl = await createshortUrlWithoutUser(data.url);
  }
  const fullShortUrl = process.env.APP_URL + shortUrl;
  res.status(200).json({ shortUrl: fullShortUrl });
});

export const redirectFromShortUrl = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const url = await getShortUrl(id);

  if (!url) throw new Error("Url Not Found");
  res.redirect(url.full_url);
});

// export const createCustomShortUrl = wrapAsync(async (req, res) => {
//   const { url, slug } = req.body;

//   const shortUrl = await createshortUrlWithUser(url, req.user._id, slug);
//   const fullShortUrl = process.env.APP_URL + shortUrl;
//   res.status(200).json({ shortUrl: fullShortUrl });
// });
