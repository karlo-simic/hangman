export const validateCachedQuotes = (cachedData: unknown): boolean => {
  if (!Array.isArray(cachedData)) return false;

  return cachedData.every(
    (item) =>
      typeof item === "object" &&
      "_id" in item &&
      "content" in item &&
      "author" in item &&
      "tags" in item &&
      "authorSlug" in item &&
      "length" in item &&
      "dateAdded" in item &&
      "dateModified" in item &&
      typeof item._id === "string" &&
      typeof item.content === "string" &&
      Array.isArray(item.tags) &&
      typeof item.authorSlug === "string" &&
      typeof item.length === "number" &&
      typeof item.dateAdded === "string" &&
      typeof item.dateModified === "string"
  );
};
