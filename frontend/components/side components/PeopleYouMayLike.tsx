const people = [
    {
        name: "Taksin Raja",
        role: "UX Designer",
        company: "Next IN",
        image: "https://i.pinimg.com/1200x/2f/49/9b/2f499b0590e5fbb749aa5545a30c7083.jpg",
        action: "Connect",
    },
    {
        name: "MD Raza",
        role: "Backend Developer",
        company: "Next IN",
        image: "https://i.pinimg.com/736x/43/ef/de/43efdec5119f30aaee4e206cbf907b0b.jpg",
        action: "Connect",
    },
    {
        name: "Amir Alam",
        role: "CEO",
        company: "Next IN",
        image: "https://i.pinimg.com/736x/e4/2f/5a/e42f5a679a693a175e72e650499419b1.jpg",
        action: "Follow",
    },
    {
        name: "Sidra",
        role: "Vice president",
        company: "Next IN",
        image: "https://i.pinimg.com/736x/96/16/5b/96165bce870ccf028074098cd561c515.jpg",
        action: "Connect",
    },
];

export default function PeopleYouMayLike() {
    return (
        <div className="rounded-2xl border border-(--secondryColor) bg-(--primaryColor) p-5 shadow-sm">

            <h2 className="mb-5 text-lg font-bold text-(primaryText)">
                People You May Like
            </h2>

            <div className="space-y-4">
                {people.map((person) => (
                    <div
                        key={person.name}
                        className="flex items-center justify-between gap-3"
                    >
                        {/* Person */}
                        <div className="flex min-w-0 items-center gap-3">
                            <img
                                src={person.image}
                                alt={person.name}
                                className="h-11 w-11 shrink-0 rounded-full object-cover"
                            />

                            <div className="min-w-0">
                                <h3 className="truncate text-sm font-semibold text-(--primaryText)">
                                    {person.name}
                                </h3>

                                <p className="truncate text-xs text-(--secondryText)">
                                    {person.role} · {person.company}
                                </p>
                            </div>
                        </div>

                        {/* Button */}
                        <button
                            className="shrink-0 rounded-full bg-(--bg) px-4 py-2 text-xs font-semibold text-(--secondryColor) transition cursor-pointer hover:bg-(--secondryColor)/20"
                        >
                            {person.action}
                        </button>
                    </div>
                ))}
            </div>

            <button className="mt-6 text-sm font-semibold text-(--secondryColor)/80 cursor-pointer hover:text-(--secondryColor)">
                Show more →
            </button>
        </div>
    );
}