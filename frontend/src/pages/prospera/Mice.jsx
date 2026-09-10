import ProsperaServicePage from "./ProsperaServicePage";

export default function Mice() {
  return <ProsperaServicePage
    kicker="PROSPERA MICE"
    title="Business experiences planned with clarity and care."
    introduction="We coordinate meetings, incentives, conferences and exhibitions through one dependable team—from travel and venues to production and on-ground support."
    highlights={["Meetings & conferences", "Incentive travel", "Exhibitions & launches"]}
    services={[
      ["Corporate Meetings", "Focused venues, hospitality and logistics for productive business gatherings."],
      ["Incentive Travel", "Rewarding group journeys that motivate teams and celebrate achievement."],
      ["Conferences", "Delegate travel, accommodation, production and venue coordination at every scale."],
      ["Exhibitions", "Stall planning, travel logistics and on-ground support for a confident presence."],
      ["Product Launches", "Brand-aligned venues, production and guest experiences for important reveals."],
      ["Team Experiences", "Purposeful offsites and activities that strengthen connection and collaboration."],
    ]}
    enquiry="Planning your next business experience?"
    whatsappText="Hello Prospera, I'm interested in MICE services. Please share more details."
  />;
}
