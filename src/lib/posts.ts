import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  description?: string
  content: string
  excerpt: string
}

function getAllPostPaths(dir: string, basePath: string = ''): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const paths: string[] = []
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    const relativePath = path.join(basePath, entry.name)
    
    if (entry.isDirectory()) {
      paths.push(...getAllPostPaths(fullPath, relativePath))
    } else if (entry.name.toLowerCase() === 'index.md') {
      paths.push(basePath)
    }
  }
  
  return paths
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const postPaths = getAllPostPaths(postsDirectory)
  
  const posts = await Promise.all(
    postPaths.map(async (postPath) => {
      const fullPath = path.join(postsDirectory, postPath, 'index.md')
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      const processedContent = await remark().use(html, { sanitize: false }).process(content)
      const contentHtml = processedContent.toString()
      
      // Create excerpt from content (first 160 characters)
      const excerpt = content.replace(/^#+\s+/gm, '').substring(0, 160).trim() + '...'
      
      return {
        slug: postPath,
        title: data.title || 'Untitled',
        date: data.date || '1970-01-01',
        description: data.description,
        content: contentHtml,
        excerpt: data.description || excerpt
      }
    })
  )
  
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, slug, 'index.md')
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const processedContent = await remark().use(html, { sanitize: false }).process(content)
    const contentHtml = processedContent.toString()
    
    const excerpt = content.replace(/^#+\s+/gm, '').substring(0, 160).trim() + '...'
    
    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || '1970-01-01',
      description: data.description,
      content: contentHtml,
      excerpt: data.description || excerpt
    }
  } catch {
    return null
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  return getAllPostPaths(postsDirectory)
}