import { prisma } from "../lib/prisma.lib.js";

export function getUserPoints(userId: string) {
  return prisma.point.findMany({
    where: {
      user_id: userId,
      deleted_at: null,
      expired_at: {
        gt: new Date(),
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
}

export function getUserCoupons(userId: string) {
  return prisma.coupon.findMany({
    where: {
      user_id: userId,
      deleted_at: null,
      expired_at: {
        gt: new Date(),
      },
    },
    orderBy: {
      created_at: "desc",
    },
    include: {
      Referrer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function getById(orgId: string) {
  const org = await prisma.user.findFirst({
    where: { id: orgId, role: "EVENT_ORGANIZER" },
    select: {
      name: true,
      email: true,
      profile_image: true,
      Events: {
        select: {
          id: true,
          name: true,
          price: true,
          tagline: true,
          category: true,
          venue: true,
          city: true,
          hero_image: true,
          about: true,
          start_date: true,
          GotReviewed: {
            select: {
              id: true,
              comment: true,
              rating: true,
              created_at: true,
              Customer: { select: { name: true, profile_image: true } },
            },
          },
        },
      },
    },
  });

  const mapped = {
    name: org?.name,
    email: org?.email,
    profileImage: org?.profile_image,
    events: org?.Events.map((event) => {
      return {
        id: event.id,
        name: event.name,
        price: event.price,
        tagline: event.tagline,
        category: event.category,
        venue: event.venue,
        city: event.city,
        heroImage: event.hero_image,
        about: event.about,
        startDate: event.start_date,
        review: event.GotReviewed.map((review) => {
          return {
            id: review.id,
            comment: review.comment,
            rating: review.rating,
            createdAt: review.created_at,
            customer: {
              name: review.Customer.name,
              profileImage: review.Customer.profile_image,
            },
          };
        }),
      };
    }),
  };

  return mapped;
}
