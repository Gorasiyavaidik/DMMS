import React from 'react'
import { Link } from 'react-router-dom'

const Card_buyer = (data) => {

    return (
        <>
        {data.data.map((item, i) => (
            <div key = {item._id} className='bg-boxdark rounded-lg'>
            <Link to={`/individuals/Buyer/${item._id}`}>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                    <div className="font-bold text-2xl mb-2">{item.name}</div>
                    <div className="px-0 pt-0 pb-0">
                        <span className="inline-block bg-gray-200 rounded-full px-0 py-0 text-l font-semibold text-gray-700 mr-2 mb-2">Mobile Number :</span>
                        <span className="inline-block bg-gray-200 rounded-full px-0 py-0 text-sm font-semibold text-gray-700 mr-2 mb-2">{item.number}</span>
                    </div>
                    <div className="px-0 pt-0 pb-0">
                        <span className="inline-block bg-gray-200 rounded-full px-0 py-0 text-l font-semibold text-gray-700 mr-2 mb-2">Balance :</span>
                        <span className="inline-block bg-gray-200 rounded-full px-0 py-0 text-sm font-semibold text-gray-700 mr-2 mb-2">{item.balance}</span>
                    </div>
                    <div className="px-0 pt-0 pb-0">
                        <span className="inline-block bg-gray-200 rounded-full px-0 py-0 text-l font-semibold text-gray-700 mr-2 mb-2">address :</span>
                        <span className="inline-block bg-gray-200 rounded-full px-0 py-0 text-sm font-semibold text-gray-700 mr-2 mb-2">{item.address}</span>
                    </div>
                   
                </div>
            </div>
            </Link>
            </div>
            ))}
        </>
    )

}

export default Card_buyer