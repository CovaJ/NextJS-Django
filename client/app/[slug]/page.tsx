import { Campaign } from "./Campaign";

export async function generateStaticParams() {
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/campaigns");
  const data = await response.json();

  return data.map((campaign) => ({
    slug: campaign.slug,
  }));
}

export async function generateMetadata({ params }) {
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/campaigns/" + params.slug);
  const data = await response.json();

  return {
    title: data.title,
    description: data.description,
  };
}

export default async function CampaignPage({ params }) {
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/campaigns/" + params.slug);
  const data = await response.json();

  return <Campaign data={data} />;
}