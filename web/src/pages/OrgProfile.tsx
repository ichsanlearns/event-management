function OrgProfile() {
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
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUHjtl-Ny-hvfOz7fQXw8nlAp4uVgT0winuLaig0YkJQPUGE8-x6OYiez8NhNFM50GTHSGh0IA7KcFf-cM74eDL5GCzIx6pQyHY8VJ_i9TOof4dXJ1EOCDyhIfBs7ilmwBCbn-5Y8cTW_jMwY0RkFC2d4TLEBX7P2HRAySl60KTooZwju4YbLWcmrer8-tUOPmua_RC2rlVzRwYSAz8WmGSxvZ6brdG2mKesBpJvuFiO3H9t-r4nTKvLcwGL3eWFG0XZK5d5m9roc"
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
                    Acme Events Group
                  </h1>
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full border border-primary/20 uppercase tracking-wider">
                    Verified
                  </span>
                </div>
                <p className="text-[#4c4c9a] text-lg max-w-2xl leading-relaxed">
                  Curating the best tech meetups, workshops, and conferences in
                  San Francisco since 2015. Bringing communities together.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-2">
                <button className="group flex items-center gap-2 h-11 px-6 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold text-sm transition-all shadow-sm hover:shadow-md">
                  <span className="material-symbols-outlined text-[20px]">
                    add
                  </span>
                  Follow
                </button>
                <button className="flex items-center justify-center size-11 rounded-lg border border-[#e7e7f3] hover:border-[#cfcfe7] bg-white text-[#4c4c9a] hover:text-[#0d0d1b] transition-colors">
                  <span className="material-symbols-outlined">share</span>
                </button>
                <button className="flex items-center justify-center size-11 rounded-lg border border-[#e7e7f3] hover:border-[#cfcfe7] bg-white text-[#4c4c9a] hover:text-[#0d0d1b] transition-colors">
                  <span className="material-symbols-outlined">mail</span>
                </button>
              </div>
            </div>
            <div className="w-full md:w-auto flex flex-row md:flex-col lg:flex-row gap-4 lg:gap-8 justify-center border-t md:border-t-0 md:border-l border-[#e7e7f3] pt-6 md:pt-0 md:pl-8 mt-2 md:mt-0">
              <div className="flex flex-col items-center md:items-start lg:items-center">
                <span className="text-2xl font-bold text-[#0d0d1b]">42</span>
                <span className="text-sm font-medium text-[#6e6e91]">
                  Total Events
                </span>
              </div>
              <div className="hidden md:block lg:hidden w-full h-px bg-[#e7e7f3]"></div>
              <div className="flex flex-col items-center md:items-start lg:items-center">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-bold text-[#0d0d1b]">4.8</span>
                  <span className="material-symbols-outlined filled text-yellow-400 text-[20px]">
                    star
                  </span>
                </div>
                <span className="text-sm font-medium text-[#6e6e91]">
                  Avg Rating
                </span>
              </div>
              <div className="hidden md:block lg:hidden w-full h-px bg-[#e7e7f3]"></div>
              <div className="flex flex-col items-center md:items-start lg:items-center">
                <span className="text-2xl font-bold text-[#0d0d1b]">1.2k</span>
                <span className="text-sm font-medium text-[#6e6e91]">
                  Followers
                </span>
              </div>
            </div>
          </div>
        </section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#0d0d1b]">
                Upcoming Events
              </h2>
              <a
                className="text-primary font-bold text-sm hover:underline"
                href="#"
              >
                View all
              </a>
            </div>
            <article className="group flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-[#e7e7f3] hover:border-primary/30">
              <div className="sm:w-64 h-48 sm:h-auto relative overflow-hidden">
                <img
                  alt="Crowd at a tech conference with purple lighting"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-alt="Crowd at a tech conference with purple lighting"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBx4TLJAfghZMF8QPQhrv4LCZcNOUpfAoEB6MH3o2Pk2szfZEG-bhuPJsu594HHHQmrYzAdKhCR4emdeSHWoprziMOmUa48jQlxrznfNI85ZuHN962fMgTZsSPSS4zmHl3qnSG0So9G1v1qvBSk-T9YLSGe-XTsM1P5xcN2qpVdLmn7_hIMyHv3VIb_ERM7aHmv6P3NISDz8-O3fg1XFi6JhToN3mi__SJMlVNSfr32zKBEnhmWmievfcGh2uFPfKA1RNQxI7O-FzI"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-[#0d0d1b] shadow-sm">
                  From $50
                </div>
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                    <span>Oct 12, 2024</span>
                    <span>•</span>
                    <span>10:00 AM</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0d0d1b] leading-tight group-hover:text-primary transition-colors">
                    SaaS Growth Summit 2024
                  </h3>
                  <div className="flex items-center gap-2 text-[#4c4c9a] text-sm">
                    <span className="material-symbols-outlined text-[18px]">
                      location_on
                    </span>
                    Moscone Center, San Francisco
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#f0f0f5]">
                  <div className="flex -space-x-2">
                    <img
                      alt="Attendee"
                      className="inline-block size-8 rounded-full ring-2 ring-white object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPYIjVnd094aN0FjP6xgCimiuBNwwxv8x8KAUXGEyU6ACb7tWae0y-KukJJQ4VQvwAo1JvYMStNG50Mz9x-y9elQwJP_yKqdTvTksmfABEQ0qm_W7IuW8xebCAV3Da_r7kZK66tjQR-Z_tCeZjNpH1JA_VZWQ28cXbLNRhZmy_zFiDDTRFj_bsHwLNyGaYc3U8f8FHVgfvSUC1BmHdi8-g4e6ufJVi0ZSdu_jRxlwC3WJQSNhcTp5BJqIKbEmmnH-e94BASBj1D0A"
                    />
                    <img
                      alt="Attendee"
                      className="inline-block size-8 rounded-full ring-2 ring-white object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6AvVomUSnvJorHTvwyPblKaMAwHkVHKG8TyxlTyY6h_o2CsTexG5HB-LjZOTtQ2KRUwvyohFmTxS3VuAOWqA-d6VhetP4I8RJrsjT5eydQPHXYqpFlOA7mnCHMILbfX2nIROt-yLjke0tzla64G4AnbDvaD35RtAmG_NjU73C-4OIo5VyJPpAutbMAowLkI2AABUl3ezVI5vc4NAU3pDzQJWVLFzSCyYJbRAVmTs0FhP9lCitbJg2On42NlJved1Mi74huJ3EDFw"
                    />
                    <img
                      alt="Attendee"
                      className="inline-block size-8 rounded-full ring-2 ring-white object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOvkOezeGux3uLqUUdGyDkOVOs5xOI_WD9viE7thCiwmsNNOeaNV0zGXO5oJHgIgxohtSnh--MBQUVX-vHDl736zAm8EoY7VFXHbvBIvekDcqy_ptEVcjdMQlR97bQttgObJeRIOCj3QGMpC2i3_uUYqM2tWxHXOsp6vnyukWxDA5JcgdM65XUW4FvUnBqciyISqv3WRZFiUni8L4jGbCx-9Jg3OdtC73L8XuXMtVa8hfbqgefKAVVeY-4hVRS8xIP62CfK8M8K3s"
                    />
                    <div className="size-8 rounded-full ring-2 ring-white bg-[#f0f0f5] flex items-center justify-center text-[10px] font-bold text-[#4c4c9a]">
                      +124
                    </div>
                  </div>
                  <button className="h-9 px-4 rounded-lg bg-white border border-[#e7e7f3] text-[#0d0d1b] text-sm font-bold hover:bg-[#f8f8fc] hover:border-[#cfcfe7] transition-colors">
                    Get Tickets
                  </button>
                </div>
              </div>
            </article>
            <article className="group flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-[#e7e7f3] hover:border-primary/30">
              <div className="sm:w-64 h-48 sm:h-auto relative overflow-hidden">
                <img
                  alt="People working together at a table with laptops"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-alt="People working together at a table with laptops"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPpts0JjKZsOH6qSu-1eBWM-UFDeZvyxNkbo1ioUZo6K-xC6Pk27gc-jKYuDMTaN3xWnj_6yo1JYgFlXWrtIoBpr9rFfk7PVxaJX4H25TG0kOfi4OIN6q2gUOcZZuh9N75tW74vDgCA-ZrJtYRCBg5aVto5Qt4OEU-KLrEH3Rp_te--8q3ls0blmU-i2V4mSB0kdtG06fJoB1qMJBROjiFOlyT635yewi_5gc16e997J8Yxu3uQluNpkP1zc89GLQPupgTbuUKsG4"
                />
                <div className="absolute top-3 left-3 bg-green-100 text-green-700 px-3 py-1 rounded-md text-xs font-bold shadow-sm">
                  Free
                </div>
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                    <span>Nov 05, 2024</span>
                    <span>•</span>
                    <span>6:00 PM</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0d0d1b] leading-tight group-hover:text-primary transition-colors">
                    Design Systems Workshop
                  </h3>
                  <div className="flex items-center gap-2 text-[#4c4c9a] text-sm">
                    <span className="material-symbols-outlined text-[18px]">
                      videocam
                    </span>
                    Online Event
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#f0f0f5]">
                  <div className="flex -space-x-2">
                    <img
                      alt="Attendee"
                      className="inline-block size-8 rounded-full ring-2 ring-white object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-ZizEUcToExBKHnTbAuq4_5u8rO3Y3ODVjDh0ChXMHGgK4pbY3aXIsZ2vTSALLB16RAsEodiBmPYIbb7bRmYZwvS6a5LsGQnpZT1GSX5Ia21M0moBkM1loeAo2QG9Y_UHwEA_RjdToy-ud1-LPZO7J6m00Zchd7bKFQVsSPxRG8YotE2jr33e_leCZPNXz_8yOJ71ziU-MRBFt-nBDG_xava7boJC-cTONfUtIY55Irlf25ieUjvxdAblp87enHuvbBmnrVqKMcI"
                    />
                    <img
                      alt="Attendee"
                      className="inline-block size-8 rounded-full ring-2 ring-white object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUrfSZbICVujbctxtoqp35lgcIQ0mfTvEvFXr49oZHe9Wz8k1Uvji5qdL-32m0VTIRtSTeJWvKN--TTAiAM4MljmsEkgrrulxPJQCdvXJP-hmIdtsY1KY_HRkeY-Ry1EqYuKBndGNeDBCX0-vHfMG7_m_zIUOT2MqSl2bmRm7ubvakahgPdsntM97ELg6wFA1KTDNlqvTpsm_a98kBeDgVB54d3q9ku1_mPLaHB4CjbNKfL2qB45aoNhRmfodTZ4WLpvqPBMeSrA4"
                    />
                    <div className="size-8 rounded-full ring-2 ring-white bg-[#f0f0f5] flex items-center justify-center text-[10px] font-bold text-[#4c4c9a]">
                      +82
                    </div>
                  </div>
                  <button className="h-9 px-4 rounded-lg bg-white border border-[#e7e7f3] text-[#0d0d1b] text-sm font-bold hover:bg-[#f8f8fc] hover:border-[#cfcfe7] transition-colors">
                    Register
                  </button>
                </div>
              </div>
            </article>
            <article className="group flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-[#e7e7f3] hover:border-primary/30">
              <div className="sm:w-64 h-48 sm:h-auto relative overflow-hidden">
                <img
                  alt="Business professionals shaking hands in a bright office"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-alt="Business professionals shaking hands in a bright office"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9S5no09cS4-wUJdTbcc5Q0IOHxiuZs5NR-ckguV7N1IFYN_CJtKzU08SeyQUM9xTxUqU1biqpMhbDowsfSqEMqzylMoUKMx8zBUbHbLJAb2TWlS_KXP1pxDR-O4q7plyaQaIv63orZ9YFgalTjMCBLV7YMZt9iVBz79KH79gTPLMlelQ5yCM2kht9dZ2J8I9j_fZuKBjctSJHlfDFdK0NNewGMsMhscBfhp-B1c6GkeuF-4TgTipiWJv2pVBulIyEg4N_NtTooK0"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-[#0d0d1b] shadow-sm">
                  From $120
                </div>
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                    <span>Nov 18, 2024</span>
                    <span>•</span>
                    <span>9:00 AM</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0d0d1b] leading-tight group-hover:text-primary transition-colors">
                    Founder's Network Breakfast
                  </h3>
                  <div className="flex items-center gap-2 text-[#4c4c9a] text-sm">
                    <span className="material-symbols-outlined text-[18px]">
                      location_on
                    </span>
                    The Battery, San Francisco
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#f0f0f5]">
                  <div className="flex -space-x-2">
                    <img
                      alt="Attendee"
                      className="inline-block size-8 rounded-full ring-2 ring-white object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDILLpnOMwnF3EaVkE3_vSecxBu6m_oTWunBhnWfA03Vrit40dpawYD-iJxNTKwWUdKH2o8y2Yb4JoIFRJF_S5_iPtCIN9DtdZU7I1iBc75vGxRmZLKl8I4WtYlHQ4YyzrrCdEa3mnOmw1YyT9wvUcNZ--hiwm3ICaawo8TvQS5CEKtqE_0evYTQk1_ul29D19UhMQwGYw9-jln8jnayJkBGdsNohKShMTH40lNMvQ7BnHdhcyNHVkz-LXrD8Gm96uNheZFKC4nAxc"
                    />
                    <div className="size-8 rounded-full ring-2 ring-white bg-[#f0f0f5] flex items-center justify-center text-[10px] font-bold text-[#4c4c9a]">
                      +15
                    </div>
                  </div>
                  <button className="h-9 px-4 rounded-lg bg-white border border-[#e7e7f3] text-[#0d0d1b] text-sm font-bold hover:bg-[#f8f8fc] hover:border-[#cfcfe7] transition-colors">
                    Get Tickets
                  </button>
                </div>
              </div>
            </article>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#0d0d1b]">
                User Reviews
              </h2>
              <div className="flex items-center gap-1 text-yellow-500">
                <span className="text-lg font-bold text-[#0d0d1b]">4.8</span>
                <span className="material-symbols-outlined filled text-[20px]">
                  star
                </span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-[#e7e7f3] flex flex-col gap-6">
              <div className="flex flex-col gap-3 pb-6 border-b border-[#f0f0f5]">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold">
                      SJ
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0d0d1b]">
                        Sarah Jenkins
                      </p>
                      <p className="text-xs text-[#6e6e91]">Oct 02, 2023</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400">
                    <span className="material-symbols-outlined filled text-[16px]">
                      star
                    </span>
                    <span className="material-symbols-outlined filled text-[16px]">
                      star
                    </span>
                    <span className="material-symbols-outlined filled text-[16px]">
                      star
                    </span>
                    <span className="material-symbols-outlined filled text-[16px]">
                      star
                    </span>
                    <span className="material-symbols-outlined filled text-[16px]">
                      star
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[#4c4c9a] leading-relaxed">
                  "Incredible organization. The venue was perfect and the
                  speakers were top-notch. Can't wait for the next one!"
                </p>
                <div className="flex items-center gap-4 mt-1">
                  <button className="flex items-center gap-1.5 text-xs font-medium text-[#6e6e91] hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[16px]">
                      thumb_up
                    </span>
                    Helpful (12)
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-6 border-b border-[#f0f0f5]">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <img
                      alt="Mike T."
                      className="size-10 rounded-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQs1Cveg7cAIGN7IWdmiIa-i8jT5sKaIc6pcn4n0VFPzBTwAotJx2KcubZcrIYNAKT_Q6wUA6P8jDY9IJgc5YtqcXlrS0jmCv3_baJE9Z6l-50DsVSBbv6d5m4zlECniyjthHlqxOp77ysTllRCMgeeTjadam7h-rqstvBKcyaBKc5_4b2wvS4qvVabImanS8R8Nbf3WbAtP1HiWK-Uyz5YIb1OVAZWx8LgqAx0OBDxWrRkaiYjbycpwIF-84ICYomVYdQExw3E9E"
                    />
                    <div>
                      <p className="text-sm font-bold text-[#0d0d1b]">
                        Mike Thompson
                      </p>
                      <p className="text-xs text-[#6e6e91]">Sep 15, 2023</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400">
                    <span className="material-symbols-outlined filled text-[16px]">
                      star
                    </span>
                    <span className="material-symbols-outlined filled text-[16px]">
                      star
                    </span>
                    <span className="material-symbols-outlined filled text-[16px]">
                      star
                    </span>
                    <span className="material-symbols-outlined filled text-[16px]">
                      star
                    </span>
                    <span className="material-symbols-outlined text-[#e7e7f3] text-[16px]">
                      star
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[#4c4c9a] leading-relaxed">
                  "Great content overall, but the event started a bit late. The
                  networking session was the highlight for me."
                </p>
                <div className="flex items-center gap-4 mt-1">
                  <button className="flex items-center gap-1.5 text-xs font-medium text-[#6e6e91] hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[16px]">
                      thumb_up
                    </span>
                    Helpful (3)
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                      AL
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0d0d1b]">
                        Amy Liu
                      </p>
                      <p className="text-xs text-[#6e6e91]">Aug 28, 2023</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400">
                    <span className="material-symbols-outlined filled text-[16px]">
                      star
                    </span>
                    <span className="material-symbols-outlined filled text-[16px]">
                      star
                    </span>
                    <span className="material-symbols-outlined filled text-[16px]">
                      star
                    </span>
                    <span className="material-symbols-outlined filled text-[16px]">
                      star
                    </span>
                    <span className="material-symbols-outlined filled text-[16px]">
                      star
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[#4c4c9a] leading-relaxed">
                  "Acme Events always delivers. The workshops are super
                  practical and I always leave with actionable takeaways."
                </p>
                <div className="flex items-center gap-4 mt-1">
                  <button className="flex items-center gap-1.5 text-xs font-medium text-[#6e6e91] hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[16px]">
                      thumb_up
                    </span>
                    Helpful (8)
                  </button>
                </div>
              </div>
            </div>
            <button className="w-full py-3 rounded-lg border border-[#e7e7f3] bg-white text-sm font-bold text-[#4c4c9a] hover:bg-[#f8f8fc] hover:text-[#0d0d1b] transition-colors">
              Load More Reviews
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default OrgProfile;
