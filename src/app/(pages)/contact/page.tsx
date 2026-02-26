import Image from "next/image";
import ContactForm from "./components/ContactForm";

const page = () => {
  return (
    <div className="bg-[#F7F7F7]">
      <div className="grid lg:grid-cols-[auto_700px] gap-14">
        <div className="p-8 lg:p-16 w-full lg:w-[85%] mx-auto">
          <div className="flex flex-col gap-5 py-5 w-full">
            <h2 className="text-5xl font-semibold font-[--font-playfair]">
              Contact Us
            </h2>
            <p>
              We would love to hear from you! If you have any questions or would
              like more information about our beauty services, please contact us
              using the information below.
            </p>
          </div>
          <ContactForm />
        </div>
        <div className="hidden lg:block w-full">
          <div className="rounded-t-full size-full relative overflow-hidden">
            <Image
              quality={60}
              src={"/assets/contact.jpg"}
              alt="Contact-Meow"
              width={800}
              height={800}
              className="absolute top-0 left-0 size-full rounded-t-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
