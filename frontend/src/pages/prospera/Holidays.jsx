import ProsperaServicePage from "./ProsperaServicePage";



export default function Holidays() {

  

  return <ProsperaServicePage
    kicker="PROSPERA HOLIDAYS"
    showImageHero
    showServiceStrip
    title="Journeys planned around the way you love to travel."
    introduction="From peaceful family breaks to international discoveries, we bring destinations, stays, transport and experiences together with personal care."
    highlights={["India & international", "Family & group travel", "Personalised itineraries"]}
    services={[
      ["Domestic Holidays", "Relaxing beaches, heritage cities, hill stations and cultural journeys across India.", "/holiday-domestic.jpg"],
      ["International Holidays", "Thoughtfully selected destinations, stays and experiences around the world.", "/holiday-international.jpg"],
      ["Family Getaways", "Comfortable itineraries that balance every generation's pace and interests.", "/holiday-family.jpg"],
      ["Honeymoons & Couples", "Romantic escapes shaped around privacy, comfort and memorable experiences.", "/holiday-couples.jpg"],
      ["Group Tours", "Coordinated travel, stays and activities that keep your group experience simple.", "/holiday-groups.jpg"],
      ["Custom Itineraries", "Flexible journeys designed around your dates, interests and budget.", "/holiday-custom.jpg"],
    ]}
    enquiry="Where would you like to go next?"
    whatsappText="Hello Prospera, I'm interested in planning a holiday. Please share more details."
  />;
}
