---
title: Claude Code solves it
date: "2025-08-22T10:17:00.000Z"
---
The issue is that CloudFront doesn't automatically serve index.html for directory paths like S3 website hosting does. You
  need to configure CloudFront with a Lambda@Edge function or CloudFront Functions to rewrite requests from /2025/08/17/ to
  /2025/08/17/index.html.

  Here are the solutions:

  Option 1: CloudFront Functions (Recommended - Simpler & Cheaper)

  Create a CloudFront Function that rewrites directory URLs:

    function handler(event) {
        var request = event.request;
        var uri = request.uri;

        // If URI ends with '/', append 'index.html'
        if (uri.endsWith('/')) {
            request.uri += 'index.html';
        }
        // If URI doesn't have an extension and doesn't end with '/', add '/index.html'
        else if (!uri.includes('.')) {
            request.uri += '/index.html';
        }

        return request;
    }

  Option 2: Update CloudFront Distribution Settings

  1. In AWS Console → CloudFront → Your Distribution
  2. Go to Behaviors tab
  3. Edit the default behavior
  4. Set Default Root Object to index.html (this only works for the root /)
  5. For subdirectories, you'll still need Option 1

  Quick Fix Steps:

  1. CloudFront Console → Your distribution → Functions → Create function
  2. Runtime: CloudFront Functions
  3. Code: Paste the JavaScript above
  4. Test with URI /2025/08/17/
  5. Publish the function
  6. Associate with your distribution's Viewer Request behavior
  7. Deploy and wait ~5-10 minutes