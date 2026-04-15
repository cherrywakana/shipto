import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const baseUrl = 'https://original-price.com'
  
  const { data: posts } = await supabase
    .from('posts')
    .select('title, slug, content, created_at')
    .order('created_at', { ascending: false })
    .limit(20)

  const itemsXml = (posts || [])
    .map((post) => {
      const url = `${baseUrl}/articles/${post.slug}`
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
      <description><![CDATA[${post.title} - 海外通販ガイド]]></description>
    </item>`
    })
    .join('')

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Original Price - 最新記事</title>
    <link>${baseUrl}</link>
    <description>日本発送対応の海外通販サイトを厳選してご紹介</description>
    <language>ja</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
