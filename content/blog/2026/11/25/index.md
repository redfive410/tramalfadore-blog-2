---
title: Weather Station
date: "2026-11-25T12:00:00.000Z"
---
The Felicita Park Weather Station now has a home on the blog: [https://www.tramalfadore.com/weewx/](https://www.tramalfadore.com/weewx/)

A Raspberry Pi runs [WeeWX](https://weewx.com/) to generate the site and uploads it to a public Cloud Storage bucket every 5 minutes. The blog proxies /weewx/ to that bucket, so the Pi never has to serve anything to the internet.

Current conditions, celestial, today/week/month/year stats, plus monthly and yearly reports.
