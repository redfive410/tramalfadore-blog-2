import Link from 'next/link'
import Layout from '@/components/Layout'
import Bio from '@/components/Bio'
import Seo from '@/components/Seo'
import { getAllPosts, BlogPost } from '@/lib/posts'

export default async function BlogIndex() {
  const posts = await getAllPosts()
  const siteTitle = 'Tramalfadore Blog'

  if (posts.length === 0) {
    return (
      <Layout title={siteTitle} isRootPath={true}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to &quot;content/blog&quot;.
        </p>
      </Layout>
    )
  }

  return (
    <Layout title={siteTitle} isRootPath={true}>
      <Seo title="All posts" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map((post: BlogPost) => {
          const title = post.title || post.slug

          return (
            <li key={post.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link href={`/${post.slug}`} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}
