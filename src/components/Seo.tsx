import React from "react"
import { useSiteMetadata } from "../hooks/use-site-metadata"

interface SEOProps {
  title?: string;
  description?: string;
  pathname?: string;
  children?: React.ReactNode;
}

export const SEO = ({ title, description, pathname, children }: SEOProps) => {
  const { title: defaultTitle, description: defaultDescription, image, siteUrl } = useSiteMetadata()

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname || ``}`,
  }

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🧙</text></svg>" />
      {children}
    </>
  )
}