import { useEffect, useState } from "react";
import { getOrganizerProfile } from "../services/user.service";
import { Link, useParams } from "react-router";
import type { OrganizerProfile } from "../api/types";
import toast from "react-hot-toast";
import { formatEventDateYear, formattedPrice } from "../utils/format.util";

function OrgProfile() {
  const organizerId = useParams();
  const [profile, setProfile] = useState<OrganizerProfile | null>(null);

  const allRatings =
    profile?.events.flatMap(
      (event) => event.review?.map((review) => review.rating) ?? [],
    ) ?? [];
  const organizerRating =
    allRatings.length > 0
      ? allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length
      : 0;

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await getOrganizerProfile(organizerId.id as string);
        console.log(response.data);

        setProfile(response.data.data);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    };
    getProfile();
  }, []);

  return (
    <main className="flex-1 flex flex-col items-center py-8 px-4 sm:px-8">
      <div className="w-full max-w-280 flex flex-col gap-8">
        <section className="bg-white rounded-2xl p-8 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] border border-[#e7e7f3]">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative shrink-0">
              <div className="size-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-[#f0f0f5]">
                <img
                  alt="Professional headshot of a smiling man in a suit"
                  className="w-full h-full object-cover"
                  src={profile?.profileImage}
                />
              </div>
              <div
                className="absolute bottom-1 right-1 bg-white rounded-full p-1.5 shadow-md flex items-center justify-center"
                title="Verified Organizer"
              >
                <span className="material-symbols-outlined filled text-primary text-[20px]">
                  verified
                </span>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center md:items-start gap-4 text-center md:text-left">
              <div>
                <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                  <h1 className="text-3xl font-bold text-[#0d0d1b] tracking-tight">
                    {profile?.name}
                  </h1>
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full border border-primary/20 uppercase tracking-wider">
                    Verified
                  </span>
                </div>
                <p className="text-[#4c4c9a] text-lg max-w-2xl leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  non risus. Suspendisse lectus tortor, dignissim sit amet,
                  adipiscing nec, ultricies sed, dolor. Cras elementum ultrices
                  diam. Maecenas ligula massa, varius a, semper congue, euismod
                  non, mi. Proin porttitor.
                </p>
              </div>
            </div>
            <div className="w-full md:w-auto flex flex-row md:flex-col lg:flex-row gap-4 lg:gap-8 justify-center border-t md:border-t-0 md:border-l border-[#e7e7f3] pt-6 md:pt-0 md:pl-8 mt-2 md:mt-0">
              <div className="flex flex-col items-center md:items-start lg:items-center">
                <span className="text-2xl font-bold text-[#0d0d1b]">
                  {profile?.events.length}
                </span>
                <span className="text-sm font-medium text-[#6e6e91]">
                  Total Events
                </span>
              </div>
              <div className="hidden md:block lg:hidden w-full h-px bg-[#e7e7f3]"></div>
              <div className="flex flex-col items-center md:items-start lg:items-center">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-bold text-[#0d0d1b]">
                    {organizerRating}
                  </span>
                  <span className="material-symbols-outlined filled text-yellow-400 text-[20px]">
                    star
                  </span>
                </div>
                <span className="text-sm font-medium text-[#6e6e91]">
                  Avg Rating
                </span>
              </div>
              <div className="hidden md:block lg:hidden w-full h-px bg-[#e7e7f3]"></div>
            </div>
          </div>
        </section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#0d0d1b]">All Events</h2>
              <a
                className="text-primary font-bold text-sm hover:underline"
                href="#"
              >
                View all
              </a>
            </div>
            {profile?.events.map((event) => (
              <article
                key={event.id}
                className="group flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-[#e7e7f3] hover:border-primary/30"
              >
                <div className="sm:w-64 h-48 sm:h-auto relative overflow-hidden">
                  <img
                    alt="Crowd at a tech conference with purple lighting"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    data-alt="Crowd at a tech conference with purple lighting"
                    src={event.heroImage}
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-[#0d0d1b] shadow-sm">
                    From IDR {formattedPrice(event.price)}
                  </div>
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                      <span>{formatEventDateYear(event.startDate)}</span>
                      <span>•</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#0d0d1b] leading-tight group-hover:text-primary transition-colors">
                      {event.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[#4c4c9a] text-sm">
                      <span className="material-symbols-outlined text-[18px]">
                        location_on
                      </span>
                      {event.venue}, {event.city}
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#f0f0f5]">
                    <div></div>
                    <Link
                      to={`/event/${event.id}`}
                      className="h-9 px-4 rounded-lg bg-white border border-[#e7e7f3] text-[#0d0d1b] text-sm font-bold hover:bg-[#f8f8fc] hover:border-[#cfcfe7] transition-colors pt-1"
                    >
                      Get Tickets
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#0d0d1b]">
                User Reviews
              </h2>
              <div className="flex items-center gap-1 text-yellow-500">
                <span className="text-lg font-bold text-[#0d0d1b]">
                  {organizerRating}
                </span>
                <span className="material-symbols-outlined filled text-[20px]">
                  star
                </span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-[#e7e7f3] flex flex-col gap-6">
              {profile?.events.map((event) =>
                event.review?.map((review) => (
                  <div
                    key={review.id}
                    className="flex flex-col gap-3 pb-6 border-b border-[#f0f0f5]"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold">
                          <img
                            alt="Professional headshot of a smiling man in a suit"
                            className="w-full h-full rounded-full object-cover"
                            src={review.customer.profileImage}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#0d0d1b]">
                            {review.customer.name}
                          </p>
                          <p className="text-xs text-[#6e6e91]">
                            {formatEventDateYear(review.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex text-yellow-400">
                        {Array.from({ length: review.rating }).map(
                          (_, index) => (
                            <span
                              key={index}
                              className="material-symbols-outlined filled text-[16px]"
                            >
                              star
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-[#4c4c9a] leading-relaxed my-2 mt-4">
                      {review.comment}
                    </p>
                  </div>
                )),
              )}
            </div>
            {/* <button className="w-full py-3 rounded-lg border border-[#e7e7f3] bg-white text-sm font-bold text-[#4c4c9a] hover:bg-[#f8f8fc] hover:text-[#0d0d1b] transition-colors">
              Load More Reviews
            </button> */}
          </div>
        </div>
      </div>
    </main>
  );
}

export default OrgProfile;
