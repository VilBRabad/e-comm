import React from 'react'
import SellerDashboard from './SellerDashboard'
import DeliverOrder from './DeliverOrder'

function DeliverOrders() {
    return (
        <SellerDashboard>
            <div className='flex flex-col gap-5 pl-4 pt-8'>
                <DeliverOrder />
                <DeliverOrder />
                <DeliverOrder />
            </div>
        </SellerDashboard>
    )
}

export default DeliverOrders