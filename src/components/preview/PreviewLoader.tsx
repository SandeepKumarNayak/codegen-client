export default function PreviewLoader() {
    return (
        <div className="flex flex-col gap-3 p-4 h-full bg-white dark:bg-gray-950">
            {[...Array(6)].map((_, i) => (
                <div key={i} className={`skeleton rounded h-4 ${i === 0 ? 'w-3/5' : i === 1 ? 'w-4/5' : 'w-full'}`} />
            ))}
        </div>
    )
}
