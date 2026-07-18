import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creacioneseyg.cl";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/mi-cuenta/", "/checkout/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
