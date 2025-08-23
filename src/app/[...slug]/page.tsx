import Link from 'next/link'
import { notFound } from 'next/navigation'
import Layout from '@/components/Layout'
import Bio from '@/components/Bio'
import Seo from '@/components/Seo'
import { getAllPostSlugs, getPostBySlug, getAllPosts } from '@/lib/posts'

interface BlogPostPageProps {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({
    slug: slug.split('/')
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params
  const slug = resolvedParams.slug.join('/')
  const post = await getPostBySlug(slug)
  
  if (!post) {
    notFound()
  }

  const siteTitle = 'Tramalfadore Blog'
  
  const allPosts = await getAllPosts()
  const currentIndex = allPosts.findIndex(p => p.slug === slug)
  const previous = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const next = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  return (
    <Layout title={siteTitle} isRootPath={false}>
      <Seo
        title={post.title}
        description={post.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.title}</h1>
          <p>{post.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.content }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link href={`/${previous.slug}`} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link href={`/${next.slug}`} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}