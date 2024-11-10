

export const Orden_detallado = (detalle:any) => {
    console.log(detalle)
    return (
       
       
        <section className='h-auto w-full my-4 mx-4 py-4  border-t-2 border-b-2 border-solid border-gray-300 shadow-x1  gap-4'>
        <h2 className=' color'> <span className=' font-bold' >Producto</span> {`: ${detalle.detalle.producto.name}`}</h2>
        <h2 className=' color'> <span className=' font-bold' >Descripcion</span> {`: ${detalle.detalle.producto.description}`}</h2>
        <h2 className=' color'> <span className=' font-bold' >Precio</span> {`: $${detalle.detalle.producto.price}`}</h2>
        <p>{}</p>
        </section>
        
        
    )
}