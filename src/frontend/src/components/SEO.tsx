import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: "website" | "article";
}

export function SEO({ title, description, ogImage = "/assets/logos/shapetech.png", ogType = "website" }: SEOProps) {
  useEffect(() => {
    // Update Title
    document.title = `${title} | Shapetech Solutions`;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // Update Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", title);

    // Update Open Graph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute("content", description);

    // Update Open Graph Image
    let ogImg = document.querySelector('meta[property="og:image"]');
    if (!ogImg) {
      ogImg = document.createElement("meta");
      ogImg.setAttribute("property", "og:image");
      document.head.appendChild(ogImg);
    }
    ogImg.setAttribute("content", window.location.origin + ogImage);

    // Update Open Graph Type
    let ogT = document.querySelector('meta[property="og:type"]');
    if (!ogT) {
      ogT = document.createElement("meta");
      ogT.setAttribute("property", "og:type");
      document.head.appendChild(ogT);
    }
    ogT.setAttribute("content", ogType);
  }, [title, description, ogImage, ogType]);

  return null;
}
