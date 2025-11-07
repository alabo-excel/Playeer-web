import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const testimonials = [
    {
      name: "Samuel Adeyemi",
      image: "/images/player.png",
      rating: 5,
      text: "Playeer helped me get noticed by scouts and connect with other talented athletes. The platform is easy to use and truly empowering!"
    },
    {
      name: "Chidera Okafor",
      image: "/images/male-memojis.svg",
      rating: 4,
      text: "I love how Playeer showcases my journey and achievements. The community is supportive and the opportunities are real."
    },
    {
      name: "Fatima Bello",
      image: "/images/male-memojis-2.svg",
      rating: 5,
      text: "The testimonial slider is a great touch! Playeer is the best place for athletes to shine and get discovered."
    }
  ];
  const [current, setCurrent] = React.useState(0);
  const handleDotClick = (idx: number) => setCurrent(idx);
  const router = useRouter();
  return (
    <section className="relative mx-auto auth">
      <div className="grid lg:grid-cols-3 h-screen">
        <div className="bg-[#1969FE] lg:flex flex-col justify-between hidden p-10">
          <Link href={'/'}>
            <img className="w-40" src="/images/logo.png" alt="" />
          </Link>
          <div className="text-white">
            <h1 className="!text-white text-3xl font-semibold mb-4">You’ve got the talent… We’ve got the platform. Let’s get you the greatness
              you deserve!</h1>
            <p>Talent alone isn’t enough without the right stage, it can go unseen. Playeer gives every athlete the platform to showcase their skills, get discovered, and turn potential into opportunity.</p>
          </div>
          <div className="">
            <div className="bg-[#08204C4D] p-4 rounded-xl">
              <p className="text-white text-sm mb-4 max-w-xs">{testimonials[current].text}</p>

              <div className="flex justify-between">
                <div className="flex">
                  <img src={testimonials[current].image} alt={testimonials[current].name} className="w-8 h-8 rounded-full object-cover border-2 border-white" />
                  <p className="text-white m-1 font-semibold text-base">{testimonials[current].name}</p>

                </div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < testimonials[current].rating ? 'text-[#EE9C2E]' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" /></svg>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full ${current === idx ? 'bg-white' : 'bg-gray-400'} focus:outline-none`}
                  onClick={() => handleDotClick(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-2 flex items-center justify-center">
          {children}
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
