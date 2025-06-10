import AccountInformation from "~/components/accountinformation";
import PaymentMethod from "~/components/paymentmethod";
import ProfileHeader from "~/components/profileheader";
import SiteHeader from "~/components/siteheader";

const userData = {
  name: 'Mateus Tomaz',
  location: 'Esperança, Paraíba',
  email: 'mateus@gmail.com',
  phone: '(83) 94002-8922',
  creditCard: '**** **** **** 1234',
  paypal: '(83) 94002-8922',
};

export default function Profile() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="container mx-auto py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <main className="bg-white rounded p-6 lg:col-span-3 relative">
          <ProfileHeader 
            name={userData.name} 
            location={userData.location} 
          />

          <AccountInformation 
            email={userData.email} 
            phone={userData.phone} 
          />

          <PaymentMethod
            creditCard={userData.creditCard}
            paypal={userData.paypal}
          />
        </main>
        
        <div className="absolute bottom-4 right-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
              Salvar
          </button>
        </div>
      </div>
    </div>
  );
}