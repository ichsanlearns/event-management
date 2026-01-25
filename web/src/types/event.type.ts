const Category = {
    MUSIC: "MUSIC",
    SPORT: "SPORT",
    THEATRE: "THEATRE"
}
type Category = typeof Category[keyof typeof Category]

export type TEvent = {
    id?: string,
    name: string,
    price: number,
    description: string,
    category: Category,
    city: string,
    available_seats: number,
    organizer_id: string,
    start_date: Date,
    end_date?: Date,
}