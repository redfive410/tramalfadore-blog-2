---
title: Goodbye Gatsby. Hello Next.js
date: "2025-08-23T16:40:00.000Z"
---
Deprecate the Gatsby site. The deployment relied on a gatsby-plugin that is no longer maintained and references an old AWS Javascript SDK that is EOL in SEPT2025.

Moved to Next.js and will deploy as a docker container to GCP CloudRun. The end of static site generation for the personal blog. This does open many opportunities that were not available when deployed directly on S3. I will get this connected back to AWS Route53 and AWS CloudFront if I need it, but first things first.
