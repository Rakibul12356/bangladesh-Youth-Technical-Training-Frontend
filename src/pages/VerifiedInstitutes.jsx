import React, { useState } from 'react'
import institutes from '../data/verifiedInstitutes.json'

const VerifiedInstitutes = () => {
    const [visibleCount, setVisibleCount] = useState(15)

    return (
        <section className="max-w-6xl mx-auto px-4 py-12">

            <h2 className="text-xl md:text-3xl mb-6 font-bold text-center">Our Verified Institutes</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {institutes.slice(0, visibleCount).map((inst) => (
                    <article key={inst.id} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
                        <div className="h-40 bg-slate-100 flex items-center justify-center overflow-hidden">
                            <img
                                src={inst.image}
                                alt={`${inst.name} image`}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.currentTarget.src = 'https://picsum.photos/1200/600?blur=10' }}
                            />
                        </div>

                        <div className="p-4 flex-1 flex flex-col">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900">{inst.name}</h3>
                                <p className="text-sm text-slate-500 mt-1">{inst.location} • Established {inst.established}</p>
                            </div>

                            <p className="text-sm text-slate-600 mt-3 line-clamp-3 flex-1">{inst.description}</p>

                            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                                <div>Students: {inst.students}</div>
                                <div>Verified: {new Date(inst.verifiedSince).toLocaleDateString()}</div>
                            </div>

                            <div className="mt-4">
                                <a href={inst.website} target="_blank" rel="noreferrer" className="inline-block text-sm text-blue-600">Visit website</a>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
            {visibleCount < institutes.length && (
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={() => setVisibleCount((v) => Math.min(v + 15, institutes.length))}
                        className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Load more
                    </button>
                </div>
            )}
        </section>
    )
}

export default VerifiedInstitutes
