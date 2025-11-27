import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import { Tag } from 'primereact/tag';
import { useAddToBasketMutation, useGetMyBasketQuery, useDecreaseFromBasketMutation, useRemoverFromBasketMutation } from './BasketApiSlice';
import { ButtonGroup } from 'primereact/buttongroup';
import { useEffect, useState } from 'react';

export default function BasicDemo() {

    const { data: products } = useGetMyBasketQuery()
    const [decreaseFromBasket] = useDecreaseFromBasketMutation()
    const [addToBasket] = useAddToBasketMutation()
    const [removerFromBasket] = useRemoverFromBasketMutation()
    // const [remove,setRemove] = useState(false)

    // useEffect(()=>{
    //     if(products.note && !remove)
    //         setRemove(true)
    // },[products.note ,remove])

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const itemTemplate = (data) => {
        return (<>
            {/* {data.note && !remove && <h1>Sorry, but some of the products have been removed from the system</h1>} */}
            <div className="col-12 flex justify-content-center" >
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4" style={{ maxWidth: '800px', width: '100%' }}>
                    <img className="w-20 sm:w-20rem xl:w-17rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:1024/${data.image}`} alt={data.name} />
                    <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4" >
                        <div className="flex flex-column align-items-center lg:align-items-start gap-3" >
                            <div className="flex flex-column gap-1">
                                <div className="text-2xl font-bold text-900">{data.name}</div>
                                <div className="text-700">{data.description}</div>
                            </div>
                            <div className="flex flex-column gap-2">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag product-category-icon"></i>
                                    <span className="font-semibold">{data.category}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-8 lg:gap-2" >
                            <span className="text-2xl font-semibold">${data.price}</span>
                            <span className="text-2xl font-semibold" style={{ color: "turquoise" }}>{data.quantity}</span>
                            <ButtonGroup>
                                <Button style={{ fontSize:0.2, padding: '5px 8px', width: '30px'}} icon="pi pi-plus" onClick={() => addToBasket(data._id)} />
                                <Button style={{ fontSize:0.2, padding: '5px 8px', width: '30px'}} icon="pi pi-trash" onClick={() => { removerFromBasket(data._id) }} />
                                <Button style={{fontSize:0.2, padding: '5px 8px', width: '30px'}} icon="pi pi-minus" onClick={() => decreaseFromBasket(data._id)} />
                            </ButtonGroup>
                            <Tag value={data.inventoryStatus} severity={getSeverity(data)}></Tag>
                        </div>
                    </div>
                </div>
                <hr></hr>
            </div>
        </>);
    };
    return (
        <div className="card flex justify-content-center">
            <h1> 
                <DataScroller value={products} itemTemplate={itemTemplate} rows={5} 
                    buffer={0.4} header="הסל שלי 🛒" />
            </h1> 
        </div>
    )
}
