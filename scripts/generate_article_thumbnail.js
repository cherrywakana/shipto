function getGeneratedArticleThumbnailUrl(article) {
    if (!article?.slug) {
        throw new Error('Article slug is required to build generated thumbnail URL.');
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://original-price.com';
    return `${siteUrl.replace(/\/$/, '')}/article-thumbnails/${article.slug}`;
}

module.exports = {
    getGeneratedArticleThumbnailUrl,
};
