import Head from 'next/head'

interface SeoProps {
  title: string
  description?: string
  lang?: string
}

const Seo = ({ title, description, lang = 'en' }: SeoProps) => {
  const siteMetadata = {
    title: 'Tramalfadore Blog',
    description: "Jimmy's React Experiment",
    social: {
      twitter: 'mrjimmy410'
    }
  }

  const metaDescription = description || siteMetadata.description
  const fullTitle = `${title} | ${siteMetadata.title}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={`@${siteMetadata.social.twitter}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta httpEquiv="Content-Language" content={lang} />
    </Head>
  )
}

export default Seo