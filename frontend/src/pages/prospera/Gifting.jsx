import ProsperaServicePage from "./ProsperaServicePage";

export default function Gifting() {
  return <ProsperaServicePage
    kicker="PROSPERA GIFTING"
    showServiceStrip
    title="Thoughtful gifts that make every occasion memorable."
    introduction="From festive hampers to corporate welcome kits and personal celebrations, we curate, customise and deliver gifts with meaning."
    highlights={["Personal & corporate", "Customised selections", "Carefully presented"]}
    services={[
      ["Corporate Gifting", "Professional gifts for clients, employees, partners and important milestones."],
      ["Festive Hampers", "Beautifully curated selections for Diwali, New Year and seasonal celebrations."],
      ["Welcome Kits", "Useful, branded kits that help employees, guests and delegates feel valued."],
      ["Event Gifting", "Memorable keepsakes and guest gifts coordinated with your event experience."],
      ["Personal Occasions", "Warm selections for weddings, anniversaries, birthdays and family celebrations."],
      ["Custom Branding", "Personalisation, packaging and presentation tailored to your identity and message."],
    ]}
    enquiry="Who would you like to make feel special?"
    whatsappText="Hello Prospera, I'm interested in gifting services. Please share more details."
  />;
}
