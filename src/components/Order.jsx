/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, Modal } from 'flowbite-react';

export const Order = ({ order }) => {
    const { id, state, total, deliveryTime, order: detailOrder } = order;
    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };
    return (
        <>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <div className="px-6 py-5">
                    <h3 className="font-bold text-orange-500 text-xl mb-2">{id}</h3>
                    <p className="text-gray-700 text-base">
                        {state}
                    </p>
                    <p className="text-gray-700 text-base">
                        {total}
                    </p>

                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none"
                        type="number"
                        value={deliveryTime}
                    />
                </div>
                <Button className='mx-auto my-4' onClick={() => props.setOpenModal('order')}>Detalle de orden</Button>
            </div>
            <Modal show={props.openModal === 'order'} onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header>Detalle Orden</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        {detailOrder.map(saucer => (
                            <p key={saucer.id} className="text-gray-700 text-base">
                                {saucer.name}
                            </p>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='text-white bg-red-600 mx-auto hover:bg-red-800' onClick={() => props.setOpenModal(undefined)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
