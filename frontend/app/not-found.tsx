import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-full px-4 text-center bg-(--secondryText)">
            <h1 className="text-6xl font-bold text-black">404</h1>
            <h2 className="mt-4 text-2xl font-semibold">She/He isn't found</h2>
            <p className="mt-2 text-(--primaryText) max-w-md">
                US ke milne se pehle ye page ban chuki hogi.
            </p>
            <Link
                href="/home"
                className="mt-6 px-6 py-2.5 rounded-xl bg-(--thirdColor) text-(--secondryText) font-medium transition-opacity hover:opacity-90"
            >
                Back to Home
            </Link>
        </div>
    )
}